import re
import xml.etree.ElementTree as ET
from unidecode import unidecode
import math
if __name__ == '__main__':
    from dictionary_common_key import adress_abbreviations, provinces
else:
    from html_extraction.dictionary_common_key import adress_abbreviations, provinces

file_path = 'html_extraction/file/address.xml'

def remove_last_occurrence(text, word):
    # Tìm tất cả các vị trí xuất hiện của từ
    matches = list(re.finditer(rf'\b{word}\b', text))
    
    if matches:
        # Lấy vị trí của lần xuất hiện cuối cùng
        last_match = matches[-1]
        
        # Xóa lần xuất hiện cuối cùng
        start, end = last_match.span()
        text = text[:start] + text[end:]
    
    return text

def get_districts_by_province(xpath:str)-> str:
    """
    Read the xml file and return the list of the content.
    """
    global file_path
    
    list_content = []
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        province = root.findall(xpath)
        for p in province:
            text = p.get('none_unicode')
            if text:
                list_content.append(text)
    except:
        print("Error: Can't read the xml file.")
    finally:
        return list_content

def address_by_common_key(paragraph:str)-> tuple[str, int]:
    """
    Get the address by the common key.
    """

    #remove special characters
    if re.search(rf'\b(bà rịa|vũng tàu|brvt)\b', paragraph):
        paragraph = re.sub(rf'\b(bà rịa|vũng tàu|brvt)\b', '', paragraph) + ' bà rịa - vũng tàu '
    
    if re.search(rf'\b(phan rang|tháp chàm)\b', paragraph):
        paragraph = re.sub(rf'\b(phan rang|tháp chàm)\b', '', paragraph) + ' phan rang - tháp chàm '

    # paragraph = re.sub(r'[^\w\s]', ' ', paragraph)
    for key, value in adress_abbreviations.items():
        paragraph = re.sub(rf'{key}', value, paragraph)

    paragraph = re.sub(r'\s+', ' ', paragraph)
    none_uni_paragraph = unidecode(paragraph)

    score, point = 0, 1
    if re.search(r'\b(địa chỉ|trụ sở|văn phòng|official|chi nhánh|nhà máy|xưởng|vị trí|cở sở)\b', paragraph):
        score += point

    if re.search(r'\b(đường|tòa nhà|hẻm|số|tỉnh lộ|quốc lộ)\b', paragraph):
        score += point

    if re.search(r'\b(thôn|ấp|tổ|khu phố)\b', paragraph):
        score += point

    if re.search(r'\b(xã|phường|thị xã)\b', paragraph):
        score += point

    if re.search(r'\b(quận|huyện|thành phố|tỉnh|thị trấn|district|street|province|city)\b', paragraph):
        score += point

    # the text is too long
    limmited_word = 20
    length = len(re.sub(rf'[^\w\s]', '', paragraph).split())
    if length > limmited_word:
        new_core = math.ceil(length/limmited_word)
        score -= math.ceil(length/limmited_word)

    # Is there any province in the paragraph?
    check_exist_province = [p for p in provinces if re.search(rf'\b{p}\b', none_uni_paragraph)]
    if not check_exist_province:
        score -= point
    else:
        # Remove the province from the paragraph
        remove_provice = remove_last_occurrence(none_uni_paragraph, check_exist_province[0])

        district = get_districts_by_province(fr'./province[@{'none_unicode'}="{check_exist_province[0]}"]/district')

        # Is there any district in the paragraph?
        check_exist_district = [d for d in district if re.search(rf'\b{d}\b', remove_provice)]
        if check_exist_district:
            score += 2*point

        # try to check ward
        if not check_exist_district:
            ward = get_districts_by_province(fr'./province[@{'none_unicode'}="{check_exist_province[0]}"]/district[@type="Thành phố"]/ward')
            check_exist_ward = [w for w in ward if re.search(rf'\b{w}\b', remove_provice)]
            if check_exist_ward:
                score += 2*point

    if score < 3:
        return None, None
    
    return paragraph, score