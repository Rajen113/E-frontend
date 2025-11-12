import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../api/axiosConfig'
import './Register.css'

function AdminRegister() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    goverment_id: '',
    id_proof_path: '',
    gst_number: '',
    password: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!")
      return
    }
    if (!/^\d{10}$/.test(formData.mobile_number)) {
      setError('Enter a valid 10-digit mobile number.')
      return
    }

    const adminData = {
      name: formData.name,
      email: formData.email,
      mobile_number: Number(formData.mobile_number),
      goverment_id: Number(formData.goverment_id),
      id_proof_path: formData.id_proof_path,
      gst_number: Number(formData.gst_number),
      password: formData.password,
    }

    try {
      setLoading(true)
      const res = await axiosInstance.post('/admin/register', adminData)
      alert(res.data.message || 'Admin registration successful!')
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-right">
        <h2>Admin Registration</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-text">{error}</p>}

          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="mobile_number" placeholder="Mobile Number" value={formData.mobile_number} onChange={handleChange} required />
          <input type="number" name="goverment_id" placeholder="Government ID" value={formData.goverment_id} onChange={handleChange} required />
          <input type="text" name="id_proof_path" placeholder="ID Proof Path" value={formData.id_proof_path} onChange={handleChange} required />
          <input type="number" name="gst_number" placeholder="GST Number" value={formData.gst_number} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister
