
from playwright.async_api import async_playwright
from ai_prediction.field_predict import predict_field, merge_predict, get_weighted_predict, keyword_rating
from ai_prediction.get_text_for_predict import get_text_for_predict
from ai_prediction.noise_filter import noise_filter
from web_crawler.crawl import executemany
from html_extraction.get_link_page import get_relatived_link, get_default_link
from html_extraction.get_logo import look_up_logo
from html_extraction.get_production_image import look_up_production
from html_extraction.get_web_profile import lookup
from html_extraction.tags_collector import TagsCollector, Prediction
import asyncio
import os
from datetime import datetime
import math

class Midleware:
    """
    This class is responsible for the midleware of the application
    """

    def __init__(self):
        pass

    def input_url_midleware()->str:
        """
        This function is used to get the url from the user
        """
        os.system('cls')
        domain = input("Enter the url: ")
        return domain

    async def homepage_midleware(domain:str, context):
        """
        This function is used to get the homepage content and images
        """
        if not domain:
            return [], {}
        
        home_contents, home_imgs = await executemany([domain,], context)

        return home_contents, home_imgs

    def link_midleware(home_contents, domain) -> tuple:
        """
        This function is used to get the default link
        """
        if not home_contents or not domain:
            return set(), set(), set()
        
        profile_urls = set()
        common_link = get_relatived_link(home_contents[0], domain, 3)
        default_urls = get_default_link(home_contents[0], domain)

        prod_urls = default_urls.get('prod', set())
        contact_urls = default_urls.get('contact', set())
        about_urls = default_urls.get('about', set())
        
        profile_urls.update(contact_urls, about_urls)
        if len(profile_urls) < 2:
            profile_urls.update(common_link)

        return (common_link, prod_urls, profile_urls)
    
    async def production_midleware(prod_urls, context):
        """
        This function is used to retrieve the html contents and images from the production pages
        """
        prod_contents = []
        prod_imgs = {}
        if prod_urls and len(prod_urls) > 0:
            prod_contents, prod_imgs = await executemany(prod_urls, context)
        return prod_contents, prod_imgs
    
    async def profile_midleware(profile_urls, context, img_include=False):
        """
        This function is used to retrieve the html contents and images from the profile pages
        """
        profile_contents = []
        profile_imgs = {}
        if profile_urls and len(profile_urls) > 0:
            profile_contents, profile_imgs = await executemany(profile_urls, context, img_include)
        return profile_contents, profile_imgs
    
    async def collecting_tag_midleware(home_contents, temprate_contents, prod_contents, home_imgs, domain):
        """
        This function is used to create a tag object collected from the website
        """
        tag:TagsCollector = lookup(home_contents + temprate_contents, domain)

        logo_imgs, other_imgs = await look_up_logo(home_contents, domain, home_imgs)
        tag.header.logo = logo_imgs

        product_imgs = await look_up_production(prod_contents or home_contents, home_imgs, logo_imgs, domain)
        tag.productions = product_imgs

        return tag
    
    async def ai_predict_midleware(home_contents, prod_contents)->Prediction:
        """
        This function is used to predict the field of the website
        """
        without_this = ['AB09', 'AB12']
        home_texts = await get_text_for_predict(home_contents)
        homepage_predict, homepage_keyword = predict_field(home_texts)
        homepage_filter = noise_filter(homepage_predict, without_this)

        prod_text = await get_text_for_predict(prod_contents)
        prod_predict, prod_keyword = predict_field(prod_text)
        prod_filter = noise_filter(prod_predict, without_this)

        rate = math.ceil(len(prod_contents) / len(home_contents))
        if not rate:
            rate = 1

        major_predict = merge_predict(homepage_filter, prod_filter, rate)
        if not major_predict:
            return Prediction([], {}, [])
        group_predict = [key for key, value in major_predict.items() if key in without_this]

        weighted_predict = get_weighted_predict(major_predict, without_this)

        # Collect the keywords
        keywords = set()
        for key, value in weighted_predict.items():
            keywords.update(homepage_keyword.get(key, []))
            keywords.update(prod_keyword.get(key, []))

        # keyword_rating(list(keywords))

        predict = Prediction(group_predict, weighted_predict, list(keywords))

        return predict
