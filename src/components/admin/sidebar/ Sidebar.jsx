import React, { useState } from "react";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaChartPie,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="logo">ADMIN</h2>

      <ul className="menu-list">

        <li>
          <FaHome />
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>

      
        <li className="dropdown" onClick={() => setOpenProduct(!openProduct)}>
          <FaBox />
          <span>Product</span>
          {openProduct ? <FaChevronUp className="arrow" /> : <FaChevronDown className="arrow" />}
        </li>

        {openProduct && (
          <ul className="submenu">
            <li><Link to="/admin/addProduct">Create Product</Link></li>
            <li><Link to="/admin/productList">Product List</Link></li>
             <li><Link to="/admin/editProduct">Edit Product</Link></li>
          </ul>
        )}

        <li className="dropdown" onClick={() => setOpenCategory(!openCategory)}>
          <FaChartPie />
          <span>Category</span>
          {openCategory ? <FaChevronUp className="arrow" /> : <FaChevronDown className="arrow" />}
        </li>

        {openCategory && (
          <ul className="submenu">
            <li><Link to="/admin/createcategory">Create Category</Link></li>
            <li><Link to="/admin/categoryList">Category List</Link></li>
            <li><Link to="/admin/editCategory">Edit Category</Link></li>
          </ul>
        )}

        
        <li><FaUsers /> <span>Users</span></li>


        <li className="dropdown" onClick={() => setOpenOrder(!openOrder)}>
          <FaShoppingCart /> 
          <span>Orders</span>
          {openOrder ? <FaChevronUp className="arrow" /> : <FaChevronDown className="arrow" />}
        </li>

        {openOrder && (
          <ul className="submenu">
           
            <li><Link to="/admin/orderList">Order List</Link></li>
          </ul>
        )}
      
      </ul>

      <div className="logout">
        <FaSignOutAlt /> Logout
      </div>
    </div>
  );
}

export default Sidebar;
