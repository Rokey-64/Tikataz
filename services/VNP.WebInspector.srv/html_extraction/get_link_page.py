from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote
import re
from html_extraction.dictionary_common_key import prod_tempalte,about_tempalte,contact_tempalte
# from dictionary_common_key import prod_tempalte,about_tempalte,contact_tempalte

stop_links = r'.*\.(jpg|jpeg|png|gif|bmp|pdf|txt|doc|docx|xls|xlsx|zip|rar|mp3|mp4|avi|mkv|exe|tar|gz)$'

def is_valid_domain(domain):
    val = urlparse(domain)
    if not val.netloc:
        return False
    return True

def  get_relatived_link(html:str, domain:str, lengh:int) -> set:
    """
    Get the link in an HTML document.
    """
    # Algorithm description:
    # 1. Parse the HTML document using BeautifulSoup.
    # 2. Get the text from the HTML document.
    # 3. Return the text.
    # Time complexity: O(n)

    urls = set()
    soup = BeautifulSoup(html, 'html.parser')
    links = soup.find_all('a', href=True)

    for link in links:
        a_url = link.get('href')
        rela_url = get_full_link(domain, a_url)

        if not rela_url:
            continue

        if re.match(stop_links, rela_url):
            continue
        
        urls.add(rela_url)

        if len(urls) == lengh:
            break

    return urls

def get_full_link(domain:str, a_url:str)->str:
    """
    Get the full link from the domain and the link.
    """
    # Algorithm description:
    # 1. Parse the domain and the link.
    # 2. Return the full link.
    # Time complexity: O(1)
    if not domain or not a_url:
        return

    a_url_convert = unquote(a_url)
    
    # Skip the link if it is empty or a hash link.
    if not a_url_convert or a_url_convert in ['/', '#', 'javascript:void(0)']:
        return

    try:
        home_parse = urlparse(domain)
        linked_parse = urlparse(a_url_convert)
    except:
        return

    # Skip the link if it is not a relative link.
    if linked_parse.netloc and home_parse.netloc != linked_parse.netloc:
        return

    # Skip the link if it is a root link.
    if len(linked_parse.path) == 1:
        return
    
    rela_url = urljoin(domain, a_url_convert)
    if not is_valid_domain(rela_url):
        return

    # skip the link if it is a change language link
    if rela_url.endswith(('vi/','en/','ja/','vi','en','ja','index.php','index.html')):
        return

    return rela_url

def try_to_return_validated_link(url:str)->str:
    """
    Return the valid link if can.
    """
    if not url:
        return None
    
    linked_parse = urlparse(url)

    if url.startswith('//'):
        url = url.replace('//','')
        
    if not linked_parse.netloc:
        return None
    
    if not linked_parse.scheme:
        url = 'https://' + url 

    return url

def get_default_link(content:str, domain:str):
    """
    Get the default link of the website. For example, the product page, the about page, and the contact page.
    """
    menu = {
        'prod': set(),
        'about': set(),
        'contact': set()
    }
    partern1 = re.compile(rf'^({'|'.join(prod_tempalte)})\b')
    partern2 = re.compile(rf'^({'|'.join(about_tempalte)})\b')
    partern3 = re.compile(rf'^({'|'.join(contact_tempalte)})\b')

    soup = BeautifulSoup(content, 'html.parser')
    url_menu = soup.findAll('a', href=True)
    for link in url_menu:
        raw_text:str = link.get_text().strip().lower()
        if raw_text == '':
            continue
        
        # remove the special character
        url = link['href']
        url = re.sub(r'^[^\w]+','',url)
        link = get_full_link(domain, url)
        if not link:
            continue

        if re.search(partern1, raw_text):
            if len(menu.get('prod',set())) > 3:
                continue
            menu.get('prod',set()).add(link)
        
        if re.search(partern2, raw_text):
            if len(menu.get('about',set())) > 3:
                continue
            menu.get('about',set()).add(link)

        if re.search(partern3, raw_text):
            if len(menu.get('contact',set())) > 3:
                continue

            menu.get('contact',set()).add(link)
        
    return menu