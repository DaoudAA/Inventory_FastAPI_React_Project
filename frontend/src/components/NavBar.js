import React, {useContext, useState} from 'react'
import {Navbar , Nav, Form , FormControl , Button , Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {ProductContext} from '../ProductContext'


const NavBar = () => {
    const [search , setSearch] = useState('')
    const [products , setProducts] = useContext(ProductContext)

    const updateSearch= (e) => {
        setSearch(e.target.value)
    }
    const originalProducts = React.useRef(products.data);

    const filterProduct = (e) => {
        e.preventDefault()
        if (search.trim() === '') {
            
            setProducts({ data: [...originalProducts.current] });
        } else {
            const filteredProducts = originalProducts.current.filter(product =>
                product.productName.toLowerCase().includes(search.toLowerCase())
            );
            setProducts({ data: [...filteredProducts] });
        }
    }
    return (
    <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Inventory Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">            
                    <Badge className="mt-2" variant="primary">Products In stock { products.data.length}</Badge>
                </Nav>
                <Form onSubmit={ filterProduct } inline>
                        <Link to="/addproduct" className="btn btn-primary btn-sm mr-4">Add Product</Link>
                        <FormControl value = {search} onChange={updateSearch} type="text" placeholder="Search" className="mr-sm-2" />
                <Button type="submit"  variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
)
}

export default NavBar
