import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Navbar.css'
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleDropdownToggle = () => {
    setShowRegisterDropdown(!showRegisterDropdown)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRegisterDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="navbar">

      {/* Left: Logo */}
      <div className="navbar-logo">
        <Link to="/" className="logo-text">
          <span className="brand-main">Shop</span>
          <span className="brand-sub">ix</span>
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for products, brands, and more..."
          className="search-input"
        />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="navbar-actions">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="nav-btn">
              <FaUser /> Profile
            </Link>

            <button onClick={handleLogout} className="nav-btn logout">
              <FiLogOut /> Logout
            </button>

            <Link to="/cart" className="nav-btn cart">
              <FaShoppingCart /> Cart
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>

            <div className="dropdown" ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className={`nav-btn register ${showRegisterDropdown ? 'active' : ''}`}
              >
                Register
              </button>

              {showRegisterDropdown && (
                <div className="dropdown-menu">
                  <Link
                    to="/register"
                    className="dropdown-item"
                    onClick={() => setShowRegisterDropdown(false)}
                  >
                    👤 User Register
                  </Link>

                  <Link
                    to="/admin/register"
                    className="dropdown-item"
                    onClick={() => setShowRegisterDropdown(false)}
                  >
                    🧑‍💼 Admin Register
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
