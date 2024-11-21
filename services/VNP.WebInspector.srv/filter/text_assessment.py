import re

def short_characters(text:str, threshold:int=10) -> bool:
    """
    Check if there are many single characters in the text.
    """
    # Algorithm description:
    # 1. If percentage of short words in text is greater than the threshold, return False.
    # 2. Otherwise, return True.
    # Time complexity: O(n)

    words = re.findall(r'\w+', text)
    short_words = [word for word in words if len(word) <= 1]

    if len(words) == 0:
        return False

    if len(short_words) / len(words) > threshold:
        return False
    
    return True

def rate_text(text:str, threshold:int=0.5) -> bool:
    """
    Rate the text with a score
    """

    check = short_characters(text,threshold)

    return check