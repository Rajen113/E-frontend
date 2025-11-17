import React, { useState } from "react";
import "./EditProduct.css"; // Reuse same CSS

function EditProduct() {
  const [imagePreview, setImagePreview] = useState("/defaultProduct.png"); // existing image

  // Pre-filled product data
  const [formData, setFormData] = useState({
    productId: "PRO001",
    productName: "Premium Dog Food",
    category: "Dried Food",
    quantity: 50,
    price: 299,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", formData);
  };

  return (
    <div className="add-product-container">
      <h2>Edit Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Product ID</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Dried Food">Dried Food</option>
            <option value="Wet Food">Wet Food</option>
            <option value="Supplemental Food">Supplemental Food</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>

          <div className="upload-box">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <p>Click to upload new image</p>
          </div>

          {imagePreview && (
            <img src={imagePreview} alt="preview" className="product-preview" />
          )}
        </div>

        <button type="submit" className="btn-submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProduct;
