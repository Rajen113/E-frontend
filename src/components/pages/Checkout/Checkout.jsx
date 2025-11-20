import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { placeOrderAPI } from "../../../services/orderService";
import "./Checkout.css";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.Mobile_Number || "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
    if (cart.length === 0) navigate("/cart");
  }, [isLoggedIn, cart, navigate]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = async () => {
    if (!formData.name || !formData.mobile || !formData.address || !formData.city || !formData.pincode) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await placeOrderAPI({
        cart_items: cart.map(item => ({ product_id: item.id, quantity: item.qty })),
        shipping_address: {
          recipient_name: formData.name,
          street: formData.address,
          city: formData.city,
          postal_code: formData.pincode,
          country: "India",
        }
      });
      clearCart();
      navigate("/order-success", { state: { orderId: result.data?.id, total } });
    } catch {
      alert("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="minimal-checkout">
      
      <div className="checkout-card">
        
        {/* TOP BAR */}
        <div className="top-bar">
          <div className="logo">Shopix</div>
          <div className="total-badge">₹{total}</div>
        </div>

        {/* CONTENT SECTION */}
        <div className="card-content">
          
          {/* SHIPPING INFO */}
          <div className="section">
            <div className="section-title">
              <span className="number">1</span>
              <h3>Shipping Information</h3>
            </div>
            
            <div className="inputs">
              <div className="row-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  maxLength="10"
                />
              </div>
              
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              
              <div className="row-2">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  maxLength="6"
                />
              </div>
            </div>
          </div>

          {/* ORDER DETAILS */}
          <div className="section">
            <div className="section-title">
              <span className="number">2</span>
              <h3>Order Details</h3>
            </div>
            
            <div className="order-list">
              {cart.map(item => (
                <div className="order-row" key={item.id}>
                  <div className="item-left">
                    <div className="qty-badge">{item.qty}x</div>
                    <span>{item.name}</span>
                  </div>
                  <span className="price">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="price-summary">
              <div className="price-line">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="price-line">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
            </div>
          </div>

          {/* PAYMENT BUTTON */}
          <button className="complete-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              "Processing..."
            ) : (
              <>
                <span>Complete Order</span>
                <span className="btn-amount">₹{total}</span>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
