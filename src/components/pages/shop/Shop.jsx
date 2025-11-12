import React, { useState, useContext } from 'react'
import './Shop.css'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Shop() {
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState(3000)

  const products = [
    { id: 1, name: 'Casual Sneakers', price: 1999, category: 'Fashion', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=60' },
    { id: 2, name: 'Smart Watch', price: 2299, category: 'Electronics', img: 'https://images.unsplash.com/photo-1606813902914-09e7b5e8e8e0?auto=format&fit=crop&w=400&q=60' },
    { id: 3, name: 'Bluetooth Speaker', price: 1499, category: 'Electronics', img: 'https://images.unsplash.com/photo-1606813903034-f03e8a32e5f8?auto=format&fit=crop&w=400&q=60' },
    { id: 4, name: 'Wooden Lamp', price: 999, category: 'Home Decor', img: 'https://images.unsplash.com/photo-1616628188465-0a3b743aa397?auto=format&fit=crop&w=400&q=60' },
    { id: 5, name: 'Men’s Jacket', price: 1899, category: 'Fashion', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=60' },
    { id: 6, name: 'Lipstick Set', price: 899, category: 'Beauty', img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa8?auto=format&fit=crop&w=400&q=60' },
    { id: 7, name: 'Table Vase', price: 499, category: 'Home Decor', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=60' },
    { id: 8, name: 'Wireless Earbuds', price: 2499, category: 'Electronics', img: 'https://images.unsplash.com/photo-1593032465171-8a3490cda8c9?auto=format&fit=crop&w=400&q=60' },
  ]

  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory
    const priceMatch = p.price <= priceRange
    return categoryMatch && priceMatch
  })

  const handleAddToCart = () => {
    if (!isLoggedIn) navigate('/login')
    else navigate('/cart')
  }

  return (
    <div className="shop-container">
      {/* 🧭 Top Filter Section */}
      <div className="shop-filters">
        <div className="filter-scroll">
          {['All', 'Fashion', 'Electronics', 'Home Decor', 'Beauty'].map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="price-filter">
          <label>Up to ₹{priceRange}</label>
          <input
            type="range"
            min="500"
            max="3000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
        </div>
      </div>

      {/* 🛍️ Product Grid */}
      <div className="shop-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="shop-card" key={product.id}>
              <img src={product.img} alt={product.name} />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
  )
}

export default Shop
