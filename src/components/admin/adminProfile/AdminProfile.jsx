import React, { useState } from "react";
import "./AdminProfile.css";

function AdminProfile() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "admin@example.com",
    mobile_number: "9876543210",
    goverment_id: "123456789",
    id_proof_path: "uploads/id-proof.png",
    gst_number: "22AAAAA0000A1Z5",
    address: "Street 45, Mumbai, India",
    profile_image: "/profile.png",
  });

  const [imagePreview, setImagePreview] = useState(formData.profile_image);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="profile-wrapper">

      <div className="profile-right">
        <div className="profile-form">
          <h2>Admin Profile</h2>

          <form onSubmit={handleSubmit}>
            <div className="profile-photo">

              <img src={imagePreview} alt="Profile" className="profile-img" />

              <label className="upload-label">
                Upload Photo
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>

            </div>

            <div className="profile-fields">

              <div className="fields">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} placeholder="Mobile Number" required />
                <input type="text" name="goverment_id" value={formData.goverment_id} onChange={handleChange} placeholder="Government ID" required />
              </div>

              <div className="fields">
                <input type="text" name="id_proof_path" value={formData.id_proof_path} onChange={handleChange} placeholder="ID Proof Path" />
                <input type="text" name="gst_number" value={formData.gst_number} onChange={handleChange} placeholder="GST Number" />
                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Address"></textarea>
              </div>

            </div>

            <button type="submit" className="profile-btn">
              Save Changes
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}

export default AdminProfile;
