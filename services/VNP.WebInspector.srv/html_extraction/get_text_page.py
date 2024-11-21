from bs4 import BeautifulSoup
import re

def get_text_page(html:str) -> list:
    """
    Get the text in an HTML document.
    """
    # Algorithm description:
    # 1. Parse the HTML document using BeautifulSoup.
    # 2. Get the text from the HTML document.
    # 3. Return the text.
    # Time complexity: O(n)
    if not html:
        return []

    soup = BeautifulSoup(html, 'html.parser')
    raw_text = soup.get_text(separator='\n')

    # split the text by the new line
    raw_contents = raw_text.split('\n')

    # remove the empty contents
    contents = [re.sub(r'\s+', ' ',content) for content in raw_contents if content.strip()]

    return contents
