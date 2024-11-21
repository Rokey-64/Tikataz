from playwright.async_api import async_playwright
import asyncio
import aiohttp

async def save_image_content(response, image_contents):
    try:
        # Kiểm tra xem tài nguyên có phải là ảnh không
        resource_type = response.request.resource_type
        if resource_type == "image":
            img_url = response.url  # URL của ảnh
            img_data = await response.body()  # Nội dung ảnh
            # Lưu loại tài nguyên, URL và nội dung ảnh
            image_contents[img_url] = img_data
    except Exception as e:
        return None

async def get_webpage_content(url: str, context:any, img_include:bool=True) -> str:
    image_contents={}
    image_urls = []
    try:
        page = await context.new_page()

        await page.route(
            "**/*",
            lambda route, request: route.continue_() if (
                (img_include and request.resource_type == "image") or 
                request.resource_type not in {"image", "font", "media"}
            ) else route.abort()
        )

        if img_include:
            # Collecting the image url from the request
            page.on('request', lambda request:image_urls.append(request.url) if 'image' in request.resource_type else None)

            # Snaping the image content from the response
            page.on('response', lambda response: asyncio.create_task(save_image_content(response, image_contents)) 
                 if response.request.resource_type == "image" else None)

        try:
            await page.goto(url, timeout=6000)
        except:
            pass

        if img_include:
            #Scrolling the page to the bottom to get all the images
            scroll_step = 1000
            scroll_delay = 0.4
            document_height = await page.evaluate('document.body.scrollHeight')
            for i in range(0, document_height, scroll_step):
                await page.evaluate(f'window.scrollTo(0, {i});')
                await asyncio.sleep(scroll_delay)

            for url in image_urls:
                if image_contents.get(url) is None:
                    image_contents[url] = None

        content = await page.content()
                    
    except Exception as e:
        pass
    finally: 
        try:
            content = await page.content()
        except Exception as e:
            content = ""

        await page.close()

    return content, image_contents

async def executemany(urls, context:any, img_include:bool=True)->any:
    """
    Get the content of the web page.
    """
    result = await asyncio.gather(*[get_webpage_content(url,context,img_include) for url in urls])
    contents = [i[0] for i in result]
    image_contents = {}
    for i in result:
        image_contents.update(i[1])

    return contents, image_contents

