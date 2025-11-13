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

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2 className="not-found">Product Not Found</h2>;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: Math.round(product.price * 80),
      thumbnail: product.thumbnail,
      qty: 1,
    });
    navigate("/cart");
  };

  return (
    <div className="details-container">

      <div className="details-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="details-info">
        <h2>{product.title}</h2>

        <p className="details-price">
          ₹{(product.price * 80).toFixed(0)}
        </p>

        <p className="details-desc">{product.description}</p>

        <button className="details-btn" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
