from bs4 import BeautifulSoup
if __name__ == '__main__':
    from common import get_image_url, test_url_image, get_image_from_url
else:
    from html_extraction.common import get_image_url, test_url_image, get_image_from_url

from collections import Counter
import re
import math
from PIL import Image
from io import BytesIO
from collections import Counter

negative_keywords = ['logo', 'banner', 'icon', 'button', 'avatar', 'profile', 'thumnail', 'thumb',
                     'customer', 'client', 'khach-hang','khachhang', 'doi-tac', 'doitac','partner',
                     'cert', 'certificate','chungchi','chung-chi','giaychungnhan','giay-chung-nhan', 'giay-phep','giayphep','license',
                     'zalo','facebook','youtube','instagram']
positive_keywords = ['product', 'prod', 'san-pham', 'sanpham', 'hang-hoa', 'hanghoa', 'item', 'service', 'dich-vu', 'dichvu', 'thuc-don', 'thucdon', 'menu', 'item']

async def look_up_production(contents:list, img_contents:dict, no_prod_imgs:list, domain:str)->list:
    """
    Look up the production image.

        args:
            contents: a list contents of pages.
            img_contents: a dictionary of image contents. Thet was extracted in the previous step.
            no_prod_imgs: The images that are likely not to be product images.
    """
    result = set()

    urls_imgs = set([url for url in img_contents.keys()])

    frequency_images = frequency_url_filter(contents, domain)
    common_imgs = urls_imgs.union(frequency_images)
    signal_images = signal_keyword_filter(common_imgs)
    neighbor_image = neighborhood_url_filter(common_imgs)

    score_counter = Counter({x: 0 for x in common_imgs})
    score_imgs = set()
    score_imgs.update(frequency_images, signal_images, neighbor_image)
    feature_images, exception = await image_feature_extraction_filter(score_imgs, img_contents)

    top_imgs = []
    top_imgs.extend(frequency_images)
    top_imgs.extend(signal_images)
    top_imgs.extend(neighbor_image)
    top_imgs.extend(feature_images)

    fill_with_score(score_counter, top_imgs)
    
    # Get the best images that are likely to be product images.
    best_score = set([score for img, score in score_counter.items() if score > 0])
    len_best_score = len(score_counter)
    best_score = sorted(best_score, reverse=True)
    for score in best_score:
        for img, value in score_counter.items():
            # reduct the noise 30% of the best score.
            if value == score and len(result) <= len_best_score * 0.7:
                result.add(img)

    # If the result is empty, get the illustration images with the highest score.
    if not result:
        top_imgs = score_counter.most_common(3)
        result.union([img for img, score in top_imgs])
    
    # Collect the unique image urls.
    result = collect_unique_img_urls(result, no_prod_imgs)
    result = removenoise(result, exception)
    return list(result)[:10]

def fill_with_score(score_counter:Counter, score_imgs:list):
    """
    Fill up the score of the images.

        args:
            score_counter: a counter of the score.
            imgs: a list of image urls. If the image is in the list, the score will be increased.
    """
    for img in score_imgs:
        score_counter[img] += 1
    
def neighborhood_url_filter(imgs:list)->set:
    """
    Find the products based on the similarity of URLs

        args:
            home_imgs: The image contents from the home page and related pages.
            other_imgs: The images from the other pages after removing the logo images.
    """
    horiz_tree:dict = {}
    imgs_subdomain = set()
    result = set()

    if not imgs:
        return result

    # Extract the subdomain from the url and update the tree.
    for url in imgs:
        imgs_subdomain = subdomain_extract(url)
        if not imgs_subdomain:
            continue
        update_tree(horiz_tree, imgs_subdomain, url)

    # Find the most neighbor of the tree.
    counter:Counter = Counter()
    for key, value in horiz_tree.items():
        score = value['score']
        if score == 1:
            continue
        counter[key] = value['score']
    most_neighbor = counter.most_common(3)

    # Get the result from the most neighbor.
    
    for item in most_neighbor:
        path = item[0]
        result.update(horiz_tree[path]['url'])                                           

    return result

def subdomain_extract(url:str, remove_tail = True)->list:
    """
    Extract the subdomain from the url.

        args:
            url: The url.
    """
    url = re.sub(r'^[^\w]?https?:\/\/', '', url)

    if remove_tail:
        url = re.sub(r'/([^/]+)$', '', url)

    subdomain = [item for item in url.split('/') if item]

    return subdomain

