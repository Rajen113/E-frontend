import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosConfig";
import "./Register.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // ⭐ VALIDATION FUNCTION
  const validateFields = () => {
    if (!/^[A-Za-z ]{3,}$/.test(formData.name))
      return "Full Name must be at least 3 characters and contain only letters.";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return "Invalid email format.";

    if (!/^\d{10}$/.test(formData.mobile_number))
      return "Enter a valid 10-digit mobile number.";

    if (formData.password.length < 6)
      return "Password must be at least 6 characters.";

    // if (!/[A-Z]/.test(formData.password))
    //   return "Password must contain at least 1 uppercase letter.";

    // if (!/[0-9]/.test(formData.password))
    //   return "Password must contain at least 1 number.";

    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      mobile_number: Number(formData.mobile_number),
      password: formData.password,
    };

    try {
      setLoading(true);
      const res = await axiosInstance.post("/user/register", userData);

      setSuccess(res.data.message || "Registration successful!");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed!");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="img-signup">
        <img src="SideImage.png" alt="Register Illustration" />
      </div>

      <div className="signup-container">
        <div className="signup-box">
          <h2><FaUser /> User Registration</h2>

          <form onSubmit={handleSubmit}>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="create-btn" disabled={loading}>
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <div className="divider">or</div>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
