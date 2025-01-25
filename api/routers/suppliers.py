from fastapi import APIRouter
from models import *


router = APIRouter(
    tags= ['supplier']
)

@router.post('/suppliers')
async def add_supplier(supplier_info: supplier_pydanticIn):
    supplier_obj = await Supplier.create(**supplier_info.dict(exclude_unset=True))
    response = await supplier_pydantic.from_tortoise_orm(supplier_obj)
    return {"status": "ok",
            "data" : response}

@router.get('/suppliers')
async def get_all_suppliers():
    response = await supplier_pydantic.from_queryset(Supplier.all())
    return {"status": "ok",
            "data" : response}

@router.get('/suppliers/{id}')
async def get_supplier(id: int):
    response = await supplier_pydantic.from_queryset_single( Supplier.get(id = id) )
    return {"status": "ok",
            "data" : response}

@router.put('/suppliers/{id}')
async def update_supplier(id: int , update_info : supplier_pydanticIn):
    supplier = await Supplier.get(id = id)
    update_info = update_info.dict(exclude_unset=True)
    supplier.name = update_info['name']
    supplier.email = update_info['email']
    supplier.company = update_info['company']
    supplier.phone = update_info['phone']
    await supplier.save()
    #response = await supplier_pydantic.from_tortoise_orm(supplier)
    response = await supplier_pydantic.from_queryset_single( Supplier.get(id = id) )
    return {"status": "ok",
            "data" : response}

@router.delete('/suppliers/{supp_id}')
async def delete_supplier(supp_id: int):
    await Supplier.filter(id=supp_id).delete()
    return {"status": "ok"
            }
