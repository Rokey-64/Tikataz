
if __name__ == '__main__':
    from dictionary_common_key import phone_header, telephone
else:
    from html_extraction.dictionary_common_key import phone_header, telephone

import re

# split the phone number into a list of phone numbers. For example: 18009091 - 18009092 - 03334629xx will be split into 18009091, 18009092, 03334629xx
def split_phone_number(text:str, range:list=[8,10,11,12],signs:list=[], point:int = 0)-> list:
    """
        Check if the phone number might be a list of phone numbers: xxxx xxx xxx - xxxx xxx xxx

        Args:
            text (str): The text to get phone number if exists
            range (list): the default lenght of the phone number
            signs (list): The list of signs
            point (int): The point of the slice
    """
    text_list = []
    score = 0

    # create signs. For example: 18009091 - 18009092 will be split into ['-', ' ']
    if not signs:
        signs = list(set(re.findall(r'[^\w]+', text)))
        if not signs:
            return text_list
    
    signs_length = len(signs)

    # break recursion condition
    if point >= signs_length:
        return text_list

    # split the text into slices. For example: 18009091 - 18009092 will be split into 18009091 and 18009092
    try:
        slices = re.split(signs[point], text)
    except:
        slices = re.split(rf'\{signs[point]}', text, flags=re.IGNORECASE)

    slices_length = len(slices)
    if not slices:
        return text_list
    
    # Calculate the score
    for slice in slices:
        if not slice:
            score+=1
            continue

        slice = re.sub(r'[^\w]', '', slice)

        # remove noise number and create a string of digit. 
        # For example: 8h18009090 - 18009092 will be split into 818009091 and 18009092 then value: 818009091 is noise
        # noises = re.findall(rf'(?<=\d)(.*?)(?=\d)', slice)
        # new_text = ''
        # for noise in noises:
        #     character = re.match(rf'[\u00C0-\u017F]+|[a-zA-Z]', noise)
        #     if character:
        #         new_text+=character.group()
                


        digits = ''.join(filter(str.isdigit, slice))
        if not digits:
            score+=1
            continue

        if len(digits) in range:
            score+=1

        text_list.append(digits)

    # if the score is equal to the length of the signs, return the text_list
    if score == slices_length:
        return text_list
    else:
        return split_phone_number(text, range, signs, point+1)

# (xx - xx) xxx xxx
def multiple_header(text:str)-> list:
    """
    # Check if the phone have any format: (xx - xx) xxx xxx
    """
    phone_list = []
    search = re.search(rf'\(\d+[^\w]+\d+\)', text)
    if search and search.group():

        tail = re.sub(rf'\(\d+[^\w]+\d+\)', '', text)
        if not tail:
            return

        convert_tail = ''.join(filter(str.isdigit, tail))
        if not convert_tail:
            return

        header = re.findall(r'\d+', search.group())
        for item in header:
            phone_list.append(item + convert_tail)

        return phone_list

# (+84) xxx xxx xxx
def national_number(text:str)-> list:
    """
    # Check if the phone number is a national number: 1800, 1900 xxxx
    """
    phone_list = []
    phone_nation_code = [
        rf'\+84',rf'\+1',rf'\+44',
        rf'\+33',rf'\+49',rf'\+81',
        rf'\+86',rf'\+82',rf'\+61',rf'\+7',
        rf'\+91',rf'\+55',rf'\+52',rf'\+62',
        rf'\+63',rf'\+60',rf'\+66',rf'\+65'
    ]

    if not re.search('|'.join(phone_nation_code), text):
        return phone_list
    
    # just hold the number and the plus sign
    convert_text = re.sub(r'[^\d\+]', '', text)
    number = ''.join(filter(str.isdigit, convert_text))
    lenght = len(number)

    if lenght < 10:
        return phone_list
    elif lenght in [10,11,12]:
        phone_list.append('+' + number)
    else:
        lst = split_phone_number('+' + number)
        if not lst:
            return phone_list
        
        for item in lst:
            results = national_number('+' + item)
            if not results:
                return phone_list
            phone_list.extend(results) 

    return phone_list

# 1800, 1900 xxxx
def hostline_number(text:str)-> list:
    """
    # Check if the phone number is a hotline: 1800, 1900 xxxx
    """
    phone_list = []
    phone_text = ''.join(filter(str.isdigit, text))
    if not re.search(r'|'.join(['1800','1900']), phone_text):
        return phone_list
    
    lenght = len(phone_text)
    if lenght < 8:
        return phone_list
    elif lenght in [8,10,11]:
        phone_list.append(phone_text)
    else:
        lst = split_phone_number(phone_text)
        if not lst:
            return phone_list
        
        for item in lst:
            results = hostline_number(item)
            if not results:
                return phone_list
            phone_list.extend(results)
    
    return phone_list

# 0333 xxx xxx (Viettel), 0868 xxx xxx (Viettel), 096 xxx xxx (Viettel), 097 xxx xxx (Viettel), 098 xxx xxx (Viettel)
def domectic_number(text:str)-> list:
    """
    # Check if the phone number is a domestic number: 039, 038, 037, 036, 035, 034, 033, 032, 086, 096, 097, 098
    """
    phone_list = []
    phone_text = ''.join(filter(str.isdigit, text))
    
    lenght = len(phone_text)
    if lenght in [10,11,12]:
        if phone_text[:3] in phone_header:
            phone_list.append(phone_text)
            return phone_list
        
        if phone_text[:4] in telephone:
            phone_list.append(phone_text)
            return phone_list
    else:
        lst = split_phone_number(phone_text)
        if not lst:
            return phone_list
        
        for item in lst:
            results = domectic_number(item)
            if not results:
                return phone_list
            phone_list.extend(results)
    
    return phone_list

def get_phone_number_from_text(content:str)-> list:
    matches = re.finditer(r'\+?([^\w\s]?\d+[^\w\s]? ?)+', content)
    phone = []

    for match in matches:
        phone_number = match.group()

        if ''.join(filter(str.isdigit, phone_number)) == '':
            continue

        # Check if the phone have any format: (xx - xx) xxx xxx
        way1 = national_number(phone_number)
        if way1:
            phone.extend(way1)
            continue

        way1 = hostline_number(phone_number)
        if way1:
            phone.extend(way1)
            continue

        way1 = multiple_header(phone_number)
        if way1:
            phone.extend(way1)
            continue

        way1 = domectic_number(phone_number)
        if way1:
            phone.extend(way1)
            continue

    return list(set(phone))

def get_phone_from_tag(soup)-> list:
    tag_contents = soup.find_all('a', href=re.compile(r'tel:'))
    phone = []
    for content in tag_contents:
        href = re.sub(r'(tel:|[^\w]|\s)', '', content['href'])
        resulfs = get_phone_number_from_text(href)
        if resulfs:
            phone.extend(resulfs)

    return phone


# val = split_phone_number(' - 841800 9091  - 18009092 - 18009093')
# val = split_phone_number('Điện thoại: 1800 9061  18008581', range=[8,10,11,12])
# val = get_phone_number_from_text('Điện thoại: +84 251 3543 730')
# print(val)