import unicodedata
import re

def convert_to_utf8(data):
    """
    Remove the Vietnamese accent from a string.
    """
    key = key.replace('đ', 'd')
    key_none_vi = unicodedata.normalize('NFKD', key).encode('ascii', 'ignore').decode('utf-8')
    return key_none_vi