import React, { useContext, useState, useEffect } from 'react';
import { authAPI } from '../../../api/instances';
import { AuthContext } from '../../../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  // 🔥 Fetch user profile from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    authAPI
      .get(`/api/user_profile?token=${token}`)
      .then((res) => {
        const data = res.data;

        // Save in AuthContext
        setUser(data);

        // Load data into form
        setFormData({
          name: data.name,
          email: data.Email,            // backend uses "Email"
          mobile: data.Moblile_Number   // backend uses "Moblile_Number"
        });
      })
      .catch((err) => console.log("Profile fetch error:", err))
      .finally(() => setLoading(false));
  }, [setUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    setEditMode(false);

    console.log("Updated profile:", formData);

    // TODO: Add update API here
  };

  if (loading) return <h2>Loading profile...</h2>;

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
                  <button type="button" className="btn-cancel" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" className="btn-edit" onClick={() => setEditMode(true)}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
