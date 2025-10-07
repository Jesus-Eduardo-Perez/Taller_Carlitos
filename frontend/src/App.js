import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Catalog from './Pages/Catalog';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import PrivateRoute from './Components/PrivateRoute';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Catalog />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/admin' element={<PrivateRoute element={<Admin />}/>}/>
        </Routes>
      </Router>
  );
}

export default App;