def update_tree(horiz_tree:dict, subdomain:list, root_url:str, index:int=0, path:str=''):
    """
    Update the tree based on the subdomain.

        args:
            horiz_tree: The horizontal tree.
            subdomain: The list of subdomains of the url.
            root_url: The url.
            index: The index of the subdomain.
    """
    length = len(subdomain)
    if index >= length:
        return

    path = path + '/' + subdomain[index]
    node:dict = horiz_tree.get(path, None)

    score = (index + 1) if index == length-1 else 0
    url = {root_url, } if index == length-1 else set()

    if not node:
        node = {
            'score': score,
            'url': url
        }
        horiz_tree[path] = node
        
    else:
        node['score'] += score
        node['url'].update(url)
    
    update_tree(horiz_tree, subdomain, root_url, index+1, path)

def frequency_url_filter(contents:list, domain:str)->set:
    """
    Find the products based on the frequency of the images. if the image is repetitive, it is likely not to be a product image.

        args:
            contents: a list contents of pages.
            domain: The domain of the website.
    """
    global  positive_keywords
    production_images = set()
    for content in contents:
        counter:Counter = Counter()
        soup = BeautifulSoup(content, 'html.parser')
        body = soup.find('body')
        
        item_dev = body.find_all('div', class_=re.compile(rf'({"|".join(positive_keywords)})'))
        imgs = [img for dev in item_dev for img in dev.find_all('img')]
        if not imgs:
            imgs = body.find_all('img')
        
        for img in imgs:
            img_url = get_image_url(img, domain)
            if not img_url:
                continue

            counter[img_url] = counter.get(img_url, 0) + 1

            # if the image only appears once, it is likely to be a product image.
            production_images = set([img_url for img_url, freq in counter.items() if freq == 1])

    return production_images

def signal_keyword_filter(url_imgs:list) -> set:
    """
    Find the products based on the signal of the production keywords in url or image name.

        args:
            home_imgs: The image contents from the home page and related pages.
            other_imgs: The images from the other pages after removing the logo images.
    """
    global negative_keywords, positive_keywords
    
    production_images = set()
    if not url_imgs:
        return production_images
    
    for url in url_imgs:
        if re.search(rf'({"|".join(positive_keywords)})', url):
            if not re.search(rf'({"|".join(negative_keywords)})', url):
                production_images.add(url)
            
    return production_images

def collect_unique_img_urls(url_imgs:set, remove_imgs:list):
    """
    Collect the unique urls from the images.

        args:
            url_imgs: The image urls.
    """
    urls = set()
    tails = set()
    if not url_imgs:
        return urls
    
    # remove the image that is likely not to be a product image.
    for url in remove_imgs:
        tail = url.split('/')
        if not tail:
            continue
        
        if tail[-1] in tails:
            continue

        tails.add(tail[-1])
    
    # remove the duplicate image
    for url in url_imgs:
        tail = url.split('/')
        if not tail:
            continue
        
        if tail[-1] in tails:
            continue

        tails.add(tail[-1])
        urls.add(url)

    return urls

async def image_feature_extraction_filter(images:list, images_contents:dict):
    """
    Find the products based on the image processing. For example, based on the color, the shape, and the size of the image.

        args:
            home_imgs: The image contents from the home page and related pages.
            other_imgs: The images from the other pages after removing the logo images.
    """
    result = set()
    exception = set()
    partern = re.compile(r'^[^\w]?https?:\/\/')
    # remove the scheme from the url
    none_schema_imgs = {}
    for key, value in images_contents.items():
        none_scheme_url = re.sub(partern, '', key)
        none_schema_imgs[none_scheme_url] = value

    # try to get logo from logo_contents
    for img in images:
        none_scheme_url = re.sub(partern, '', img)
        img_content = none_schema_imgs.get(none_scheme_url, None)
        if not img_content:
            img_content = await get_image_from_url(img)

        if not img_content:
            continue
        
        try:
            picture = Image.open(BytesIO(img_content))
            width, height = picture.size
            if math.sqrt(width*height) < 200:
                exception.add(img)
                continue

            if max(width, height)/min(width, height) > 3:
                exception.add(img)
                continue

            result.add(img)
        except Exception as e:
            continue

    return result, exception

def removenoise(images:list, exception:list)->set:
    """
    Remove the noise from the images.

        args:
            images: The images.
    """
    global negative_keywords
    result = set()
    for img in images:
        if re.search(rf'({"|".join(negative_keywords)})', img):
            continue

        if img in exception:
            continue

        result.add(img)

    return result