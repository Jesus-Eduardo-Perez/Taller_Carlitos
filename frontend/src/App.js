import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Catalog from './Pages/Catalog';
import Login from './Pages/Login';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Catalog />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Router>
  );
}

export default App;
