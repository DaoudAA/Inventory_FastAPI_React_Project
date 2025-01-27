import logo from './logo.svg';
import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter  as Router, Link, Routes , Route} from 'react-router-dom';
import { ProductProvider } from './ProductContext';
import ProductsTable from './components/ProductsTable';
import { UpdateProductContextProvider } from './UpdateProductContext';
import AddProducts from './components/AddProducts'
import UpdateProduct from './components/UpdateProduct'
import { SupplierContextProvider } from './SupplierContext'
import SupplierPage from './components/SupplierPage'
function App() {
  return (
    <div className="App">
      <ProductProvider>
      <UpdateProductContextProvider>
        <SupplierContextProvider>
          <Router>
            <NavBar />
            <div className="row">
              <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                <Routes>
                  <Route path="/" element={<ProductsTable />} />
                  <Route path="/updateproduct" element={<UpdateProduct />} />
                  <Route path="/supplierpage" element={<SupplierPage />} />
                  <Route path="/addproduct" element={<AddProducts />} />
                </Routes>
              </div>
            </div>
          </Router>
        </SupplierContextProvider>
      </UpdateProductContextProvider>
    </ProductProvider>
    </div>
  );
}

export default App;
