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

  if (loading) return <h2 className="loading">Loading...</h2>;

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h2 className="not-found">Product Not Found</h2>;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: Math.round(product.price * 80),
      img: product.thumbnail,
      qty: 1,
    });
    navigate("/cart");
  };

  return (
    <div className="details-container">
      
      {/* LEFT: Image gallery */}
      <div className="details-image-section">
        <img className="main-image" src={product.thumbnail} alt={product.title} />

        <div className="image-list">
          {product.images.map((img, i) => (
            <img key={i} src={img} alt="" className="small-image" />
          ))}
        </div>
      </div>

      {/* RIGHT: Info */}
      <div className="details-info">
        <h2>{product.title}</h2>
        <p className="brand">Brand: <strong>{product.brand}</strong></p>

        <p className="category">Category: {product.category}</p>

        <p className="availability">
          Status: <span>{product.availabilityStatus}</span>
        </p>

        <p className="details-price">
          ₹{Math.round(product.price * 80)}{" "}
          <span className="discount">({product.discountPercentage}% OFF)</span>
        </p>

        <p className="stock">Stock: {product.stock}</p>

        <p className="rating">⭐ {product.rating} / 5</p>

        <p className="shipping">
          Shipping: <strong>{product.shippingInformation}</strong>
        </p>

        <p className="warranty">
          Warranty: <strong>{product.warrantyInformation}</strong>
        </p>

        <p className="details-desc">{product.description}</p>

        <button className="details-btn" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
