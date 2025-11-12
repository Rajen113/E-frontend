
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/home/Home'
import Layout from './components/layout/Layout'
import About from './components/pages/about/About'
import Register from './components/pages/register/Register'
import Login from './components/pages/login/Login'
import Shop from './components/pages/shop/Shop'
import Profile from './components/pages/profile/Profile'
import Cart from './components/pages/cart/Cart'
import AdminRegister from './components/pages/register/AdminRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes wrapped inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path='/shop' element={<Shop />} /> 
          <Route path='/profile' element={<Profile/>} /> 
          <Route path='/cart' element={<Cart/>} />   
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
