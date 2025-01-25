import logo from './logo.svg';
import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter  as Router, Link, Routes , Route} from 'react-router-dom';
import { ProductProvider } from './ProductContext';
import ProductsTable from './components/ProductsTable';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <ProductProvider>
          <NavBar />
          <div className="row">
              <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                <ProductsTable/>
              </div>
          </div>
          </ProductProvider>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
