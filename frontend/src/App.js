import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Catalog from './Pages/Catalog';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import PrivateRoute from './Components/PrivateRoute';
import AdminBrands from './Pages/AdminBrands';
import BrandPage from './Pages/BrandPage';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Catalog />}/>
          <Route path='/marcas/:brandName' element={<BrandPage />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/admin' element={<PrivateRoute element={<Admin />}/>}/>
          <Route path='/admin/marcas' element={<PrivateRoute element={<AdminBrands />}/>} />
        </Routes>
      </Router>
  );
}

export default App;
