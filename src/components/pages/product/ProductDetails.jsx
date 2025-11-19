import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../../context/ProductContext";
import { CartContext } from "../../../context/CartContext";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const API_BASE_URL = "http://192.168.29.249:8001";

  if (loading) return <h2 className="loading">Loading...</h2>;

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h2 className="not-found">Product Not Found</h2>;

  const mainImageURL = `${API_BASE_URL}/${product.image_path[0].replace(/^\/+/, "")}`;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      img: mainImageURL,
      qty: 1,
    });
    navigate("/cart");
  };

  const handleThumbnailClick = (src) => {
    document.querySelector(".main-image").src = src;
  };

  return (
    <div className="details-container">

      {/* LEFT SECTION */}
      <div className="details-image-section">
        <img className="main-image" src={mainImageURL} alt={product.name} />

        <div className="image-list">
          {product.image_path.map((img, i) => (
            <img
              key={i}
              src={`${API_BASE_URL}/${img.replace(/^\/+/, "")}`}
              alt="thumbnail"
              className="small-image"
              onClick={() =>
                handleThumbnailClick(
                  `${API_BASE_URL}/${img.replace(/^\/+/, "")}`
                )
              }
            />
          ))}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="details-info">
        <h2>{product.name}</h2>

        <p className="category">
          Category: <strong>{product.category?.category}</strong>
        </p>

        <p className="details-price">₹{product.price}</p>

        <p className="stock">
          Stock Available: <strong>{product.quantity}</strong>
        </p>

        <p className="details-desc">{product.description}</p>

        <button className="details-btn" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
