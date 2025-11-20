import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  const loadProducts = async () => {
    const res = await axios.get("http://192.168.29.249:8001/api/get_products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(
      `http://192.168.29.249:8001/api/delete_product/${id}`
    );
    loadProducts();
  };

  const API_BASE_URL = "http://192.168.29.249:8001";

  // Pagination Calculation
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="product-list-container">

      <div className="list-header">
        <h2> All Products</h2>

        <Link to="/admin/addProduct" className="add-btn">+ Add New</Link>
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
          {currentProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              <td>
                <img
                  src={`${API_BASE_URL}/${p.image_path[0]}`}
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

      {/* PAGINATION SECTION */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          ❮ Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          Next ❯
        </button>
      </div>

    </div>
  );
}

export default ProductList;
