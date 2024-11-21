from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy import Table,Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import MetaData
from pydantic import BaseModel


Base = declarative_base()

class Catalogs(Base):
    __tablename__ = "TBCatalogs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    idDics = Column(Integer)
    create_date = Column(String)
    name = Column(String)
    remark = Column(String)
    column_number = Column(Integer)
    href_url = Column(String)
    # def __repr__(self) -> str:
    #     return f"Address(id={self.id!r}, email_address={self.email_address!r})"
    
class Articles(Base):
    __tablename__ = "TBArticles"
    id = Column(Integer, primary_key=True)
    idCatlg = Column(Integer)
    create_date = Column(String)
    title = Column(String)
    vers = Column(Integer)
    content = Column(String)

class BaseArticles(BaseModel):
    idCatlg:str
    #create_date:str
    title:str
    vers:str
    content:str
    
