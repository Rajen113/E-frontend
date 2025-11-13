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

  /* Transform DummyJSON API data */
  const transformedProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    price: Math.round(p.price * 80),
    category: p.category,
    thumbnail: p.thumbnail,
    description: p.description,
  }));

  /* Filters */
  const filteredProducts = transformedProducts.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchPrice = p.price <= priceRange;

    return matchCategory && matchPrice;
  });

  /* Add to cart */
  const handleAdd = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    addToCart(product);
    showToast("Product added to cart!");
  };

  /* All categories */
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="shop-container">

      {/* ---------------- FILTER SECTION ---------------- */}
      <div className="shop-filters">

        {/* Category filter */}
        <div className="filter-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price filter */}
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

      {/* ---------------- PRODUCT GRID ---------------- */}
      <div className="shop-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="shop-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />
              </Link>

              <h4>{product.title}</h4>

              {/* Truncated Description */}
              <p className="shop-desc">
                {product.description.length > 30
                  ? product.description.substring(0, 30) + "..."
                  : product.description}
              </p>

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
