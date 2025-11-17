import React from "react";
import "./CategoryList.css";
import { Link } from "react-router-dom";
function CategoryList() {
  const categorys = [
    {
      id: 1,
      name: "Dried Food",
      description: "sdf jhgf",
    },
    {
      id: 2,
      name: "Electronic",
      description: "sddfgff tgrfeds",
    },
  ];

  return (
    <div className="category-list-container">
      <div className="header">
        <h2>All Category</h2>
       
        <button className="add-btn"><Link to="/admin/createcategory">Add New</Link></button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categorys.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <button className="edit-btn"><Link to="/admin/editCategory">Edit</Link></button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
