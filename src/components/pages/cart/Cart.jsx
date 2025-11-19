import { createContext, useEffect, useState } from "react";
import {
  getCartAPI,
  addToCartAPI,
  deleteCartAPI,
  updateCartItemAPI,
} from "../../../services/cartService"

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);  
  const [loading, setLoading] = useState(true);

  // Load cart from backend
  const fetchCart = async () => {
    try {
      const res = await getCartAPI();

      // Convert backend response → frontend structure
      const formatted = res.data.items.map((item) => ({
        id: item.product_id,
        name: item.product_name,
        img: item.product_image,
        price: item.price,
        qty: item.quantity,
      }));

      setCart(formatted);

    } catch (error) {
      console.error("Cart load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart
  const addToCart = async (id) => {
    try {
      await addToCartAPI(id, 1);
      fetchCart();
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  // Update quantity
  const updateQty = async (id, qty) => {
    try {
      await updateCartItemAPI(id, qty);
      fetchCart();
    } catch (error) {
      console.error("Update qty error:", error);
    }
  };

  // Remove item (qty = 0)
  const removeFromCart = async (id) => {
    try {
      await updateCartItemAPI(id, 0);
      fetchCart();
    } catch (error) {
      console.error("Remove item error:", error);
    }
  };

  // Clear cart
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
}
