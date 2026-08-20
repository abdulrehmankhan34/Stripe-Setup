import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import MiniShop from './MiniShop'
import './App.css'
import Success from './Success'
import Cancel from './Cancel'
// import Order from '../../Server/models/Order'
import OrderDetails from './OrderDetails'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MiniShop />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/orders/:id' element={<OrderDetails />} />
        </Routes>
      </BrowserRouter>
           
    </>
  )
}

export default App
