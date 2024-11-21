"""
This is the module to collect images from website.
It will collect:
    - Production images
    - Logo images
    - Customer, partner images
"""

from typing import List
from datetime import datetime,timezone
from nanoid import generate


class Header:
    """
    This class is responsible for collecting all the meta tags from the html file based on the following structure:

    args:

        language - the language of the website
        domain - the domain of the website
        time - the load time of the website
    """
    language:str = ""
    domain:str = ""
    time:dict = {}
    keywords:list = []
    logo:list = []

    def __init__(self):
        self.language = Header.language
        self.domain = Header.domain
        self.time = Header.time
        self.keywords = Header.keywords
        self.logo = Header.logo
        pass

    def to_dict(self):
        return {
            "language": self.language,
            "domain": self.domain,
            "time": self.time,
            "keywords": self.keywords,
            "logo": self.logo
        }
    
class Contact:
    """
    This class is responsible for collecting all the companylocation tags from the html file based on the following structure:

    args:
    
            address - the address of the company
            email - the email of the company
            phone - the phone number of the company
            social - the social network of the company
    """
    address:list = []
    email:list = []
    phone:list = []
    social:list = []

    def __init__(self):
        self.address = Contact.address
        self.email = Contact.email
        self.phone = Contact.phone
        self.social = Contact.social
        pass

    def to_dict(self):
        return {
            "address": self.address,
            "email": self.email,
            "phone": self.phone,
            "social": self.social
        }
    
class Company:
    """
    This class is responsible for collecting all the company tags from the html file based on the following structure:

    args:

        companyname - the name of the company
        timework - the time the company works
        taxcode - the tax code of the company
        companylocations - list of the conpapy office locations or factories
    """
    companyname:str = ""
    taxcode:list = []
    title:str = ""
    gov_link:str = ""

    def __init__(self):
        self.companyname = Company.companyname
        self.taxcode = Company.taxcode
        self.title = Company.title
        self.gov_link = Company.gov_link
        pass

    def to_dict(self):
        return {
            "companyname": self.companyname,
            "taxcode": self.taxcode,
            "title": self.title,
            "gov_link": self.gov_link
        }

class Description:
    """
    This class is responsible for collecting all the description tags from the html file based on the following structure:
    """
    description:str = ""
    intro:list = []
    certificate:list = []

    def __init__(self):
        self.description = Description.description
        self.intro = Description.intro
        self.certificate = Description.certificate
        pass

    def to_dict(self):
        return {
            "description": self.description,
            "intro": self.intro,
            "certificate": self.certificate
        }

class Production:
    """
    This class is responsible for collecting all the production tags from the html file based on the following structure:

    args:
    
            imageurl - the url of the production image
            tag - the description of the production
    """
    def __init__(self,imageurl:list,tag:str):
        self.imageurl = imageurl
        self.tag = tag
        pass

    def to_dict(self):
        return {
            "tag": self.tag,
            "img": self.imageurl
        }

class Prediction:
    def __init__(self, group_predict:list, weighted_predict:dict, keywords:List[str]):
        self.group_predict = group_predict
        self.weighted_predict = weighted_predict
        self.keywords = keywords
        pass

    def to_dict(self):
        return {
            "group_predict": self.group_predict,
            "weighted_predict": self.weighted_predict,
            "keywords": self.keywords
        }

class Metadata:

    def __init__(self):
        self.timestamp = int(datetime.now(timezone.utc).timestamp())
        self.upd_timestamp = 0
        self.id = generate()
        self.pre_version_id = ""
        self.next_version_id = ""

        pass

    def to_dict(self):
        return {
            "timestamp": self.timestamp,
            "upd_timestamp": self.upd_timestamp,
            "id": self.id,
            "pre_version_id": self.pre_version_id,
            "next_version_id": self.next_version_id
        }

class TagsCollector:
    """
    This class is responsible for collecting all the tags from the html file based on the following structure:
    
    args:

        meta - meta object
        title - the title of the website
        description - the description of the website
        logo - link to the logo
        favicon - link to the favicon
        productions - list of production

    """

    header:Header = Header()
    contact:Contact = Contact()
    description:Description = Description()
    company:Company = Company()
    productions:list = []
    prediction:Prediction = Prediction([],{},[])
    metadata:Metadata = Metadata()

    def __init__(self):
        self.header = TagsCollector.header
        self.contact = TagsCollector.contact
        self.description = TagsCollector.description
        self.company = TagsCollector.company
        self.productions = TagsCollector.productions
        self.prediction = TagsCollector.prediction
        self.metadata = TagsCollector.metadata
        pass

    def to_dict(self):
        return {
            "header": self.header.to_dict(),
            "contact": self.contact.to_dict(),
            "description": self.description.to_dict(),
            "company": self.company.to_dict(),
            "productions": self.productions,
            "prediction": self.prediction.to_dict(),
            "metadata": self.metadata.to_dict()
        }
    
    def is_null(self)->bool:
        if not self.contact.email and not self.contact.phone:
            return True
        
        if not self.prediction.weighted_predict:
            return True
        
        return False

