import React, { useState, useEffect } from "react";
import "./CreateProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category_id: "",
  });

  // Load categories (API Call)
  useEffect(() => {
    axios
      .get("http://192.168.29.249:8001/categories/api/get_categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log("Category load error:", err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });


    images.forEach((img) => {
      form.append("images", img);
    });

    try {
      const response = await axios.post(
        "http://192.168.29.249:8001/api/create_product/",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      navigate("/admin/productList");
    } catch (error) {
      console.log("Upload error:", error);
      alert("Failed to create product!");
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <div className="page-header">
          <h2>
            Add New Product
          </h2>
        </div>
        <form className="product-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter Product Name"
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label>Select Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.category}
                </option>
              ))}
            </select>
          </div>


          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              placeholder="Enter Quantity"
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
              placeholder="Enter Price"
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              required
            ></textarea>
          </div>


          <div className="form-group">
            <label>Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>

          {/* Preview */}
          {imagePreview.length > 0 && (
            <div className="preview-container">
              {imagePreview.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="product-preview"
                  alt="Preview"
                />
              ))}
            </div>
          )}

          <button type="submit" className="btn-submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
