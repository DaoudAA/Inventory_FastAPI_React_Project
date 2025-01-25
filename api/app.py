from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from routers import suppliers,products, emails
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

app= FastAPI()

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
# @app.get('/')
# def index():
#     return {"Msg ": "go to /docs or /redoc for api documentation "}

#cors urls 
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )



app.include_router(suppliers.router)
app.include_router(products.router)
app.include_router(emails.router)

register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True
)