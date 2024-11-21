import requests
from bs4 import BeautifulSoup
import time
from sqlconnection import updateCorp, insertTBCorpActivation, inserIndustryCode, insertCorpActiveDate

from log import file_write

i:int = 0


# Function to get the HTML content of a webpage
def get_html(url):
    global i
    
    if i == 60:
        file_write(url, "get_html is overdue")
        raise Exception("get_html is overdue")
    
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    except requests.exceptions.RequestException as e:
        time.sleep(1)
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    
    if response.status_code == 403:
        i = i + 1
        return get_html(url)
    else:
        i = 0

    time.sleep(1)

    return response.text

############################################################################################################
# Function to get the title of a webpage
def get_data(html:str, page_id:int):
    soup = BeautifulSoup(html, 'html.parser')
    div = soup.find('div', class_='listview-outlook')
    if not div:
        return None
    
    a_links = div.find_all('a', class_='list')
    if not a_links:
        return None
    
    return a_links


# Function to update the database
def update_data(html:str, page_id:int, code:int) -> bool:
    
    a_links = get_data(html, page_id)
    if not a_links:
        return None
    
    for link in a_links:
        if link:
            next

        url = link['href'].replace("'", "").replace('"', '')
        name = link.find('span', class_='list-title').text.replace("'", "").replace('"', '')
        tax_code = link.find('span', class_='list-subtitle').text.replace("'", "").replace('"', '')
        address = link.find('span', class_='list-remark').text.replace("'", "").replace('"', '')

        if not url or not name or not tax_code or not address:
            next

        check:bool = updateCorp(name, tax_code, address, url, page_id, code)
        if not check:
            return False
    return True


# Function to get the next page
def get_next_page(html):
    soup = BeautifulSoup(html, 'html.parser')
    pagination = soup.find('div', class_='pagination')
    if not pagination:
        return '#'
    

    active_page = pagination.find('li', class_='active')
    if not active_page:
        return '#'
    
    next_page = active_page.find_next_sibling('li')
    if not next_page:
        return '#'

    next_class = next_page.get('class')
    if next_class and next_class.__contains__('disabled'):
        return 'end'
    
    get_link = next_page.find('a')
    if not get_link:
        return '#'
    
    href = get_link['href']

    return href

def get_last_page(html):

    soup = BeautifulSoup(html, 'html.parser')
    pagination = soup.find('div', class_='pagination')
    if not pagination:
        return '#'

    active_page = pagination.find('li', class_='last')
    if not active_page:
        return '#'
    
    get_link = active_page.find('a')
    if not get_link:
        return '#'
    
    href = get_link['href']

    return href

######################################################### IS ACTIVED ################################
def crawl_detail(html:str, id:int):
    soup = BeautifulSoup(html, 'html.parser')
    ls = []

    # Check whether the corp is active or not
    active = soup.find('div', class_='notfound_message')
    if active:
        try:
            insertTBCorpActivation(id)
        except Exception as e:
            raise e
        
        return False
    
    ###################################################### FIND ACTIVE DATE ########################################

    ul = soup.find('ul', id='detail-list')
    if not ul:
        return False
    
    geti = ul.find('i', class_='icon-boss')
    if not geti:
        return False
    
    li = geti.find_parent('li')
    if not li:
        return False
    
    a = li.find('a')
    if a:
        person = a.text.strip()

    geti = ul.find('i', class_='icon-calendar')
    if not geti:
        return False
    
    li = geti.find_parent('li')
    if li:
        active_date = li.text.replace('Ngày hoạt động:', '').strip()

    try:
        insertCorpActiveDate(id, active_date, person)
    except Exception as e:
        raise e

    
    ###################################################### FIND INDUSTRY CODE ########################################
    # Get the name of the corp
    table = soup.find('table')
    if not table:
        return False
    
    tbody = table.find('tbody')
    if not tbody:
        return False
    
    trs = tbody.find_all('tr')
    if not trs:
        return False
    
    for tr in trs:
        td = tr.find_all('td')
        if len(td) < 2:
            continue
        
        
        industry_code = td[0].text
        isMain = 1 if td[2].text == 'Y' else 0
        ls.append((id, industry_code, isMain))

    if len(ls) == 0:
        return False
    
    try:
        inserIndustryCode(ls)
    except Exception as e:
        raise e

    return True