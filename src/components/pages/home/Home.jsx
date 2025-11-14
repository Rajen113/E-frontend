import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import ImageSlider from './ImageSlider'

function Home() {
  return (
    <div className="home-container">

      {/* 🌟 Hero Section */}
      <section className="hero-section">
        <ImageSlider />   {/* 🖼️ Auto-swiping banner */}
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Discover the Latest Trends</h1>
            <p>Shop from a wide range of fashion, electronics, and more — all in one place.</p>
            <Link to="/shop" className="hero-btn">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* 🛍️ Categories */}
      <section className="category-section">
        <h2>Shop by Category</h2>
        <div className="categories">
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=60" alt="Fashion" />
            <h3>Fashion</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1587202372775-98973a8f1d6b?auto=format&fit=crop&w=400&q=60" alt="Electronics" />
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=60" alt="Home Decor" />
            <h3>Home Decor</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1616628188465-0a3b743aa397?auto=format&fit=crop&w=400&q=60" alt="Beauty" />
            <h3>Beauty</h3>
          </div>
        </div>
      </section>

      {/* 🏷️ Featured Products */}
      <section className="products-section">
        <h2>Popular Products</h2>
        <div className="products">
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1593032465171-8a3490cda8c9?auto=format&fit=crop&w=400&q=60" alt="Product" />
            <h4>Wireless Headphones</h4>
            <p>₹1,499</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1606813902914-09e7b5e8e8e0?auto=format&fit=crop&w=400&q=60" alt="Product" />
            <h4>Smart Watch</h4>
            <p>₹2,299</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=60" alt="Product" />
            <h4>Casual Sneakers</h4>
            <p>₹1,999</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="https://images.unsplash.com/photo-1606813903034-f03e8a32e5f8?auto=format&fit=crop&w=400&q=60" alt="Product" />
            <h4>Bluetooth Speaker</h4>
            <p>₹1,299</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* 💬 CTA Section */}
      <section className="cta-section">
        <h2>Join Our Shopping Community</h2>
        <p>Get exclusive deals, early access to sales, and more.</p>
        <Link to="/register" className="cta-btn">Create an Account</Link>
      </section>

    </div>
  )
}

export default Home
