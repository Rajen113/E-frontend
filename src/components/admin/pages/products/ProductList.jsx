import React from "react";
import "./ProductList.css";
import { Link } from "react-router-dom";

function ProductList() {
  const products = [
    {
      id: 1,
      name: "Dry Cat Food",
      category: "Dried Food",
      quantity: 20,
      price: 499,
      image: "/cat-food.png",
    },
    {
      id: 2,
      name: "Wet Dog Food",
      category: "Wet Food",
      quantity: 10,
      price: 899,
      image: "/dog-food.png",
    },
  ];

  return (
    <div className="product-list-container">
      <div className="header">
        <h2>All Products</h2>
         {/* <h1 className="add-btn"><Link to="/admin/addProduct">Create Product</Link></h1> */}
        <button className="add-btn"><Link to="/admin/addProduct">Add New</Link></button>
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
                <img src={p.image} alt="" className="product-img" />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.quantity}</td>
              <td>₹{p.price}</td>
              <td>
                <button className="edit-btn"><Link to="/admin/editProduct">Edit</Link></button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
