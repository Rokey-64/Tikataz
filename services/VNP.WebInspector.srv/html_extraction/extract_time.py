import re

if __name__ == '__main__':
    from dictionary_common_key import cert_names
else:
    from html_extraction.dictionary_common_key import cert_names

date_keyword_partern = rf'\b(thứ hai|thứ ba|thứ tư|thứ năm|thứ sáu|thứ bảy|chủ nhật|thứ \d|t\d|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thur|fri|sat|sun)\b'
time_keyword_partern = rf'\b(giờ làm việc|working time|bắt đầu|kết thúc|thời gian làm việc)\b'

def create_time_schema(time_group:list)-> dict:
    """
    Create the time schema
    """
    # Default day of the week from Monday to Friday
    defaulf_day = [2,3,4,5,6,7]
    defaulf_start = '0800'
    defaulf_finish = '1700'
    # The empty time schema
    time_schema = {
        '2': {'start': None, 'finish': None},
        '3': {'start': None, 'finish': None},
        '4': {'start': None, 'finish': None},
        '5': {'start': None, 'finish': None},
        '6': {'start': None, 'finish': None},
        '7': {'start': None, 'finish': None},
        '8': {'start': None, 'finish': None},
    }

    # If the time group is empty, then set the default value for the time schema
    if not time_group:
        for key, value in time_schema.items():
            if key == '8':
                continue

            value['start'] = defaulf_start
            value['finish'] = defaulf_finish
        return time_schema

    # The previous start and finish time. If the start time is not available, it will be replaced by the previous finish time
    pre_start, pre_finish = None, None
    for time in time_group:
        dayofweek = time['dayofweek'] if time['dayofweek'] else defaulf_day
        for day in dayofweek:
            strday = str(day)
            start = time['start']
            finish = time['finish']

            if start and not time_schema[strday]['start']:
                time_schema[strday]['start'] = start

            if finish and not time_schema[strday]['finish']:
                time_schema[strday]['finish'] = finish

            if start and not pre_finish:
                pre_finish = finish

            if finish and not pre_start:
                pre_start = start

    # Set the default value for the time schema
    if not pre_start:
        pre_start = defaulf_start

    if not pre_finish:
        pre_finish = defaulf_finish

    # Update the time schema, if it is not available
    for key, value in time_schema.items():
        # If both start and finish times were not available, then skip
        if not value['start'] and not value['finish']:
            continue

        if not value['start']:
            value['start'] = pre_start

        if not value['finish']:
            value['finish'] = pre_finish
                
    return time_schema

def get_working_time(paragraph:str)-> tuple[str, int]:
    """
    Get the text contains the working time and the score of the text
    """
    global date_keyword_partern, time_keyword_partern
    threshold = 15
    score, point = 0, 1
    noise_word_partern = rf'\b(iso)\b'


    # remove the noise
    if re.search(noise_word_partern, paragraph):
        return None, None

    # If the paragraph is too long
    if len(re.sub(r'[^\w\s]', '', paragraph).split()) > threshold:
        return None, None

    # If the paragraph does not contain any number or date keyword
    if not re.search(rf'\d+', paragraph) and not re.search(date_keyword_partern, paragraph):
        return None, None
    
    # remove noise if the paragraph contains the certificate
    if re.search(rf'\b{'|'.join(cert_names)}\b', paragraph):
        return None, None
    
    # If the paragraph contains the date keyword
    if re.search(time_keyword_partern, paragraph, re.IGNORECASE):
        score += point

    if time_recognization(paragraph) != [None, None] or date_recognization(paragraph):
        score += point
    else:
        return None, None

    return paragraph.strip(), score

def create_group(raw:dict)-> list:
    """
    Time will be converted to the standard format and put into the list. For example: 8h00 -> 8:00 AM | Date 27/7 -> 2,3,4,5,6,7
    """
    global date_keyword_partern, time_keyword_partern
    groups = []

    if not raw:
        return groups

    for key, value in raw.items():
        convert_time = time_recognization(key)
        dayofweek = date_recognization(key)
       
        if len(convert_time) == 2:
            groups.append({
                'start': convert_time[0], 
                'finish': convert_time[1],
                'dayofweek': dayofweek
            })
        else:
            resulf = extract_datetime(key)
            if resulf:
                groups.extend(resulf)

    return groups
    
def extract_datetime(paragraphs:str)-> list[dict]:
    """
    Extract the time from the list

        args:
            paragraphs - The text contains the time.

        return:
            result - The list of the time group in the text.
    """
    result = []
    convert_time = time_recognization(paragraphs)
    dayofweek = date_recognization(paragraphs)
    
    if len(convert_time) == 2:
        return [{
            'start': convert_time[0], 
            'finish': convert_time[1],
            'dayofweek': dayofweek
        },]
    else:
        # separate the paragraph into the list of the sentence that contains the time
        time_paragraphs = separate_time(paragraphs)
        for time_paragraph in time_paragraphs:
            group = extract_datetime(time_paragraph)
            if group:
                result.extend(group)
        
    return result

