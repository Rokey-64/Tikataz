
from filter.text_handle import remove_special_characters, remove_space

from bs4 import BeautifulSoup
import re
from collections import Counter
from html_extraction.dictionary_common_key import phone_header, telephone, cert_names
from html_extraction.extract_address import address_by_common_key
from html_extraction.extract_about_company import lookup_company_at_terminal, lookup_tax_code_at_terminal
from html_extraction.extract_phone_number import get_phone_number_from_text, get_phone_from_tag
from html_extraction.extract_time import get_working_time, create_group , create_time_schema
from html_extraction.tags_collector import Header, Contact, Company, Description, TagsCollector

cert_parten = '|'.join(cert_names)

def get_paragrab(soup: BeautifulSoup)-> list:
    """
    Get the paragrab from the HTML document.
    """
    paragrab = []
    for p in soup.findAll('p'):
        paragrab.append(p.text)
    return paragrab

def lookup(contents:list, domain:str)-> TagsCollector:
    """
        Get the tag with the attribute and value.

        This function is mainly in charge of geting the information company from the HTML document.
    """
    if not contents or not domain:
        return None
    
    ### INITIALIZATION
    rate_tax = dict()
    rate_work_time = dict()
    rate_address = dict()
    rate_company = dict()
    phones = set()
    emails = set()
    socials = set()
    rate_intro = dict()
    rate_certificate = dict()
    keywords = set()

    ### COLLECTING THE DATA
    homepage = BeautifulSoup(contents[0], 'html.parser')
    title:str = lookup_for_title(homepage)
    language:str = lookup_for_language(homepage)
    gov_link = lookup_for_gov_link(homepage)
    description = lookup_description(homepage)
    corp_name, sort_name = lookup_company_at_terminal(homepage)
    tax_code = lookup_tax_code_at_terminal(homepage)

    for content in contents:
        soup = BeautifulSoup(content, 'html.parser')
        text = soup.get_text(separator='\n')
        split_text = text.split('\n')

        footer = soup.find('footer')
        if footer:
            footer_text = footer.get_text(separator='\n')
            split_text.extend(footer_text.split('\n'))

        for paragraph in split_text:
            paragraph = paragraph.replace('\xa0', ' ').strip()
            if not paragraph:
                continue

            paragraph = paragraph.lower()

            time, time_score = get_working_time(paragraph)
            set_score(time, time_score, rate_work_time)

            intro, intro_score = lookup_intro(paragraph)
            set_score(intro, intro_score, rate_intro)

            certificate, certificate_score = lookup_certificate(paragraph)
            set_score(certificate, certificate_score, rate_certificate)

            address, address_score = address_by_common_key(paragraph)
            set_score(address, address_score, rate_address)

        phone_number = get_phone_number_from_text(text)
        if phone_number:
            phones.update(phone_number)
            
        phone_number = get_phone_from_tag(soup)
        if phone_number:
            phones.update(phone_number)

        mail = lookup_for_email(text)
        if mail:
            emails.update(mail)

        mail = look_up_email_by_tag(soup)
        if mail:
            emails.update(mail)

        zalo = find_zalo(soup)
        if zalo:
            socials.update(zalo)
            
        facebook = find_facebook(soup)
        if facebook:
            socials.update(facebook)

        resulf = lookup_for_keyword(soup)
        if resulf:
            keywords.update(resulf)

    time_group = create_group(rate_work_time)
    time_schema = create_time_schema(time_group)

    ### CREATE THE SCHEMA
    header = Header()
    header.language = language
    header.domain = domain
    header.time = time_schema
    header.keywords = list(keywords)

    contact = Contact()
    contact.address = list(rate_address.keys())
    contact.email = list(emails)
    contact.phone = list(phones)
    contact.social = list(socials)

    company = Company()
    company.companyname = corp_name
    company.taxcode = list(tax_code.keys())
    company.title = max(title, sort_name, key=len) if title and sort_name else None
    company.gov_link = gov_link

    desc = Description()
    desc.description = description
    desc.intro = list(rate_intro.keys())
    desc.certificate = list(rate_certificate.keys())

    tags = TagsCollector()
    tags.header = header
    tags.contact = contact
    tags.company = company
    tags.description = desc

    return tags

def set_score(text:str, score:int, container:dict)-> bool:
    """
    Get the tag with the attribute and value.
    """
    if not text or score <= 0:
        return False
    
    container[text] = score + container.get(text, 0)
    return True

def lookup_for_time_working(paragraph:str)-> tuple[str, int]:
    """
    Get the tag with the attribute and value.
    """
    global cert_parten
    threshold = 15
    score, point = 0, 1
    nagative_01 = rf'\b(iso)\b'
    positive_01 = rf'\b(hai|ba|tư|năm|sáu|bảy|chủ nhật|thứ \d|t\d|toàn thời gian|fulltime)\b'
    positive_02 = rf'\b(giờ làm việc|working time|chủ nhật|bắt đầu|kết thúc|pm|p.m|am|a.m|thời gian làm việc)\b'

    if re.search(nagative_01, paragraph):
        return None, None

    if len(re.sub(r'[^\w\s]', '', paragraph).split()) > threshold:
        return None, None

    if not re.search(rf'\d+', paragraph) and not re.search(positive_01, paragraph):
        return None, None
    
    if re.search(positive_02, paragraph, re.IGNORECASE):
        score += point

    # if there have any indication of the time as  xx:30 or xx:00
    time = re.findall(r'\d{1,2}(:|h:|h)(00|30)', paragraph)
    if len(time) == 1:
        score += point
    elif len(time) == 2:
        score += 2*point

    # if there have any indication of the time as  24/24 or 24/7
    if re.search(rf'\b(24/24|24/7)\b', paragraph):
        score += point
    
    # remove noise if the paragraph contains the certificate
    if re.search(cert_parten, paragraph):
        score -= 2*point

    return paragraph.strip(), score

