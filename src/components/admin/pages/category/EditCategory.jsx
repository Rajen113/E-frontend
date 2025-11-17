import React, { useState, useEffect } from "react";
import "./EditCategory.css"; // Reuse same CSS

function EditCategory() {

  // Pre-filled values (fetch from API later)
  const [formData, setFormData] = useState({
    categoryId: "CAT001",
    categoryName: "Electronics",
    description: "All electronic products"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Category:", formData);
  };

  return (
    <div className="add-category-container">
      <h2>Edit Category</h2>

      <form className="category-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Category ID</label>
          <input
            type="text"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditCategory;
