import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import MiniShop from './MiniShop'
import './App.css'
import Success from './Success'
import Cancel from './Cancel'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MiniShop />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
      </BrowserRouter>
           
    </>
  )
}

export default App
