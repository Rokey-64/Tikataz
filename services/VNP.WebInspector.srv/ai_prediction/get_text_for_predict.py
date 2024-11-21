

from filter.text_assessment import rate_text
from filter.text_handle import text_hold_num_remove, remove_special_characters, remove_space, remove_long_words, split_words_by_key, remove_stop_words
from html_extraction.get_text_page import get_text_page
import asyncio


async def get_text(content)->list:
    """
        Get the text for prediction.
    """
    list_of_val = []
        
    text = get_text_page(content)
    for t in text:
        t = t.lower()
        # t = convert_to_utf8(t)
        t = split_words_by_key(t)
        for sep in t:
            a,c = text_hold_num_remove(sep)
            if not c:
                continue

            a = remove_long_words(a)
            a = remove_space(a)
            a = remove_special_characters(a)
            a = remove_stop_words(a)
            a = a.strip()
            
            if rate_text(a):
                list_of_val.append(a)
    return list_of_val


async def get_text_for_predict(contents)->list:
    """
        Get the text for prediction.
    """
    list_of_val = []
    if not contents:
        return list_of_val
    
    vals = await asyncio.gather(*[get_text(content) for content in contents])
    for val in vals:
        list_of_val.extend(val)
    return list_of_val
            
        
        
