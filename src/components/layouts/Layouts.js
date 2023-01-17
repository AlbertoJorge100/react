import React from 'react'
import Navbar from './Navbar'
import { useContext } from 'react';
import { userContext } from '../../App';

const Layouts = () => {
  
  return (
    <div className='home'>
      <Navbar />
        <div className="row">
          <div className="col-md-12">
              <img src="https://img.freepik.com/premium-vector/welcome-banner-sign-blue-red-green-bubbles-kids-child-funny-cute-poster-graphic_101884-1893.jpg?w=2000" alt="" width="900px" className="rounded mx-auto d-block" />
          </div>
      </div>    
    </div>
  )
}

export default Layouts