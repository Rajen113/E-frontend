import React, { useContext } from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';

function Header() {
 const { isLoggedIn, logout } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate("/admin/login");
  };

  return (
    <div className="header">
      {/* Logo Section */}
      <div className="navbar-logo">
        <div className="logo-text">
          <span className="brand-main">Shop</span>
          <span className="brand-sub">ix</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search anything..." />
      </div>

      {/* RIGHT SIDE SECTION */}
      <div className="header-right">

        {isLoggedIn ? (
          <>
            {/* Show when ADMIN is logged in */}
            <FaBell className="icon" />
            <MdEmail className="icon" />

            <Link to="/admin/profile">
              <FaUser className="icon" />
            </Link>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Show when NOT logged in */}
            <Link to="/admin/login" className="icon-link">
              <FaUser className="icon" /> Login
            </Link>

            <Link to="/admin/register" className="icon-link">
              <FaUser className="icon" /> Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
