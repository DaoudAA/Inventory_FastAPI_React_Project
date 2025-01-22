from fastapi import APIRouter, HTTPException
from models import *


router = APIRouter(
    tags= ['product']
)

@router.post('/products/{supplier_id}')
async def add_product(supplier_id: int , product_details: product_pydanticIn):
    supplier = await Supplier.get(id=supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    product_details = product_details.dict(exclude_unset=True)
    product_details['revenue'] = product_details['unitPrice'] * product_details['quantitySold']  
    product_obj = await Product.create(**product_details, suppliedBy = supplier)
    response = await product_pydantic.from_tortoise_orm(product_obj)
    return {"status": "ok",
            "data" : response}

@router.get('/products')
async def get_all_products():
    response = await product_pydantic.from_queryset(Product.all())
    return {"status": "ok",
            "data" : response}

@router.get('/products/{id}')
async def get_product(id: int):
    response = await product_pydantic.from_queryset_single(Product.get(id = id) )
    return {"status": "ok",
            "data" : response}

@router.put('/products/{id}')
async def update_product(id: int , update_info : product_pydanticIn):
    product = await Product.get(id = id)
    update_info = update_info.dict(exclude_unset=True)
    product.productName = update_info['productName']
    product.quantityStock = update_info['quantityStock']
    product.quantitySold = update_info['quantitySold']
    product.unitPrice = update_info['unitPrice']
    product.revenue = update_info['unitPrice']*update_info['quantitySold']
    await product.save()
    response = await product_pydantic.from_queryset_single( Product.get(id = id) )
    return {"status": "ok",
            "data" : response}

@router.delete('/products/{supp_id}')
async def delete_product(product_id: int):
    await Product.filter(id=product_id).delete()
    return {"status": "ok"
            }
