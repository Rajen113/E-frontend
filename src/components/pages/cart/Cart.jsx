import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.05; // 5% tax
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Please login to proceed to checkout");
      return navigate("/login");
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet</p>
        <button className="shop-now-btn" onClick={() => navigate("/shop")}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        
        {/* LEFT - CART ITEMS */}
        <div className="cart-items-section">
          <div className="cart-header">
            <h2>Shopping Cart ({cart.length} items)</h2>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear All
            </button>
          </div>

          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                
                <div className="cart-item-image">
                  <img src={item.img} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">₹{item.price} each</p>

                  <div className="cart-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                        disabled={item.qty <= 1}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <p className="total-price">₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>

          {subtotal < 500 && (
            <div className="free-shipping-notice">
              Add ₹{(500 - subtotal).toFixed(2)} more for FREE shipping!
            </div>
          )}

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          <button className="continue-shopping-btn" onClick={() => navigate("/shop")}>
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}
