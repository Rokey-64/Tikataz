
from playwright.async_api import async_playwright, Playwright
from ai_prediction.field_predict import predict_field, beautify_predict
from ai_prediction.get_text_for_predict import get_text_for_predict
from ai_prediction.noise_filter import noise_filter
from web_crawler.crawl import executemany
from html_extraction.get_link_page import get_relatived_link, get_default_link
from html_extraction.get_logo import look_up_logo
from html_extraction.get_production_image import look_up_production
from html_extraction.get_web_profile import lookup
from html_extraction.tags_collector import TagsCollector
from dnconnection.mongoconnect import insert_tag
from dnconnection.connection import geturls
from midleware import Midleware

import asyncio
import os
from datetime import datetime,timezone

def time_execution(pretime, message):
    now = datetime.now()
    print(message, (now - pretime).total_seconds(), 's')
    return now


async def restart_browser(browser, context, playwrite:Playwright):
    try:
        if context:
            await context.close()

        if browser:
            await browser.close()

        browser = await playwrite.firefox.launch(headless=True)
        context = await browser.new_context(ignore_https_errors=True)
    except:
        pass

    if not browser:
        browser, context = await restart_browser(None, None, playwrite)

    return browser, context

async def main():
    global retries
    async with async_playwright() as p:
        browser, context = None, None
        index = 9980
        print('start')
        while True:
            browser, context = await restart_browser(browser, context, p)
            if index > 25000:
                break

            start = datetime.now()
            urls = geturls(index)
            if not urls:
                break
            for domain, id in urls:
                try:
                    
                    home_contents, home_imgs = await Midleware.homepage_midleware(domain, context)
                    common_link, prod_urls, profile_urls = Midleware.link_midleware(home_contents, domain)
                    prod_contents, prod_imgs = await Midleware.production_midleware(prod_urls, context)
                    temprate_contents, temprate_imgs = await Midleware.profile_midleware(profile_urls, context, not bool(prod_imgs))

                    home_imgs.update(prod_imgs)
                    tag:TagsCollector = await Midleware.collecting_tag_midleware(home_contents, temprate_contents, prod_contents, home_imgs, domain)

                    predict = await Midleware.ai_predict_midleware(home_contents, prod_contents)
                    tag.prediction = predict
                    if not tag or tag.is_null():
                        continue

                    insert_tag(tag.to_dict())
                    index = id + 1
                except Exception as e:
                    print(rf'Error: {e}', domain, id)
                    browser, context = await restart_browser(browser, context, p)
                    continue
            
            time_execution(start, 'Total time: ')
            print('finishtime')

asyncio.run(main())