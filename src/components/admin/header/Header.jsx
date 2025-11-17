import React from "react";
import { FaSearch, FaBell,FaUser} from "react-icons/fa";
import { MdEmail } from "react-icons/md"; // from Material Design
import "./Header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
            <div className="navbar-logo"> 
                <div className="logo-text">
                <span className="brand-main">Shop</span>
                <span className="brand-sub">ix</span></div>
            </div>

      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search anything..." />
      </div>

      <div className="header-right">
        <FaBell className="icon" />
        <MdEmail className="icon" />
       <Link to="/admin/profile"> <FaUser className="icon" /></Link>
      </div>
    </div>
  );
}

export default Header;
