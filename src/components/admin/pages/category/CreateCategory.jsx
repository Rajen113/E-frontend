import React, { useState } from "react";
import "./CreateCategory.css";

function CreateCategory() {
  

  return (
    <div className="add-category-container">
      <h2>Add New Category</h2>

      <form className="category-form">
    
        <div className="form-group">
          <label>Category ID</label>
          <input type="text" placeholder="Enter Category ID" required />
        </div>

     
        <div className="form-group">
          <label>Category Name</label>
          <input type="text" placeholder="Enter Category Name" required />
        </div>


      <div className="form-group">
           <label>Description</label>
          <input type="text" placeholder="Enter Description" required />
        </div>
  


        <button type="submit" className="btn-submit">
          Add Category
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;
