import { createContext, useEffect, useState } from "react";
import {
  getCartAPI,
  addToCartAPI,
  deleteCartAPI,
  updateCartItemAPI,
} from "../services/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await getCartAPI();
      setCart(res.data.items || []);
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
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const updateQty = async (product_id, qty) => {
    try {
      await updateCartItemAPI(product_id, qty);
      fetchCart();
    } catch (error) {
      console.error("Update qty error:", error);
    }
  };

  const removeFromCart = async (product_id) => {
    try {
      await updateCartItemAPI(product_id, 0);
      fetchCart();
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };

  const clearCart = async () => {
    try {
      await deleteCartAPI();
      setCart([]);
    } catch (error) {
      console.error("Clear cart error:", error);
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
