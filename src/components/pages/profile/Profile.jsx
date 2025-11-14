import React, { useContext, useState, useEffect } from 'react'
import axiosInstance from '../../../api/axiosConfig'
import { AuthContext } from '../../../context/AuthContext'
import './Profile.css'

export default function Profile() {
  const { user, setUser } = useContext(AuthContext)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  })

  // 🔥 Fetch user profile from backend
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) return

    axiosInstance
      axiosInstance.get(`/api/user_profile?token=${token}`)
      .then((res) => {
        const data = res.data

        // Save in AuthContext
        setUser(data)

        // Set form values
        setFormData({
          name: data.name,
          email: data.Email,                   // backend uses "Email"
          mobile: data.Moblile_Number          // backend uses "Moblile_Number"
        })
      })
      .finally(() => setLoading(false))
  }, [setUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = (e) => {
    e.preventDefault()
    setEditMode(false)

    console.log("Updated profile:", formData)
    // You can send update API later
  }

  if (loading) return <h2>Loading profile...</h2>

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>👤 My Profile</h2>

        <div className="profile-card">

          <div className="profile-avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User Avatar"
            />
          </div>

          <form onSubmit={handleSave} className="profile-form">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                readOnly={!editMode}
                onChange={handleChange}
              />
            </div>

            <div className="form-buttons">
              {editMode ? (
                <>
                  <button type="submit" className="btn-save">Save</button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => setEditMode(true)}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
