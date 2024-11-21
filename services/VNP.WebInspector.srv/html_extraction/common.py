if __name__ == '__main__':
    from get_link_page import get_full_link, try_to_return_validated_link
else:
    from html_extraction.get_link_page import get_full_link, try_to_return_validated_link

import re
from collections import Counter
from bs4 import BeautifulSoup
import aiohttp
import requests

def get_image_url(img, domain)->str:
    """
    Get the image URL from the image tag.

        args:
            img: The image tag.
    """
    attributes = ['src', 'data-src', 'data-lazy-src', 'data-original', 'srcset', 'data-lazy-srcset', 'data-srcset', 'data-srcset']
    content = ''
    img_url = ''
    counter:Counter = Counter()
    for attr in attributes:
        content = img.get(attr)
        if content:
            break
    
    if not content:
        return None
    
    srcs = content.split(',')

    for item in srcs:
        vals = item.split(' ')
        if not vals or len(vals) != 2:
            continue

        revolution = re.match(r'^\d+', vals[1])
        if not revolution:
            continue
        
        value = int(revolution.group()) if revolution.group() else 0
        counter[vals[0]] = value

        # Just get the image if the image resolution is between 500 and 1000.
        if 500 < value < 1000:
            img_url = vals[0]
            break

    if not content:
        img_url = counter.most_common(1)[0][0]
    
    if not img_url:
        img_url = content
    
    result = get_full_link(domain, img_url) or try_to_return_validated_link(img_url)
    return result

async def get_image_from_url(image_url: str):
    """
    Get the image content from the url.
    """
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    image_content = None
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(image_url, timeout=3) as response:
                image_content = await response.read()
            
    except Exception as e:
        pass
    
    try:
        response = requests.get(image_url, stream=True, headers=headers, timeout=2)
        if response:
            image_content = response.content
    except Exception as e:
        # print("cann't access ", image_url)
        pass

    return image_content

def test_url_image() -> list:
    imgs = [
        'https://elise.vn/media/wysiwyg/A-SALE/cv-sale-0211.jpg',
        'https://elise.vn/media/catalog/product/cache/b35d2052d2e1ce5f6cbaec523842ed65/f/s/fs2402103sekfbk2.jpg',
        'https://elise.vn/media/catalog/product/cache/b35d2052d2e1ce5f6cbaec523842ed65/f/f/ff2409098bkdepk4.jpg',
        'https://elise.vn/media/catalog/product/cache/b35d2052d2e1ce5f6cbaec523842ed65/f/f/ff2407042diwoge1.jpg',
        'https://elise.vn/media/catalog/product/cache/b35d2052d2e1ce5f6cbaec523842ed65/f/f/ff2407040bkword1.jpg',
        'https://elise.vn/media/catalog/product/cache/b35d2052d2e1ce5f6cbaec523842ed65/f/f/ff2407039bkword1.jpg',
        'https://elise.vn/media/catalog/anhtest1.jpg',
        'https://elise.vn/media/catalog/anhtest2.jpg',
        'https://elise.vn/media/catalog/anhtest3.jpg',
        'https://elise.vn/media2/catalog2/anhtest44.jpg',
        'https://elise.vn/media2/catalog2/anhtest55.jpg'
    ]

    return imgs