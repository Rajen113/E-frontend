import React, { useState } from 'react'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  const navigate = useNavigate()

  // Example cart data (you can later replace with real backend or context data)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Smart Watch',
      price: 2299,
      qty: 1,
      img: 'https://images.unsplash.com/photo-1606813902914-09e7b5e8e8e0?auto=format&fit=crop&w=400&q=60',
    },
    {
      id: 2,
      name: 'Casual Sneakers',
      price: 1999,
      qty: 2,
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=60',
    },
  ])

  const handleQtyChange = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: type === 'inc' ? item.qty + 1 : Math.max(1, item.qty - 1) }
          : item
      )
    )
  }

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleCheckout = () => {
    alert('✅ Order placed successfully!')
    navigate('/')
  }

  return (
    <div className="cart-container">
      <h2>🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty 😢</p>
          <Link to="/shop" className="go-shop-btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="cart-actions">
                    <button onClick={() => handleQtyChange(item.id, 'dec')}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleQtyChange(item.id, 'inc')}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-detail">
              <p>Total Items:</p>
              <span>{cartItems.length}</span>
            </div>
            <div className="summary-detail">
              <p>Total Price:</p>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
