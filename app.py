from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from routers import suppliers,products

app= FastAPI()

# @app.get('/')
# def index():
#     return {"Msg ": "go to /docs or /redoc for api documentation "}


app.include_router(suppliers.router)
app.include_router(products.router)

register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules = {"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True
)