import React ,{useContext, useEffect} from 'react'
import { ProductContext } from '../ProductContext';
import { Table } from 'react-bootstrap';
import ProductRow from './ProductRow';
import { useNavigate } from 'react-router-dom';
import { UpdateContext } from '../UpdateProductContext'
import {SupplierContext} from '../SupplierContext'
const ProductsTable = () => {
    const [products, setProducts] = useContext(ProductContext);
    const [updateProductInfo, setUpdateProductInfo] = useContext(UpdateContext)
    const [supplierDetail, setSupplierDetail] = useContext(SupplierContext)

    let history = useNavigate()

    const handleDelete = (id) => {
        fetch("http://127.0.0.1:8000/products/" + id, {
            method: "DELETE",
            headers: {
                accept: 'application/json'
            }
        })
            .then(resp => {
            return resp.json()
            })
            .then(result => {
                if (result.status === 'ok') {
                    const filteredProducts = products.data.filter((product) => product.id !== id);
                    setProducts({ data: [...filteredProducts] })
                    alert("Product deleted")
                } else {
                    alert("Product deletion failed")
            }
        })
    }

    const handleUpdate = (id) => {
        const product = products.data.filter(product => product.id === id)[0]
        setUpdateProductInfo({
            ProductName: product.productName,
            QuantityInStock: product.quantityStock,
            QuantitySold: product.quantitySold,
            UnitPrice: product.unitPrice,
            Revenue: product.revenue,
            ProductId: id
        })
        history.push("/updateproduct")
    }

    const handleSupplier = (id) => {
        console.log(id)
        fetch("http://localhost:8000/suppliers/" + id, {
            headers: {
                Accept: 'application/json'
            }
        }).then(resp => {
            return resp.json()
        }).then(result => {
            if (result.status === 'ok') {
                setSupplierDetail({ ...result.data })
                history.push("/supplierpage")
            }
            else {
                alert("error")
            }
        })

    }

    useEffect(() => {
        fetch('http://localhost:8000/products')
        .then(
            resp => {
                return resp.json();})
        .then(
            data => {
                setProducts({ "data":[...data.data]})
        })
    }, [])

  return (
    <div>
            <Table striped bordered hover>
				<thead>
					<tr>
						<th>Id</th>
						<th>Product Name</th>
						<th>Quantity In Stock</th>
						<th>Quantity Sold</th>
						<th>Unit Price</th>
						<th>Revenue</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
                    {products.data.map((product) => (
                        <ProductRow
                            id = {product.id}
                            productName = {product.productName}
                            quantityStock = {product.quantityStock}
                            quantitySold = {product.quantitySold}
                            unitPrice = {product.unitPrice}
                            revenue = {product.revenue}
                            key={product.id}
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                            handleSupplier={handleSupplier}
                        />
                    ))}
				</tbody>
			</Table>
        </div>
    );
}

export default ProductsTable
