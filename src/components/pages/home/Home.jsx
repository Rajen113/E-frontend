import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import ImageSlider from './ImageSlider'

function Home() {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section">
        <ImageSlider />   {/*  Auto-swiping banner */}
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Discover the Latest Trends</h1>
            <p>Shop from a wide range of fashion, electronics, and more — all in one place.</p>
            <Link to="/shop" className="hero-btn">Shop Now</Link>
          </div>
        </div>
      </section>

      <hr />

      {/* category section */}
      <div className="category-section">
        <h2 className="side-title">Categories</h2>

        <div className="category-header">
          <h1>Browse By Category</h1>

          <div className="arrows">
            <img src="/Left-Arrow.png" className="arrow" alt="left" />
            <img src="/Right-Arrow.png" className="arrow" alt="right" />
          </div>
        </div>

        <div className="categories">

          <div className="cat-box">
            <img src="/Category-CellPhone.png" alt="Phones" />
            <p>Phones</p>
          </div>

          <div className="cat-box">
            <img src="/Category-Computer.png" alt="Computers" />
            <p>Computers</p>
          </div>

          <div className="cat-box">
            <img src="/Category-SmartWatch.png" alt="Smartwatch" />
            <p>Smartwatch</p>
          </div>

          <div className="cat-box">
            <img src="/Category-Camera.png" alt="Camera" />
            <p>Camera</p>
          </div>

          <div className="cat-box">
            <img src="/Category-Headphone.png" alt="Headphone" />
            <p>Headphones</p>
          </div>

          <div className="cat-box">
            <img src="/Category-Gamepad.png" alt="Game" />
            <p>Games</p>
          </div>

        </div>
      </div>

      <hr />

      {/* Best Selling */}
      <section className="category-section">

        <div className="category-header">
          <h1>Best Selling Products</h1>

          <div className="All-view">
            <p>View All</p>
          </div>
        </div>

        <div className="categories">

          <div className="product-card">
            <img src="/jacket.png" alt="jacket" />
            <h3>The north coat</h3>
            <p>$230</p>
            <button>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="/purse.png" alt="purse" />
            <h3>Gucci duffle bag</h3>
            <p>$230</p>
            <button>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="/gammaxx.png" alt="gammaxx" />
            <h3>RGB liquid CPU</h3>
            <p>$230</p>
            <button>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="/table.png" alt="table" />
            <h3>Small BookSelf</h3>
            <p>$230</p>
            <button>Add to Cart</button>
          </div>

          <div className="product-card">
            <img src="/computer.png" alt="computer" />
            <h3>Computers</h3>
            <p>$230</p>
            <button>Add to Cart</button>
          </div>

        </div>
      </section>

  
      <div className="radio-wrapper">
        <img src="/radio.png" className="radio-full-img" alt="radio" />
        <button className="buy-btn">Buy Now!</button>
      </div>

      <hr />

     
      <div className="features">
        <h2>Featured</h2>

        <div className="feature-items">
          <div className="feature-left">
            <img src="/playStation .png" alt="playStation" />
            <button className="buy-btn1">Buy Now!</button>
          </div>

          <div className="feature-right">

            <div className="feature-above">
              <img src="/women-Coll.png" alt="women-collection" />
              <button className="buy-btn1">Buy Now!</button>
            </div>

            <div className="feature-below">
              <div className="speaker">
                <img src="/Speakers.png" alt="speakers" />
                <button className="buy-btn1">Buy Now!</button>
              </div>

              <div className="perfume">
                <img src="/perfume.png" alt="perfume" />
                <button className="buy-btn1">Buy Now!</button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
