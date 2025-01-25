import React from 'react'

const ProductRow = ({id
    , productName 
    ,quantityStock
    ,quantitySold
    ,unitPrice
    ,revenue }) => {
  return (
    <tr>
                        <td>{id}</td>
						<td>{productName}</td>
						<td>{quantityStock}</td>
						<td>{quantitySold}</td>
						<td>{unitPrice}</td>
						<td>{revenue}</td>
						<td>
                            <button className='btn btn-outline-info btn-sm ml-1 mr-2'>
                                Update
                            </button>
                            <button className='btn btn-outline-success btn-sm ml-1 mr-2'>
                                Supplier
                            </button>
                            <button className='btn btn-outline-danger btn-sm ml-1 mr-2'>
                                Delete
                            </button>
                        </td>
    </tr>
      
  )
}

export default ProductRow
