import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryList.css";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    const res = await axios.get("http://192.168.29.249:8001/categories/api/get_categories");
    setCategories(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;
    await axios.delete(`http://192.168.29.249:8001/categories/api/delete_category/${id}`);
    loadData();   // reload categories
  };

  return (
    <div className="category-list-container">
      <div className="header">
        <h2>All Category</h2>
        <button className="add-btn">
          <Link to="/admin/createcategory">Add New</Link>
        </button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.category}</td>
              <td>{c.description}</td>
              <td>
                <Link to={`/admin/editCategory/${c.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button className="delete-btn" onClick={() => handleDelete(c.id)}>
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

export default CategoryList;
