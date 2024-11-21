from log import file_write
import asyncio
import aiohttp
import time
import certifi
import ssl

ssl_context = ssl.create_default_context(cafile=certifi.where())

point:int = 0
# Function to fetch the content of a page
async def fetch(session, url):
    global point
    async with session.get(url, ssl=ssl_context) as response:
        if response.status != 200 and point < 30:
            point += 1
            time.sleep(1)
            await fetch(session, url)

        if point == 30:
            print("fetch is overdue", url)
        
        point = 0
        return await response.text(errors='ignore')
    
    
# Function to get the content of the page
async def execute(urls):
    try:
        async with aiohttp.ClientSession() as session:
            tasks = [fetch(session, url) for url in urls]
            return await asyncio.gather(*tasks)
    except Exception as e:
        raise e

# Function to handle the crawling
def crawl_handler(urls):
    # Get the content of the page
    try:
        results = asyncio.run(execute(urls))
    except Exception as e:
        raise e
    return results