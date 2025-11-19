import React, { useEffect, useState } from "react";
import "./ProductList.css";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await axios.get("http://192.168.29.249:8001/api/get_products");
    console.log(res.data)
    setProducts(res.data);

  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`http://192.168.29.249:8001/api/delete_product/${id}`);
    loadProducts();
  };

  const API_BASE_URL = "http://192.168.29.249:8001"; // Your FastAPI server address

  return (
    <div className="product-list-container">
      <div className="header">
        <h2>All Products</h2>
        <button className="add-btn">
          <Link to="/admin/addProduct">Add New</Link>
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>
                {/* {console.log(p.image_path)} */}
                <img
                  src={`http://192.168.29.249:8001/${p.image_path[0]}`}
                  className="product-img"
                  alt="product"
                />


              </td>
             


              <td>{p.name}</td>
              <td>{p.category.category}</td>
              <td>{p.quantity}</td>
              <td>₹{p.price}</td>

              <td>
                <Link to={`/admin/editProduct/${p.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
