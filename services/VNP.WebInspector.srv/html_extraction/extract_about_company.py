import re

if __name__ == "__main__":
    from dictionary_common_key import company_header, phone_header,telephone
else:
    from html_extraction.dictionary_common_key import company_header,telephone, phone_header

from collections import Counter
import sys

# sys.setrecursionlimit(10**6)
parttern = '|'.join(company_header)

def lookup_company_at_terminal(source:str)-> tuple[str, str]:
    """
    Find the company name at the header or the footer of the page.
    """
    if not source:
        return None
    
    company_score = {}
    split_text = Get_Footer(source)

    for text in split_text:
        company, score = lookup_for_company(text)
        
        if company and score > 0:
            company_score[company] = company_score.get(company, 0) + score

    return detactment_list_of_company(company_score)

def lookup_tax_code_at_terminal(source:str)-> dict:
    """
    Find the tax code at the header or the footer of the page.
    """
    if not source:
        return None
    
    tax_code_score = {}
    split_text = Get_Footer(source)

    for text in split_text:
        tax_code, score = lookup_for_tax_code(text)
        if tax_code and score > 0:
            tax_code_score[tax_code] = tax_code_score.get(tax_code, 0) + score

    return tax_code_score

def lookup_for_company(paragraph:str)-> tuple[str, int]:
    """
    Get the tag with the attribute and value.
    """
    score, point = 0, 1

    # Replace the abbreviation /pre-processing
    paragraph = paragraph.lower()
    paragraph = re.sub(r'cty|c\.ty', 'công ty', paragraph)
    paragraph = re.sub(r'cttnhh', 'công ty tnhh', paragraph)
    paragraph = re.sub(r'ctcp', 'công ty cổ phần', paragraph)
    paragraph = re.sub(r'ctytnhh', 'công ty tnhh', paragraph)
    paragraph = re.sub(r'công ty cp', 'công ty cổ phần', paragraph)


    ## Check if the paragraph contains the company key
    if re.search(r'công ty|company|tập đoàn|tnhh|limited|ltd|jsc|cổ phần', paragraph):
        score += point
    else:
        return None, None


    if re.search(r'^(?!(công ty|tập đoàn)).*', paragraph):
        score -= point

    ## remove noise
    if len(re.findall(r'công ty', paragraph)) == 1:
        if re.search(r'(công ty|tập đoàn)$', paragraph):
            return None, None
        
        if re.search(r'công ty chuyên|công ty chúng tôi|công ty luôn|công ty và', paragraph):
            return None, None
        

    ### Handle text before return the paragraph
    word = re.search(r'(công ty.*)', paragraph)
    if word:
        paragraph = word.group()
        
    # split the paragraph into words
    if not re.search(r'co\.?,?ltd', paragraph):
        sentences = re.split(rf'[^\w\s-]', paragraph)
        for item in sentences:
            if re.search(r'(công ty|company|tập đoàn)', item):
                paragraph = item
                break

    # split with the stop words
    sentences = re.split(r'\b(là|chuyên cung cấp|mang đến|mang lại)\b', paragraph)
    for item in sentences:
        if re.search(r'(công ty|company|tập đoàn)', item):
            paragraph = item
            break
    
    paragraph = re.sub(r'\s+', ' ', paragraph)
    return paragraph,score

