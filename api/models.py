from tortoise.models import Model
from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator

class Product(Model):
    id = fields.IntField(primary_key=True)
    productName = fields.CharField(max_length=30,nullable = False)
    quantityStock = fields.IntField(default = 0)
    quantitySold = fields.IntField(default = 0)
    unitPrice = fields.DecimalField(max_digits=8 , decimal_places=2 , default = 0.00)
    revenue= fields.DecimalField(max_digits=20 , decimal_places=2 , default = 0.00)
    suppliedBy = fields.ForeignKeyField('models.Supplier',
                                        related_name="goods_supplier")
    
class Supplier(Model):
    id = fields.IntField(primary_key=True)
    name = fields.CharField(max_length=20,nullable = False)
    company = fields.CharField(max_length=20,nullable = False)
    email = fields.CharField(max_length=100,nullable = False)
    phone = fields.CharField(max_length=20,nullable = False)

product_pydantic = pydantic_model_creator(Product , name="Product")
product_pydanticIn = pydantic_model_creator(Product , name="ProductIn" , exclude_readonly=True)


supplier_pydantic = pydantic_model_creator(Supplier , name="Supplier")
supplier_pydanticIn = pydantic_model_creator(Supplier , name="SupplierIn" , exclude_readonly=True)

#fronet end loading 
