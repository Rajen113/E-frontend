import React, { useState } from "react";
import "./CreateProduct.css";
import axiosInstance from "../../../../api/axiosConfig";

function CreateProduct() {
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category_id: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();

    productData.append("name", formData.name);
    productData.append("price", Number(formData.price));
    productData.append("quantity", Number(formData.quantity));
    productData.append("description", formData.description);
    productData.append("category_id", Number(formData.category_id));

    images.forEach((img) => productData.append("image_path", img));

    try {
      const response = await axiosInstance.post("/product", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product created successfully!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        quantity: "",
        description: "",
        category_id: "",
      });
      setImages([]);
      setImagePreview([]);

    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category ID</label>
          <input
            type="number"
            name="category_id"
            placeholder="Enter Category ID"
            value={formData.category_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter Quantity"
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
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group description-box">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter Product Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Upload Product Images</label>

          <div className="upload-box">
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            <p>Click to upload product images</p>
          </div>

          {/* Preview Section */}
          {imagePreview.length > 0 && (
            <div className="preview-container">
              {imagePreview.map((img, idx) => (
                <img key={idx} src={img} alt="Preview" className="product-preview" />
              ))}
            </div>
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
