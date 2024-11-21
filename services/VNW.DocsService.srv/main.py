from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import dbconnection
from pydantic import BaseModel
from models.caltalogs import BaseArticles

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return dbconnection.Catalogs_Read().all()

@app.get("/Articles")
def getArticles():
    return dbconnection.Articles_Read().all()

@app.get("/catlg/{entry}/")
def getArticles(entry: str, idcatlg: int = 0):
    result = dbconnection.Articles_Title(idcatlg)
    return result

@app.get("/content/")
def getContent(id:int = 0):
    result = dbconnection.Articles_Content(id)
    return result

@app.post("/editors/")
async def create_article(items:BaseArticles):
    res = dbconnection.Articles_Write(items)
    return {'status':'finished', 'message':''} if res == "" else {'status':'not success', 'message':res}
    #return dbconnection.Articles_Write(items)