def lookup_for_tax_code(paragraph:str)-> tuple[str, int]:
    """
    Get the tag with the attribute and value.
    """
    score, point = 0, 1
    tax_key = ['mã số thuế', 'tax code', 'tax id', 'tax number', 
               'tax identification number', 'gpkd', 'đkkd', 'mst', 'dkkd',
               'do sở', 'đăng ký kinh doanh', 'đăng ký doanh nghiệp', 'giấy phép kinh doanh',
               'số qđ', 'quyết định thành lập', 'quyết định doanh nghiệp',
               ]
    phone_key = ['phone', 'sđt', 'điện thoại', 'hotline', 'liên hệ', 'fax', 'hostline', 'tel', 'liên lạc', 'contact']

    # Check if the paragraph contains the tax key
    if re.search('|'.join(tax_key), paragraph, re.IGNORECASE):
        score += 3*point

    # Check if the paragraph contains the phone key
    if re.search('|'.join(phone_key), paragraph, re.IGNORECASE):
        score -= 2*point

    # Check if the paragraph contains a date
    if re.search(r'\d{2,}[^\w\s]\d{2}[^\w\s]\d{2,}', paragraph):
        score += point

    # Check if the paragraph contains any indication of a tax code number
    tax_code = re.search(r'\d{10}', re.sub(r'[^\w]{2,}', '', paragraph))
    if tax_code:
        score += point
    else:
        return None, None

    # Check if the tax code is a phone number
    if tax_code.group()[:3] in phone_header:
        score -= point

    if tax_code.group()[:4] in telephone:
        score -= point

    # Check if the tax code is a hotline
    if tax_code.group()[:4] in ['1900','1800']:
        return None, None

    return tax_code.group(), score

def detactment_list_of_company(companies:dict)-> tuple[str,str]:
    """
    Get the list of company name.
    """
    if not companies:
        return None, None
    
    # just hold the company name with the company type first
    convert_companies_to_list = [key for key in companies.keys() if re.search(r'tnhh|limited|ltd|jsc|cổ phần', key)]
    # if there is no company type, then hold all the company name
    if not convert_companies_to_list:
        convert_companies_to_list = [key for key in companies.keys()]


    list_of_company = Counter(convert_companies_to_list)
    for key, value in list_of_company.items():
        list_of_company[key] = value + companies[key] - 1
    

    # Re-convert the list of companies to the new list without the company type
    company_remove_type:dict = {}
    for key, value in list_of_company.items():
        corp_name = re.sub(parttern, '', key)
        corp_name = re.sub(r'^[^\w]+', ' ', corp_name)
        corp_name = corp_name.strip()
        company_remove_type[corp_name] = value + company_remove_type.get(corp_name, 0)
    
    # Find the highest probability company
    bags:Counter = find_frequency_word(company_remove_type)
    for key, value in bags.items():
        bags[key] = value*len(key.split())

    if not bags :
        return None, None
    highest_probability_company = bags.most_common(1)[0][0].strip()

    # Find the company type
    type_of_company:str=0b1000000
    kind_of_company:str=0b100000
    for key, value in list_of_company.items():
        if highest_probability_company in key:
            type_of_company = create_type_of_company(key, type_of_company)
            kind_of_company = create_kind_of_company(key, kind_of_company)

    type_of_company = Get_type_of_company(type_of_company)
    kind_of_company = Get_kind_of_company(kind_of_company)

    join_text = ' '.join([type_of_company, kind_of_company, highest_probability_company])
    full_name = re.sub(r'\s+', ' ', join_text).lower().strip()
    return full_name, (kind_of_company + ' ' + highest_probability_company).strip()

def find_frequency_word(companies:dict, bags:Counter = None, index:int=1)->Counter:
    """
    Count the frequency of the word in the list of company.
    """
    if not bags:
        bags = Counter()

    another:dict = {}
    same:dict = {}
    search:str = ''

    # interupt the recursion
    if len(companies) == 1:
        key = list(companies.keys())[0]
        if key not in bags:
            bags[key] = companies.get(key, 0) + bags.get(key, 0)
        return bags

    for key, value in companies.items():
        if not search:
            words = key.split()
            search = ' '.join(words[:index])
            
            if len(words) > index:
                same[key] = value
        elif re.search(rf'\b{search}\b', key):
            same[key] = value
        else:
            another[key] = value
            
        if not search or re.search(rf'\b{search}\b', key):
            bags[search] = bags.get(search, 0) + value

    if same:
        find_frequency_word(same, bags, index+1)
    if another:
        find_frequency_word(another, bags, index)

    return bags

