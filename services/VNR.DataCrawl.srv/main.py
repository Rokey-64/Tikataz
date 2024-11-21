import random
import re
import time
from sqlconnection import get_link
from log import file_write
from crawl import get_html, get_data, get_next_page, update_data, get_last_page, crawl_detail
from baselink import base_links
from datetime import datetime
from asys import crawl_handler

index:int = 0 # can point to the current index of base_links
page_last_id:int=0

# Function to get the HTML content of a webpage
def main():
    global index, page_last_id
    i = 0 # can point to the current page
    current_url = fr'{base_links[index]}/{i}'
    index += 1
    while i <= page_last_id:
        # Get the HTML content of the current page
        html = get_html(current_url)
        
        # get page current id
        page_reg = re.findall(r'\d+', current_url)
        page_id = page_reg[1]

        # Update the database
        update_data(html, page_id, int(page_reg[0]))

        # Increase the page number
        i += 1

        # Get the next page
        current_url = fr'{base_links[index]}/{i}'

        # if the current url is 'end', then move to the next base link
        if i == page_last_id:
            index += 1
            break

        #random.randint(1, 5)
        time.sleep(0.5)

# Main function
print("Started crawling the pages")
start = datetime.now()
offset = 0
while True:
    try:
        resl, offset = get_link(79, offset)
        if not resl:
            print("No more data")
            break
    except Exception as e:
        file_write(rf"index:{i} Error: ", e)
        break

    htmls = crawl_handler([item[1] for item in resl])
    if not htmls:
        print("No more htmls")
    break
    for i in range(len(resl)):
        try:
            check = crawl_detail(htmls[i], resl[i][0])
        except Exception as e:
            file_write(rf"index:{resl[i][0]} Error: ", e)
            print("Error: ", e)

    time.sleep(1)


end = datetime.now()
print("Finished crawling the pages. Time: ", (end-start).seconds*1000, " seconds")
    


# ############################################################################################################
# html1 = get_html('https://masocongty.vn/company/7174/cong-ty-tnhh-tu-van-xay-dung-minh-quan-cao-bang.html')
# vl = crawl_detail(html1, 1)

##### Comment 2024-09-04
# while index < 62:
#     print("Started at", index)

#     try:
#         html = get_html(base_links[index])
#         last_url = get_last_page(html)
#         print("Last url: ", last_url)
#         if last_url == "#":
#             print("Cannot find last page: ")
#             file_write("Cannot find last page")
#             break
#         page_last_id = int(re.findall(r'\d+', last_url)[1])
#         main()
#     except Exception as e:
#         file_write(index, e)
#         print("Error: ", e)
#         break

#     file_write(index, "Finished crawling the page with index: \n\n ")
#     print("Finished : ", index)


