from fastapi import FastAPI, Request, UploadFile

import os
from fastapi.middleware.cors import CORSMiddleware  # <-- Import this
import json
from asyncPostGress import AsyncPostgresHelper
from numpy import load
from helperfunc import EmotionMap, PredictWithModel
import shutil
import random
from dotenv import load_dotenv


load_dotenv()
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

origins = [
    "http://localhost:3000",  # The usual Next.js port
    "http://127.0.0.1:3000",  # Alternative localhost
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"],
)


@app.post(f"/uploadimage/{id}")
async def create_upload_file(file: UploadFile, id: int):
    ext = os.path.splitext(file.filename)[1]
    filepath = f"./emotionsimages/{id}{ext}"

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return filepath


@app.get("/")
async def getip(request: Request):
    ip = request.headers.get("x-forwaded_for", request.client.host)
    return {"ip": ip}


@app.post("/getprediction")
async def makePrediction(request: Request, image: UploadFile):
    ip = request.headers.get("x-forwaded_for", request.client.host)
    id = random.randint(0, 1000000)
    filepath = await create_upload_file(image, id)
    mapping = PredictWithModel(filepath)
    for k, v in mapping.items():
        mapping[k] = float(v)
    print(mapping)
    return json.dumps(mapping)
