import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    addressLine: "",
    city: "",
    state: "",
  });

  // 🟢 Auto-fill from logged-in user
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        name: user.name || "",
        mobile: user.Mobile_Number || user.mobile || "",
      }));
    }
  }, [user]);

  // Protect checkout if user not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn]);

  // Redirect if cart empty
  useEffect(() => {
    if (cart.length === 0) navigate("/cart");
  }, [cart]);

  // PRICE CALCULATION
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  // SUBMIT ORDER
  const handlePlaceOrder = () => {
    const { name, mobile, pincode, addressLine, city, state } = address;

    if (!name || !mobile || !pincode || !addressLine || !city || !state) {
      setMessage("⚠️ Please fill all address fields!");
      return;
    }

    setMessage("🎉 Order placed successfully!");

    setTimeout(() => navigate("/order-success"), 1000);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* MESSAGE BOX */}
      {message && <p className="checkout-msg">{message}</p>}

      <div className="checkout-grid">

        {/* LEFT: ADDRESS */}
        <div className="checkout-section">
          <h3>Shipping Address</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={address.mobile}
            onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
          />

          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
          />

          <textarea
            placeholder="Full Address"
            value={address.addressLine}
            onChange={(e) =>
              setAddress({ ...address, addressLine: e.target.value })
            }
          ></textarea>

          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />

          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="checkout-section">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div className="summary-item" key={item.id}>
              <span>{item.name} (x{item.qty})</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Shipping: ₹{shipping}</p>
            <h3>Total: ₹{total}</h3>
          </div>

          <button className="place-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