def separate_time(paragraphs:str)-> list:
    """
    Separate the paragraph into the list of the sentence that contains the time. For example: Monday - friday: 8:00 to 17:00  | Saturday: 8:00 to 12:00 | Sunday: off 

        args:
            paragraphs - The text contains the time.

        return:
            time_paragraphs - The list of the sentence that contains the time.
    """
    time_paragraphs = []
    result = time_default_detection(paragraphs)
    if not result:
        return None
    
    new_paragraphs = paragraphs
    for i in range(len(result)):
        if i % 2 != 0:
            value = re.search(rf'^.*?{result[i]}\b', new_paragraphs)
            new_paragraphs = new_paragraphs.replace(value.group(), '')
            time_paragraphs.append(value.group())

    time_paragraphs.append(new_paragraphs)
    return time_paragraphs

def convert_time_to_xxxx(digit:str)-> str:
    """
    Convert the time to the standard format. For example: 8h30 -> 0830 | 9h -> 0900 | 17:00 -> 1700
    """
    length = len(digit)
    if  length == 3:
        digit = '0'+digit
    elif length == 2:
        digit = digit + '00'
    elif length == 1:
        digit = '0'+digit+'00'
    
    return digit

def time_recognization(text:str)-> dict:
    """
    Return the time in the text. For example: working time is from 8:00 to 17:00 -> [0800, 1700]

        args:
            text - The text contains the time.

        return:
            resulf - The list of the time in the text.
    """
    resulf = []

    # Time as format: 24/24 or 24/7
    times = re.finditer(r'\b24h?\/(7|24h?)\b', text, re.IGNORECASE)
    convert_time = list(times)
    if convert_time:
        return ['0000', '2400']
    
    # Find the time by the default format
    convert_time = time_default_detection(text)

    # Convert the time to the standard format
    for value in convert_time:
        digit = ''.join(filter(str.isdigit, value))
        digit = convert_time_to_xxxx(digit)

        # Check if the time is PM then add 12 hours
        if re.search(r'\s?p\.?m\b', value):
            try_convert = int(digit) + 1200 #12h00 PM

            # Check if the time is over 24h00
            if try_convert < 2400:
                digit = str(try_convert)

        resulf.append(digit)

    # Get the default value from 8:00 to 17:00
    if not resulf:
        return [None, None]
    
    if len(resulf) == 1:
        if int(resulf[0]) < 1200:
            return [resulf[0], None]
        else:
            return [None, resulf[0]]

    return resulf

def time_default_detection(text:str)-> list:
    """
    Check if the text contains the default time. For example: 8h30 - 17h30, 9am - 5pm, 8:00 - 17:00

        args:
            text - The text contains the time.

        return:
            resulf - The list of the time in the text.
    """
    convert_time = []
    resulf = []
    if not convert_time:
        # Time as format: XX:XX. For example: 8:00, 8:30
        times = re.finditer(r'\b(0?[1-9]|1[0-9]|2[0-4])(:00|:30|h:00|h:30|h00|h30)\b', text, re.IGNORECASE)
        convert_time = list(times)

    if not convert_time:
        # Time as format: XXh-YYh. For example: 8h-17h
        times = re.finditer(r'\b(0?[1-9]|1[0-9]|2[0-4])h\b', text, re.IGNORECASE)
        convert_time = list(times)

    if not convert_time:
        # Time as format: XXam-YYpm. For example: 8am-17pm
        times = re.finditer(r'\b(0?[1-9]|1[0-9]|2[0-4])(\s?a\.?m|\s?p\.?m)\b', text, re.IGNORECASE)
        convert_time = list(times)

    if not convert_time:
        # Time as format: XX giờ - YY giờ. For example: 8 giờ đến 17 giờ 30
        times = re.finditer(r'\b(0?[1-9]|1[0-9]|2[0-4])(\s?giờ\s?30|\s?giờ)\b', text, re.IGNORECASE)
        convert_time = list(times)

    for time in convert_time:
        value = time.group()
        resulf.append(value)

    return resulf

def date_recognization(text:str)-> list:
    """
    Return the date in the text. For example: from Monday to Sunday -> [2,3,4,5,6,7,8]

        args:
            text - The text contains the date.

        return:
            resulf - The list of the date in the text.
    """
    resulf = set()

    if re.search(rf'\b(full(-|\s)?time|toàn thời gian|24h?\/7)\b', text, re.IGNORECASE):
        return resulf.union({2,3,4,5,6,7,8})
    
    if re.search(rf'\b(thứ hai|monday|mon|t2|thứ 2)\b', text, re.IGNORECASE):
        resulf.add(2)
    if re.search(rf'\b(thứ ba|tuesday|tue|t3|thứ 3)\b', text, re.IGNORECASE):
        resulf.add(3)
    if re.search(rf'\b(thứ tư|wednesday|wed|t4|thứ 4)\b', text, re.IGNORECASE):
        resulf.add(4)
    if re.search(rf'\b(thứ năm|thursday|thu|t5|thứ 5)\b', text, re.IGNORECASE):
        resulf.add(5)
    if re.search(rf'\b(thứ sáu|friday|t6|fri|thứ 6)\b', text, re.IGNORECASE):
        resulf.add(6)
    if re.search(rf'\b(thứ bảy|saturday|sat|thứ 7)\b', text, re.IGNORECASE):
        resulf.add(7)
    if re.search(rf'\b(chủ nhật|sunday|sun)\b', text, re.IGNORECASE):
        resulf.add(8)

    if len(resulf) == 2:
        min_value = min(resulf)
        max_value = max(resulf)
        for min_value in range(min_value, max_value):
            resulf.add(min_value)

    return resulf

# val, res = get_working_time('08:00 - 20h:00')
# res = look_up_working_time({val: res})
# sch = create_time_schema(res)
# print(sch)