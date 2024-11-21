from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from models.caltalogs import Catalogs, Articles, BaseArticles

 
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://user:password@postgresserver/db"
MYSQL_HOST="103.218.122.181"
MYSQL_PORT="3306"
MYSQL_USER="admin"
MYSQL_PASSWORD="Tikcom@192.168.1.1@hnlhnl123"
MYSQL_DB="VNR.Blogs"
ENCODED_PASSWORD = quote_plus(MYSQL_PASSWORD)
ENCODED_DB = quote_plus(MYSQL_DB)
CONN_STR = f"mysql+pymysql://{MYSQL_USER}:{ENCODED_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{ENCODED_DB}"

engine = create_engine(CONN_STR, echo=True)
Session = sessionmaker(bind=engine)

# query data from table catalogs
def Catalogs_Read():
    session = Session()
    result = session.query(Catalogs)
    session.close()
    return result

# query data from table catalogs
def Articles_Read():
    session = Session()
    result = session.query(Articles)
    session.close()
    return result

# query data from table catalogs
def Articles_Title(idCatlg:int):
    session = Session()
    
    result = session.query(Articles.title, Articles.id).filter(Articles.idCatlg == idCatlg).all()
    titles = [{"title" : r[0], "id" : r[1]} for r in result]
    
    session.close()
    return titles

# query data from table catalogs
def Articles_Content(id:int):
    session = Session()
    
    result = session.query(Articles.content, Articles.id).filter(Articles.id == id).all()
    contents = [{"content" : r[0], "id" : r[1]} for r in result]
    
    session.close()
    return contents

# query data from table catalogs
# def Articles_Title(title:str):
#     session = Session()
#     result = session.query(Articles.title).filter(Articles.id == title).first()
#     return result

def Articles_Write(item:BaseArticles):
    session = Session()
    #db_item = Articles(**item.model_dump())
    db_item = Articles(
        idCatlg=item.idCatlg,
        title=item.title,
        vers=item.vers,
        content=item.content
    )
    try:
        session.add(db_item)
        session.commit()
        return ""
    except Exception as e:
        session.rollback()
        return str(e)
    finally:
        session.close()