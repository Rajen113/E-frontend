import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.29.249:8004/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setOrder(response.data);
    } catch (err) {
      console.error("Failed to fetch order:", err);
      alert("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-page">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="error-page">
        <h2>Order not found</h2>
        <Link to="/orders" className="back-link">← Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="details-container">
        
        {/* Header */}
        <div className="details-header">
          <button onClick={() => navigate("/orders")} className="back-btn">
            ← Back
          </button>
          <div className="header-content">
            <h1>Order #{order.id}</h1>
            <span className={`status-pill ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="details-grid">
          
          {/* Left Column */}
          <div className="left-column">
            
            {/* Order Info */}
            <div className="info-card">
              <h2>Order Information</h2>
              <div className="info-rows">
                <div className="info-row">
                  <span className="info-label">Order ID</span>
                  <span className="info-value">#{order.id}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Order Date</span>
                  <span className="info-value">
                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">
                    {new Date(order.updated_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                {order.tracking_number && (
                  <div className="info-row">
                    <span className="info-label">Tracking Number</span>
                    <span className="info-value highlight">{order.tracking_number}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="info-card">
              <h2>Shipping Address</h2>
              <div className="address-box">
                <p className="address-name">{order.shipping_address.recipient_name}</p>
                <p className="address-line">{order.shipping_address.street}</p>
                <p className="address-line">
                  {order.shipping_address.city}, {order.shipping_address.postal_code}
                </p>
                <p className="address-line">{order.shipping_address.country}</p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="info-card">
              <h2>Billing Address</h2>
              <div className="address-box">
                <p className="address-name">{order.billing_address.recipient_name}</p>
                <p className="address-line">{order.billing_address.street}</p>
                <p className="address-line">
                  {order.billing_address.city}, {order.billing_address.postal_code}
                </p>
                <p className="address-line">{order.billing_address.country}</p>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="right-column">
            
            {/* Payment Summary */}
            <div className="summary-card">
              <h2>Payment Summary</h2>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{order.total_amount}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{order.total_amount}</span>
                </div>
              </div>
              
              {order.payment_details ? (
                <div className="payment-info">
                  <p className="payment-method">
                    <strong>Payment Method:</strong> {order.payment_details.method}
                  </p>
                  <p className="payment-status">
                    <strong>Payment Status:</strong> {order.payment_details.status}
                  </p>
                </div>
              ) : (
                <div className="payment-pending">
                  <p>Payment details not available</p>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="user-card">
              <h3>Customer</h3>
              <p className="user-email">{order.user_id}</p>
            </div>

            {order.shipping_method && (
              <div className="shipping-card">
                <h3>Shipping Method</h3>
                <p className="shipping-method">{order.shipping_method}</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
