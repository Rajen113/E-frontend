import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import './Profile.css'

export default function Profile() {
  const { user } = useContext(AuthContext)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = (e) => {
    e.preventDefault()
    setEditMode(false)
    // 🔒 You can call backend API to update user details here
    console.log('Profile updated:', formData)
  }

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
                onChange={handleChange}
                readOnly={!editMode}
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
                onChange={handleChange}
                readOnly={!editMode}
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
