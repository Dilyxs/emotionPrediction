from fastapi import FastAPI, Request, UploadFile
import json
from asyncPostGress import AsyncPostgresHelper
from numpy import load
from helperfunc import EmotionMap, PredictWithModel
import shutil
import random
from dotenv import load_dotenv

import os

load_dotenv()
dns = os.getenv("DNS")
print(dns)
db = AsyncPostgresHelper()


async def queryData(id):
    result = await db.fetch("SELECT data from emotionweb WHERE id=$1", id)
    return result


async def postDataToDatabase(id, emotionmap, ip):
    await db.execute(
        "INSERT INTO emotionweb(id,data,userip) VALUES($1,$2,$3)",
        id,
        json.dumps(emotionmap),
        ip,
    )


app = FastAPI()


@app.post(f"/uploadimage/{id}")
async def create_upload_file(file: UploadFile, id: int):
    filepath = f"emotionsimages/{id}"

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)


@app.get("/")
async def getip(request: Request):
    ip = request.headers.get("x-forwaded_for", request.client.host)
    return {"ip": ip}


@app.get("/getprediction")
async def makePrediction(request: Request):
    ip = request.headers.get("x-forwaded_for", request.client.host)
    id = random.randint(0, 1000000)
    app.post(f"/uploadimage/{id}")
    mapping = PredictWithModel(f"emotionsimages/{id}")
    return json.dumps(mapping)
