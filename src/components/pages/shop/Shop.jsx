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
  const [priceRange, setPriceRange] = useState(100000);

  if (loading) return <h2 className="loading">Loading products...</h2>;

  const API_BASE_URL = "http://192.168.29.249:8001";

  // Transform product
  const transformedProducts = products.map((p) => ({
    id: p.id,
    title: p.name,
    price: p.price,
    category: p.category?.category,
    img: `${API_BASE_URL}/${p.image_path[0].replace(/^\/+/, "")}`,
    description: p.description,
    stock: p.quantity,
  }));

  const filteredProducts = transformedProducts.filter((p) => {
    const matchCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchPrice = p.price <= priceRange;

    return matchCategory && matchPrice;
  });

  // ⭐ FIXED ADD TO CART
  const handleAdd = (product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    addToCart(product.id);

    showToast("🛒 Added to cart!");
  };

  const categories = [
    "All",
    ...new Set(transformedProducts.map((p) => p.category)),
  ];

  return (
    <div className="shop-container">
      {/* FILTERS */}
      <div className="shop-filters">
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

        <div className="price-filter">
          <label>Up to ₹{priceRange}</label>
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

      {/* PRODUCT GRID */}
      <div className="shop-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="shop-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.img} alt={product.title} />
              </Link>

              <h4>{product.title}</h4>

              <p className="shop-desc">
                {product.description.length > 30
                  ? product.description.substring(0, 30) + "..."
                  : product.description}
              </p>

              <p className="price">₹{product.price}</p>

              <button 
                className="add-btn"
                onClick={() => handleAdd(product)}
              >
                🛒 Add to Cart
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
