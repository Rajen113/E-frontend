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
          </ul>
        )}

        
        <li><FaUsers /> <span>Users</span></li>
        <li><FaShoppingCart /> <span>Orders</span></li>
      </ul>

      <div className="logout">
        <FaSignOutAlt /> Logout
      </div>
    </div>
  );
}

export default Sidebar;
