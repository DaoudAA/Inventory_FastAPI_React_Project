import React ,{useContext, useEffect} from 'react'
import { ProductContext } from '../ProductContext';
import { Table } from 'react-bootstrap';
import ProductRow from './ProductRow';
const ProductsTable = () => {
    const [products, setProducts] = useContext(ProductContext);

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
                            // handleDelete={handleDelete}
                            // handleUpdate={handleUpdate}
                            // handleSupplier={handleSupplier}
                        />
                    ))}
				</tbody>
			</Table>
        </div>
    );
}

export default ProductsTable
