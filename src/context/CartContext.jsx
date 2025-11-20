import { createContext, useEffect, useState } from "react";
import {
  getCartAPI,
  addToCartAPI,
  deleteCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
} from "../services/cartService";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const productCache = {};
 
  const parseImagePath = (imagePath) => {
    if (!imagePath) return [];

    try {
      // Remove extra quotes from string
      let cleaned = imagePath.replace(/^"+|"+$/g, "");

      // Fix double-double quotes
      cleaned = cleaned.replace(/""/g, '"');

      const parsed = JSON.parse(cleaned);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Image path parse error:", err, imagePath);
      return [];
    }
  };

  const fetchProductDetails = async (product_id) => {
    if (productCache[product_id]) {
      return productCache[product_id];
    }

    try {
      const res = await axios.get(
        `http://192.168.29.249:8001/api/product/get/${product_id}`
      );

      productCache[product_id] = res.data;
      return res.data;
    } catch (err) {
      // console.error("Product fetch failed:", err);
      return null;
    }
  };

  const fetchCart = async () => {
    try {
      const res = await getCartAPI();
      const items = res.data.items || [];

      const completeCart = await Promise.all(
        items.map(async (ci) => {
          const product = await fetchProductDetails(ci.product_id);

          const images = parseImagePath(product?.image_path);

          return {
            id: ci.product_id,
            qty: ci.quantity,
            name: product?.name || "Unknown Product",
            price: product?.price || 0,
            img:
              images.length > 0
                ? `http://192.168.29.249:8001/${images[0].replace(/^\/+/, "")}`
                : "https://via.placeholder.com/300x300?text=No+Image",
          };
        })
      );

      setCart(completeCart);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product_id) => {
    try {
      await addToCartAPI(product_id, 1);
      fetchCart();
    } catch (e) {
      console.error("Add to cart error:", e);
    }
  };

  const updateQty = async (product_id, qty) => {
    try {
      await updateCartItemAPI(product_id, qty);
      fetchCart();
    } catch (e) {
      console.error("Update qty error:", e);
    }
  };

  const removeFromCart = async (product_id) => {
    try {
      const res = await removeCartItemAPI(product_id);

      if (res.status === 200 || res.status === 204) {
        fetchCart();
      }
    } catch (e) {
      console.error("Remove item error:", e);
    }
  };

  const clearCart = async () => {
    try {
      await deleteCartAPI();
      setCart([]);
    } catch (e) {
      console.error("Clear cart error:", e);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
