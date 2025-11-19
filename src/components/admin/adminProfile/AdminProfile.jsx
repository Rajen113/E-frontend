import React, { useContext, useState, useEffect } from 'react';
import { authAPI } from '../../../api/instances';
import { AdminContext } from '../../../context/AdminContext';
import "./AdminProfile.css";

export default function AdminProfile() {
  const { admin, setAdmin } = useContext(AdminContext);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    Mobile_Number: "",
    Goverment_ID: "",
    GST_Number: "",
    
  });


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    authAPI
      .get(`/api/admin_profile?token=${token}`)
      .then((res) => {
        const data = res.data; 

     
        setAdmin(data);

        setFormData({
          name: data.name || "",
          Email: data.Email || "",
           Mobile_Number: data. Mobile_Number || "",
          Goverment_ID: data.Goverment_ID|| "",
          GST_Number: data.GST_Number || "",
         
        });
      })
      .catch((err) => console.log("Profile fetch error:", err))
      .finally(() => setLoading(false));
  }, [setAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Updated profile:", formData);

    setEditMode(false);
  };

  if (loading) return <h2>Loading profile...</h2>;

  return (
    <div className="profile-wrapper">
      <div className="profile-right">
        <div className="profile-form">
          <h2>👤 {formData.name} Profile</h2>

          <form onSubmit={handleSave}>
            <div className="profile-fields">
              <div className="fields">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  readOnly={!editMode}
                />

                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  readOnly={!editMode}
                />

                <input
                  type="text"
                  name=" Mobile_Number"
                  value={formData. Mobile_Number}
                  onChange={handleChange}
                  readOnly={!editMode}
                />

                <input
                  type="text"
                  name="Goverment_ID"
                  value={formData.Goverment_ID}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>

              <div className="fields">
                <input
                  type="text"
                  name="GST_Number"
                  value={formData.GST_Number}
                  onChange={handleChange}
                  readOnly={!editMode}
                />

                {/* <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  readOnly={!editMode}
                ></textarea> */}
              </div>
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
