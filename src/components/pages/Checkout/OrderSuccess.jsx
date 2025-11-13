import React from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

export default function OrderSuccess() {
  return (
    <div className="success-container">
      <div className="success-card">

        <div className="success-icon">✔</div>

        <h1>Order Placed Successfully!</h1>
        <p>
          Thank you for your purchase. Your order is being processed.<br />
          You will receive a confirmation shortly.
        </p>

        <Link to="/shop" className="success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
