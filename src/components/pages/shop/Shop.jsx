import React, { useState, useContext } from "react";
import "./Shop.css";

import { AuthContext } from "../../../context/AuthContext";
import { ProductContext } from "../../../context/ProductContext";
import { CartContext } from "../../../context/CartContext";
import { ToastContext } from "../../../context/ToastContext";

import { useNavigate, Link } from "react-router-dom";

function Shop() {
  const { isLoggedIn } = useContext(AuthContext);
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(3000);

  if (loading) return <h2 className="loading">Loading products...</h2>;

  // Transform according to API EXACTLY
  const transformedProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    price: Math.round(p.price * 80), // Convert USD → ₹
    category: p.category,
    thumbnail: p.thumbnail,
  }));

  // Filter logic
  const filteredProducts = transformedProducts.filter((p) => {
    const catMatch =
      selectedCategory === "All" || p.category === selectedCategory;

    const priceMatch = p.price <= priceRange;

    return catMatch && priceMatch;
  });

  // Add to cart
  const handleAdd = (product) => {
    if (isLoggedIn) {
      navigate("/login");
      return;
    }
    addToCart(product);
    showToast("Product added to cart!");
  };

  return (
    <div className="shop-container">

      {/* Filters */}
      <div className="shop-filters">
        
        {/* Category Filters */}
        <div className="filter-scroll">
          {["All", ...new Set(products.map((p) => p.category))].map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Filter */}
        <div className="price-filter">
          <label>Up to ₹{priceRange}</label>
          <input
            type="range"
            min="500"
            max="3000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
        </div>

      </div>

      {/* Product List */}
      <div className="shop-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="shop-card" key={product.id}>

              <Link to={`/product/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />
              </Link>

              <h4>{product.title}</h4>
              <p>₹{product.price}</p>

              <button onClick={() => handleAdd(product)}>
                Add to Cart
              </button>

            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>

    </div>
  );
}

export default Shop;
