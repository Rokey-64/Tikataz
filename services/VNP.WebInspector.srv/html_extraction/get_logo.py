"""
This is the module to collect images from website.
It will collect:
    - Production images
    - Logo images
    - Customer, partner images
"""

import json
from bs4 import BeautifulSoup
from typing import List
from html_extraction.get_link_page import get_full_link, try_to_return_validated_link
from html_extraction.common import get_image_url
from html_extraction.common import get_image_from_url
import re
import requests
from PIL import Image
from io import BytesIO
from collections import Counter
import aiohttp


# The stop word to filter the logo image
logo_stop_word = ['zalo', 'facebook', 'youtube', 'customer', 'partner', 'instagram','tiktok','mail', 'logoccdv','logosalenoti', 'icann','vnnic']
merge_logo_stop_word = re.compile('|'.join(logo_stop_word))



async def look_up_logo(contents:list[str], domain:str, home_imgs:dict):
    """
    Find the logo in the HTML document.

        args:
            contents: list of HTML content
            domain: the domain of the website
            home_imgs: the content of images, obtained from the home page on the first visit

        return:
            logos: A list of logo images
            images: A list of images that are not the logo but are found in the HTML document
    """
    # Find the image that contains any indication of the logo
    logo_as_img, images  = get_logo_link(contents,domain)

    # Choose the image that is the most likely the correct one in the list
    logos = await select_logo(logo_as_img, home_imgs)

    images = [item for item in images if item not in logos]

    return logos, images

def get_logo_link(contents:list[str], domain:str)-> tuple[List, List]:
    """
    Find the image links in the HTML document.
    """
    images = []
    logo_as_img = []
    logo_as_svg = []
    for content in contents:
        soup = BeautifulSoup(content, 'html.parser')
        image, logo1 = try_to_get_image(soup,domain)
        if logo1:
            logo_as_img.extend(logo1)

        if image:
            images.extend(image)

        logo2 = get_logo_by_link(soup,domain)
        if logo2:
            logo_as_img.extend(logo2)

        logo3 = get_logo_by_script(soup,domain)
        if logo3:
            logo_as_img.extend(logo3)

        a_logo = get_logo_contain_in_tag(soup,domain,'a')
        if a_logo:
            logo_as_img.extend(a_logo)

        dev_logo = get_logo_contain_in_tag(soup,domain,'div')
        if dev_logo:
            logo_as_img.extend(dev_logo)

        logoSvg = get_svg_logo(soup,domain)
        if logoSvg:
            logo_as_svg.extend(logoSvg)

        meta_logo = get_logo_from_meta(soup,domain)
        if meta_logo:
            logo_as_img.extend(meta_logo)

    return logo_as_img, images

def try_to_get_image(soup,domain:str)-> tuple[List, List]:
    """
    Try to get the image link from the url.
    """
    image = []
    logo = set()
    url_menu = soup.findAll('img')
    for link in url_menu:
        clss, id = link.get('class',[]), link.get('id','')
        
        src = get_image_url(link, domain)
        if not src:
            continue

        full_link = get_full_link(domain, src) or try_to_return_validated_link(src)
        if not full_link:
            continue

        # check if there is a sign of the logo image
        # if re.search('logo',src.lower()) or re.search('logo',''.join(clss).lower()) or re.search('logo',id.lower()):
        #     logo.add(full_link)
        join_text = fr'{src.lower()} {''.join(clss).lower()} {id.lower()}'
        if not re.search('logo',join_text) or re.search(merge_logo_stop_word,join_text):
            image.append(full_link)
            continue
        
        logo.add(full_link)
        
    return image, logo

def get_logo_by_link(soup, domain:str):
    """
    Find the logo link in the HTML document.
    """
    logo = set()
    links = soup.findAll('link', rel=True, href=True)
    for link in links:
        rel = link.get('rel',[])
        if not re.search(r'icon|image',''.join(rel).lower()):
            continue

        full_link = get_full_link(domain, link['href']) or try_to_return_validated_link(link['href'])
        if not full_link:
            continue

        logo.add(full_link)
    
    return logo

def get_logo_from_meta(soup, domain:str):
    """
    Find the logo link in the meta tag in the HTML document.
    """
    logo = set()
    metas = soup.findAll('meta', property=True, content=True)
    for meta in metas:
        content = meta.get('content','')
        if not re.search('logo',content.lower()):
            continue

        full_link = get_full_link(domain, content) or try_to_return_validated_link(content)
        if not full_link:
            continue

        logo.add(full_link)
    
    return logo

