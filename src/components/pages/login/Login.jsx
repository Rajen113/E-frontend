import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { loginService } from "../../../services/auth.service";
import "./Login.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await loginService(formData);
    setLoading(false);

    if (!response?.success) {
      setError(response?.message || "Login failed. Try again.");
      return;
    }

    login(response.token);
    setSuccess("Login successful! Redirecting...");
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <div className="login-page">

      {/* LEFT IMAGE */}
      <div className="login-left">
        <img
          src="/login-illustration.webp"
          alt="Login Illustration"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="login-right">
        <div className="login-box">
          <h2><FaUser /> Login Account</h2>
          <p className="subtitle">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit}>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <div className="field">
              <input
                type="email"
                name="username"
                placeholder="Email"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider">or</div>

            <p className="register-text">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;
