import React, { useState } from "react";
import "./CreateProduct.css";

function CreateProduct() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>

      <form className="product-form">
    
        <div className="form-group">
          <label>Product ID</label>
          <input type="text" placeholder="Enter Product ID" required />
        </div>

     
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" placeholder="Enter Product Name" required />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select required>
            <option value="">Select Category</option>
            <option value="Dried Food">Dried Food</option>
            <option value="Wet Food">Wet Food</option>
            <option value="Supplemental Food">Supplemental Food</option>
          </select>
        </div>

   
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" placeholder="Enter Quantity" required />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" placeholder="Enter Price" required />
        </div>

     
        <div className="form-group">
          <label>Upload Product Image</label>

          <div className="upload-box">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <p>Click to upload image</p>
          </div>

          {imagePreview && (
            <img src={imagePreview} alt="preview" className="product-preview" />
          )}
        </div>

        <button type="submit" className="btn-submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
