import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../api/axiosConfig'
import { AuthContext } from '../../../context/AuthContext'
import './Login.css'
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Login() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  // prepare form data for FastAPI Form(...)
  const data = new FormData();
  data.append("username", formData.username);
  data.append("password", formData.password);

  try {
    setLoading(true);

    const res = await axiosInstance.post('/user/login', data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    const token = res.data.access_token;

   
    localStorage.setItem("authToken", token);

  
    login(token);

    setSuccess("Login successful! Redirecting...");

    setTimeout(() => navigate("/"), 1500);

  } catch (err) {
    setError(err.response?.data?.message || "Invalid credentials!");
  } finally {
    setLoading(false);
  }
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
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="divider">or</div>

            <p className="login-link">
              Don’t have an account? <Link to="/register"><FaUser /> Register</Link>
            </p>
          </form>

        </div>
      </div>

    </div>
  )
}

export default Login
