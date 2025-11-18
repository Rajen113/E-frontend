import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { loginService } from "../../../services/auth.service";
import "./Login.css";
import { FaUser } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await loginService(formData);
    console.log(response)

    setLoading(false);

    if (!response.success) {
      setError(response.message);
      return;
    }

    login(response.token);

    setSuccess("Login successful! Redirecting...");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="login-page">
      <div className="img-login">
        <img src="/register.png" alt="login Illustration" />
      </div>

      <div className="login-container">
        <div className="login-box">
          <h2><FaUser /> Login Account</h2>

          <form onSubmit={handleSubmit}>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <input
              type="email"
              name="username"
              placeholder="Email"
              value={formData.username}
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

            <button type="submit" className="create-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider">or</div>

            <p className="login-link">
              Don’t have an account?{" "}
              <Link to="/register"><FaUser /> Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