def lookup_for_email(content:str)-> list:
    """
    Get the tag with the attribute and value.
    """
    email = []
    mail_list = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', content)
    for mail in mail_list:
        email.append(mail)

    return email

def look_up_email_by_tag(soup)-> list:
    finda = soup.find_all('a', href=re.compile(r'mailto:'))
    email = []
    for a in finda:
        mail = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', a['href'])
        if mail:
            email.extend(mail)

    return email

def lookup_description(soup)->str:
    """
    Get the tag with the attribute and value.
    """
    description = soup.find('meta',attrs={'name': re.compile(r'description', re.IGNORECASE)}, content=True)
    if not description:
        return None
    
    word_threshold = 5
    
    content:str = description['content'].lower()

    # check if there have any indication of the company
    if re.search(r'công ty|company|tập đoàn', content):
        return None
    
    if len(content.split(' ')) < word_threshold:
        return None
    
    return description['content']

def lookup_intro(paragraph)->str:
    """
    Get the tag with the attribute and value.
    """
    score, point = 0, 1
    parten = r'\b(cung cấp|chuyên|đơn vị|mang lại|giải pháp|thi công|trải qua|hợp tác|chúng tôi|mong muốn|trở thành)\b'
    not_include = ['chuyên ngành',"chuyên chức","trình duyệt","javascript"]
    stop_words = ['như','và','thì','nhưng','có','hoặc','thì','ở','là']
    

    search = re.search(parten, paragraph)
    if not search:
        return None, None
    
    start_index = search.start()
    paragraph = paragraph[start_index:]
    
    if re.search(r':$', paragraph):
        return None, None
    
    if re.search(r'|'.join(not_include), paragraph):
        return None, None

    # paragraph = search.group()
    
    #split the paragraph into sentences by the punctuation
    split_sentence = re.split(r'(?<!\.)\.(?!\.)|[;!?]+', paragraph)
    for sentence in split_sentence:
        if re.search(rf'\b({parten})\b', sentence):
            paragraph = sentence
            break
    
    # split the paragraph into words by the space
    grab_words = re.sub(r'[^\w\s]', '', paragraph).split(' ')
    if len(grab_words) < 10:
        return None, None

    if len(grab_words) > 15:
        score += point

    if re.search(r'\.{3}', paragraph):
        score += point

    if re.search(parten, paragraph):
        score += point

    if len(grab_words) > 50:
        return None, None

    charact = re.findall(r'[^\w\s]', paragraph.replace('...', ''))
    
    if charact and len(charact)/len(grab_words) > 0.4:
        score -= point

    if re.search(r'công ty', paragraph):
        score -= point

    if re.search(rf'({'|'.join(stop_words)})$', paragraph):
        score -= 2*point

    paragraph = re.sub(rf'({'|'.join(stop_words)})$', '', paragraph)
    paragraph = re.sub(r'^[^\w]+|[^\w]+$', ' ', paragraph)
    return paragraph.strip(), score

def find_zalo(soup)-> list:
    """
    Get the tag with the attribute and value.
    """
    zalo = soup.find('a', href=re.compile(r'zalo.me'))
    if not zalo:
        return None
    
    href = zalo['href']
    if href in ['https://zalo.me/', 'https://zalo.me']:
        return None
    
    href = re.sub(r'^[^\w\s]+', '', href)
    href = re.sub(r'\/+$', '', href)
    return [href,]

def find_facebook(soup)-> list:
    """
    Get the tag with the attribute and value.
    """
    facebook = soup.find('a', href=re.compile(r'facebook.com'))
    if not facebook:
        return None
    
    href = facebook['href']
    if href in ['https://www.facebook.com/', 'https://www.facebook.com']:
        return None
    
    href = re.sub(r'^[^\w\s]+', '', href)
    href = re.sub(r'\/+$', '', href)
    return [href,]

def lookup_certificate(paragraph:str)-> tuple[str, int]:
    """
    Get the tag with the attribute and value.
    """
    global parten
    score, point = 0, 1

    if re.search(cert_parten, paragraph):
        score += point

    return paragraph, score

def lookup_for_title(soup)-> str:
    """
    Get the tag with the attribute and value.
    """
    title = soup.find('title')
    if not title:
        return None
    
    title = re.sub(r'\b^(trang chủ|home|page|giới thiệu)\b', '', title.text).strip()
    title = re.sub(r'^[^\w]+', '', title).strip()

    texts = title.split(' ')

    #minimum threshold word for the title
    threshold = 5
    if len(texts) < threshold:
        return ''

    return title

def lookup_for_language(soup)-> str:
    """
    Get the tag with the attribute and value.
    """
    try:
        language = soup.find('html')['lang']
        if not language:
            return None
    except:
        language = 'vi-VN'
    
    return language

def lookup_for_gov_link(soup)-> str:
    """
    Get the tag with the attribute and value.
    """
    link = soup.find('a', href=re.compile(rf'http:\/\/online.gov.vn\/Home\/WebDetails\/\d+$'))
    if not link:
        return None
    
    return link['href']

def lookup_for_keyword(soup)-> list:
    """
    Get the tag with the attribute and value.
    """
    keyword = soup.find('meta',attrs={'name': re.compile(r'keyword', re.IGNORECASE)}, content=True)
    if not keyword:
        return None
    result = []
    val = keyword['content'].lower().split(',')
    for index in range(len(val)):
        var = re.sub(r'^[^\w]', '', val[index])
        if var:
            result.append(var)
    return result

