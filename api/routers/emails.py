from fastapi import APIRouter
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from typing import List
from dotenv import dotenv_values
from models import *
import os 

class EmailSchema(BaseModel):
    email: List[EmailStr]

class EmailContent(BaseModel):
    subject: str
    body: str

conf = ConnectionConfig(
    MAIL_USERNAME = "kaliikuli234@gmail.com",
    MAIL_PASSWORD = "kUlikalii234",
    MAIL_FROM = "kaliikuli234@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="Desired Name",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True
)

router = APIRouter(
    tags= ['email']
)

@router.post("/email/{productId}")
async def sendEmail(productId: int , content : EmailContent):
    supplier = await Product.get(id = productId).suppliedBy
    supplier_email = [supplier.email]
    html = f"""<p>Inventory of some products in AAD LLC</p>
            <br>
            <p>{content.subject}</p>
            <br>
            <p>{content.body}</p>
            <br>
            <h6> Best Regards </h6>
            <h6> AAD LLC </h6> 
            """

    message = MessageSchema(
        subject=content.subject,
        recipients=supplier_email,
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})