def create_kind_of_company(company:str,kind_of_company:str = 0b100000)-> str:
    """
    Create the kind of company. for instance, tm, dv, sx, xnk, xd
    """
    if re.search(r'\b(sx|sản xuất)\b', company):
        kind_of_company = (0b100000 >> 1) | kind_of_company

    if re.search(r'\b(tm|thương mại)\b', company):
        kind_of_company = (0b100000 >> 2) | kind_of_company

    if re.search(r'\b(dv|dịch vụ)\b', company):
        kind_of_company = (0b100000 >> 3) | kind_of_company

    if re.search(r'\b(xnk|xuất nhập khẩu)\b', company):
        kind_of_company = (0b100000 >> 4) | kind_of_company

    if re.search(r'\b(xd|xây dựng)\b', company):
        kind_of_company = (0b100000 >> 5) | kind_of_company

    return kind_of_company

def Get_kind_of_company(kind_of_company:str = 0b100000)-> str:
    kind:str = ''
    for i in range(kind_of_company.bit_length()):
        if kind_of_company & (0b10000 >> i):
            if i == 0:
                kind = 'SX'
            elif i == 1:
                kind = kind + ' ' + 'TM'
            elif i == 2:
                if 'TM' in kind:
                    kind = kind + '&' + 'DV'
                else:
                    kind = kind + ' ' + 'DV'
            elif i == 3:
                kind = kind + ' ' + 'xuất nhập khẩu'
            elif i == 4:
                kind = kind + ' ' + 'xây dựng'

    return kind

def create_type_of_company(company:str,type_of_company:str = 0b1000000)->str:
    """
    Create the type of company. for instance, cty, tnhh, tư nhân, hợp doanh, cổ phần
    """
    if re.search(rf'cổ phần|ctcp|công ty cổ phần|jsc|cp', company):
        type_of_company = 0b1011111 | type_of_company
    elif re.search(rf'tnhh|trách nhiệm hữu hạn|limmited|co\.,ltd', company):
        if re.search(rf'mtv|một thành viên', company):
            type_of_company = 0b1001100 | type_of_company
        else:
            type_of_company = 0b1000100 | type_of_company
    elif re.search(r'\b(tư nhân)\b', company):
        type_of_company = 0b1000011 | type_of_company
    elif re.search(r'\b(hợp danh|hợp doanh)\b', company):
        type_of_company = 0b1000001 | type_of_company

    if re.search(r'\b(tập đoàn)\b', company):
        type_of_company = 0b1100000 | type_of_company
    else: #công ty
        type_of_company = 0b1000000 | type_of_company

    return type_of_company

def Get_type_of_company(type_of_company:str = 0b1000000)-> str:
    """
    Get the type of company.
    """
    root = ''
    extention = ''
    for i in range(type_of_company.bit_length()):
        if type_of_company & (1 << i):
            if i == 5:
                root = 'Tập đoàn'
            elif i == 4:
                extention = 'cổ phần'
            elif i == 3:
                extention = 'TNHH MTV'
            elif i == 2:
                    extention = 'TNHH'
            elif i == 1:
                extention = 'tư nhân'
            elif i == 0:
                extention = 'hợp doanh'
        
    if not root:
        root = 'Công ty'
    
    return ' '.join([root, extention])

def Get_Footer(source:str)-> list[str]:
    """
    Find the company name at the header or the footer of the page.
    """
    if not source:
        return None

    split_text = []

    header = source.find('header')
    if header:
        header_text = header.get_text(separator='\n')
        split_text.extend(header_text.split('\n'))
    #footer
    footer = source.find('footer')
    if footer:
        footer_text = footer.get_text(separator='\n')
        split_text.extend(footer_text.split('\n'))

    footer_elements = source.find_all(
        True, 
        attrs={
            'id': re.compile(r'footer')
        }
    )

    # Tìm thẻ có class footer
    footer_elements += source.find_all(
        True,
        attrs={
            'class': re.compile(r'footer')
        }
    )
    
    for element in footer_elements:
        element_text = element.get_text(separator='\n')
        split_text.extend(element_text.split('\n'))

    return split_text