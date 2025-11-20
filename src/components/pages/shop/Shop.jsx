import React, { useState, useContext, useEffect } from "react";
import "./Shop.css";

import { AuthContext } from "../../../context/AuthContext";
import { ProductContext } from "../../../context/ProductContext";
import { CartContext } from "../../../context/CartContext";
import { ToastContext } from "../../../context/ToastContext";

import { useNavigate, Link, useLocation } from "react-router-dom";

function Shop() {
  const { isLoggedIn } = useContext(AuthContext);
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Read search & category from URL
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";
  const categoryQuery = params.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [priceRange, setPriceRange] = useState(100000);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, searchQuery]);

  if (loading) return <h2 className="loading">Loading products...</h2>;

  const API_BASE_URL = import.meta.env.VITE_PRODUCT_URL || "http://192.168.29.249:8001";

  const transformedProducts = products.map((p) => ({
    id: p.id,
    title: p.name,
    price: p.price,
    category: p.category?.category,
    img: p.image_path[0]
      ? `${API_BASE_URL}/${p.image_path[0].replace(/^\/+/, "")}`
      : "/placeholder.png",
    description: p.description,
  }));

  const filteredProducts = transformedProducts.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchPrice = p.price <= priceRange;

    const searchTerm = searchQuery.toLowerCase();

    const matchSearch =
      searchTerm === "" ||
      p.title.toLowerCase().includes(searchTerm) ||
      p.description?.toLowerCase().includes(searchTerm) ||
      p.category?.toLowerCase().includes(searchTerm);

    return matchCategory && matchPrice && matchSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAdd = (product) => {
    if (!isLoggedIn) return navigate("/login");
    addToCart(product.id);
    showToast("🛒 Added to cart!");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ["All", ...new Set(transformedProducts.map((p) => p.category))];

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="shop-container">

      {/* FILTERS */}
      <div className="shop-filters">

        <h2 className="filter-title">Filter Products</h2>

        <div className="filter-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active-cat" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="price-filter">
          <label>Max Price: <strong>₹{priceRange}</strong></label>
          <input
            type="range"
            min="100"
            max="1000000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
        </div>
      </div>

      {/* PRODUCT GRID & PAGINATION */}
      <div className="shop-main">
        <div className="shop-products">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div className="product-card" key={product.id}>
                
                <Link to={`/product/${product.id}`} className="img-wrapper">
                  <img src={product.img} alt={product.title} />
                </Link>

                <div className="product-info">
                  <h3>{product.title}</h3>

                  <p className="desc">
                    {product.description?.length > 40
                      ? product.description.substring(0, 40) + "..."
                      : product.description}
                  </p>

                  <p className="price">₹{product.price}</p>

                  <button onClick={() => handleAdd(product)}>
                    🛒 Add to Cart
                  </button>
                </div>

              </div>
            ))
          ) : (
            <p className="no-products">No products found 😕</p>
          )}
        </div>

        {/* PAGINATION */}
        {filteredProducts.length > itemsPerPage && (
          <div className="pagination">
            <button
              className="page-btn prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <div className="page-numbers">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="ellipsis">...</span>
                ) : (
                  <button
                    key={page}
                    className={`page-num ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              className="page-btn next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default Shop;
