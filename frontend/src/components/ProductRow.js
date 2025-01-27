import React from 'react'

const ProductRow = ({id
    , productName 
    ,quantityStock
    ,quantitySold
    ,unitPrice
    ,revenue
, handleDelete, handleUpdate, handleSupplier }) => {
  return (
    <tr>
                        <td>{id}</td>
						<td>{productName}</td>
						<td>{quantityStock}</td>
						<td>{quantitySold}</td>
						<td>{unitPrice}</td>
						<td>{revenue}</td>
						<td>
                        <button onClick={() => handleUpdate(id)} className="btn btn-outline-info btn-sm ml-1 mr-2">Update</button>
                        <button onClick={() => handleSupplier(id)} className="btn btn-outline-success btn-sm mr-2">Supplier</button>
                        <button onClick={() => handleDelete(id)}  className = "btn btn-outline-danger btn-sm mr-2">Delete</button>
                        </td>
    </tr>
      
  )
}

export default ProductRow
