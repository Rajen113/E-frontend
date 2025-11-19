import React, { useContext, useState, useEffect } from 'react';
import { authAPI } from '../../../api/instances';
import { AuthContext } from '../../../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    authAPI
      .get(`/api/user_profile?token=${token}`)
      .then((res) => {
        const d = res.data;
        console.log("Profile:", d);

        setUser(d);

        setFormData({
          name: d?.name || "",
          email: d?.email || d?.Email || "",
          mobile: d?.Mobile_Number || d?.Moblile_Number || "",
        });
      })
      .catch((err) => {
        console.log("Profile fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    authAPI
      .put(`/api/update_profile?token=${token}`, {
        name: formData.name,
        Mobile_Number: formData.mobile,
      })
      .then((res) => {
        alert("Profile updated successfully!");
        setUser(res.data);
        setEditMode(false);
      })
      .catch((err) => {
        console.log("Update error:", err);
      });
  };

  if (loading) return <h2 className="loading">Loading profile...</h2>;

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
                  <button className="btn-save">Save</button>
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
  );
}
