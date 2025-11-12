import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left section */}
        <div className="footer-section">
          <h2 className="footer-logo">E<span>Shop</span></h2>
          <p>Your one-stop destination for all your shopping needs.</p>
        </div>

        {/* Middle section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐 Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦 Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">📸 Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EShop. All rights reserved.</p>
      </div>
    </footer>
  )
}