def get_logo_by_script(soup, domain:str)->str:
    """
    Find the information in the script tag in the HTML document.
    """
    logo = set()
    scripts = soup.findAll('script', type='application/ld+json')
    for script in scripts:
        text = script.get_text()
        json_obj = text.replace('\n','').replace('\t','').replace(' ','')
        try:
            data = json.loads(json_obj)
            url = data.get('logo')
            if not url:
                continue

            full_link = get_full_link(domain, url) or try_to_return_validated_link(url)
            if not full_link:
                continue
            logo.add(full_link)
        except Exception as e:
            continue

    return logo

def get_logo_contain_in_tag(soup, domain:str, tag:str)->set:
    """
    Find the sign of the logo link in the html tag.
    """
    logo = set()
    links = soup.findAll(tag)
    for link in links:
        clss, id = link.get('class',[]), link.get('id','')

        join_text = fr'{''.join(clss).lower()} {id.lower()}'
        if not re.search('logo',join_text) or re.search(merge_logo_stop_word,join_text):
            continue

        imgs = link.findAll('img', src=True)
        for img in imgs:
            full_link = get_full_link(domain, img['src']) or try_to_return_validated_link(img['src'])
            if not full_link:
                continue
            logo.add(full_link)

    return logo

def get_svg_logo(soup, domain:str):
    """
    Find the logo link as a SVG in the HTML document if it exists.
    """
    logoSvg = set()
    svgs = soup.findAll('svg')
    for svg in svgs:
        clss, id = svg.get('class',[]), svg.get('id','')
        if not re.search('logo',''.join(clss).lower()) and not re.search('logo',id.lower()):
            continue

        logoSvg.add(str(svg))
    return logoSvg 

def get_image_in_style(soup, domain:str):
    """
    If the image contains in the style tag. it will be extracted.
    """
    image = []
    links = soup.findAll('div', style=True)
    for link in links:
        style = link.get('style','')
        
        if not re.search('background-image',style) or not re.search('url',style):
            continue

        regex = r'/url\(&quot;(.*?)&quot;\)/;'
        match = re.search(regex,style)
        if not match:
            continue

        full_link = get_full_link(domain, match.group(1)) or try_to_return_validated_link(match.group(1))
        if not full_link:
            continue
        image.append(full_link)

    return image

def image_filter(images:list, domain:str):
    """
    Select only images that have the domain in the link. 
    """
    host_image = [image for image in images if get_full_link(domain, image) is not None ]

    if len(images) == 0:
        return images
    
    # if the website show the image from the other domain, it will be marked
    threshold = 0.2
    
    if len(host_image) / len(images) < threshold:
        return images
    else:
        return host_image
    
async def select_logo(logos:list, logo_contents:dict)->list:
    """
    Choose the image that is the most likely the correct one in the list
      args:
        logos: list of url logo images
        logo_contents: the content of the logo image, obtained from the home page on the first visit

    argorithm:
    1. Count the duplicate images, if there are many duplicate images, it may be the logo
    2. Count the color of the image, if the image has only some colors, it may be the logo
    3. Get the size of the image, if the deviation of the size is small, it may
    4. The
    """
    
    color_threshold = 3 #The number of colors to use in logo design is 3.
    size_threshold = 2.5 #The deviation of the size is 2.5.
    point = 2 #The point to add if the image is likely the logo
    count_logo = Counter(logos)

    for key, value in count_logo.items():
        try:
            # try to get logo from logo_contents
            result = logo_contents.get(key,None)
            if not result:
                result = await get_image_from_url(key)

            if not result:
                continue

            img = Image.open(BytesIO(result))
            pixels = list(img.getdata())
            color_counter = Counter(pixels)
            num_colors = len(color_counter)

            #The number of colors to use in logo design is 3.
            if num_colors < color_threshold:
                count_logo[key] = value + point

            width, height = img.size

            #The deviation of the size is 2.5.
            if max(width,height)/min(width,height) < size_threshold:
                count_logo[key] = value + point

            # if the image is larger than 100x100, it may be the logo
            if width > 100 and height > 100:
                count_logo[key] = value + point

        except Exception as e:
            print(f"select_logo|cannot show the image: {e}")
            continue
    
    result = [key for key, value in count_logo.most_common(2)]
    return result

def find_partner_logo(soup:str):
    """
    Find the partner logo in the HTML document.
    """
    partner_logo = soup.find('div', class_='partner-logo')
    return partner_logo

