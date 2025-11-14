
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
import Contact from './components/pages/contact/Contact'
import ProductDetails from './components/pages/product/ProductDetails'
import Checkout from './components/pages/Checkout/Checkout'
import OrderSuccess from './components/pages/Checkout/OrderSuccess'
import Admin from './components/admin/pages/dashboard/ Dashboard'
import AdminLayout from './components/admin/adminLayout/AdminLayout'
import CreateProduct from './components/admin/pages/products/CreateProduct'
import ProductList from './components/admin/pages/products/ProductList'
import CategoryList from './components/admin/pages/category/CategoryList'
import CreateCategory from './components/admin/pages/category/CreateCategory'
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
          <Route path='/contact' element={<Contact/>}  />
          <Route path="/product/:id" element={<ProductDetails/>} /> 
          <Route path='/checkout' element={<Checkout/>} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin" element={<Admin/>} />

          </Route>

           <Route element={<AdminLayout/>}>
           <Route path="/admin/dashboard" element={<Admin/>} />
           <Route path="/admin/addProduct" element={<CreateProduct />} />
           <Route path="/admin/productList" element={<ProductList />} />
           <Route path="/admin/categoryList" element={<CategoryList />} />
           <Route path="/admin/createcategory" element={<CreateCategory />} />
           </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
