import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0)
    return <h2 className="empty">Your cart is empty 🛒</h2>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-card" key={item.id}>
            
            {/* IMAGE FIXED */}
            <img 
              src={item.img} 
              alt={item.name} 
            />

            <div className="cart-info">

              {/* NAME FIXED */}
              <h3>{item.name}</h3>

              {/* PRICE */}
              <p>₹{item.price}</p>

              {/* QUANTITY */}
              <div className="cart-qty">
                <button
                  onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button onClick={() => updateQty(item.id, item.qty + 1)}>
                  +
                </button>
              </div>

              {/* REMOVE */}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>

            <div className="cart-total">
              <p>₹{item.price * item.qty}</p>
            </div>

          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total Amount: ₹{total}</h3>

        {/* CHECKOUT BUTTON FIXED */}
        <button 
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
