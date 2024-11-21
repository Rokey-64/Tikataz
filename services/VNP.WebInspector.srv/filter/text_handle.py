import re

def text_hold_num_remove(text:str, threshold:int=0.75)->tuple[str,bool]:
    """
        s1: remove any number in text
        s2: if the text is mostly number, return an empty string
    """

    number_count = len(re.findall(r'\d+', text))  # Đếm số lượng số trong chuỗi
    word_count = len(re.findall(r'\w+', text))  # Đếm số lượng từ trong chuỗi

    if word_count == 0:
        return '', False

    # If percentage of number in text is greater than 75%, return an empty string
    if number_count / word_count > threshold:
        return '', False
    
    return text, True

def remove_special_characters(text:str) -> str:
    """
    Remove special characters like [. , / : ' " ;] from a string.
    """
    val = re.sub(r'[^\w\s]', ' ', text)
    return val

def remove_space(text:str) -> str:
    """
    Remove space from a string if there are more than 1 space.
    """
    val = re.sub(r'\s+', ' ', text)
    return val

def remove_long_words(text:str, threshold:int=5) -> str:
    """
    Remove words that are longer than a certain threshold.

    Args:
        text (str): input text
        threshold (int, optional): threshold for the length of the word. Defaults to 5.
    """

    words = re.findall(r'\w+', text)
    if len(words) > threshold:
        text = ' '.join(re.findall(r'\w+', text)[:5])

    return text

def split_words_by_key(text:str, separator:list=['và','&','and',' '*2,',',';',r'\.',r'\|','-'])->list[str]:
    """
    Split a string into words by a separator.
    """

    separator = '|'.join(separator)


    spl = re.split(separator, text)
    return spl

def split_sentences(text:str)->list[str]:
    """
    Split a string into sentences.
    """
    spl = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', text)
    return spl

def remove_stop_words(text:str, stop_words:list[str]=['dịch vụ','xem thêm', 'chúng tôi', 'giới thiệu', 'danh mục', 'khách hàng', 'tin tức', 'thư viện', 'liên hệ'])->str:
    """
    Remove stop words from a string.
    """
    stop_words = '|'.join(stop_words)
    val = re.sub(stop_words, '', text)
    return val


