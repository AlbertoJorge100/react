import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Products from './components/products/Products';
import Layouts from './components/layouts/Layouts';
import FormProducts from './components/products/FormProducts';
import ModalProducts from './components/products/ModalProducts';
import { useContext, createContext, useState } from 'react';
 /* import {UserProviders} from './providers/UserProviders';
import {UsProviders} from './providers/UsProviders.jsx'; */
import UserProviders from './providers/UserProviders';

function App() {
    
  return (    
    <Router>
      <UserProviders>        
          <div className="App">
            <Routes>
              <Route exact path='/' element = {<Layouts/>} />
              <Route path='/products' element = {<Products text = "asdfsdf" />} />
              <Route path='/products/form/:id?' element = {<FormProducts />} />          
              <Route path='/products/modal' element = {<ModalProducts />} />                      
            </Routes>
          </div>        
      </UserProviders>
    </Router>
  );  
}

export default App;
