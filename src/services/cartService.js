import { cartAPI } from "../api/instances";

// GET cart items
export const getCartAPI = () => cartAPI.get("/cart");

// ADD item
export const addToCartAPI = (product_id, quantity = 1) =>
  cartAPI.post("/cart/items", { product_id, quantity });

// UPDATE qty
export const updateCartItemAPI = (product_id, quantity) =>
  cartAPI.put(`/cart/items/${product_id}`, { quantity });

// ⭐ DELETE single cart item
export const removeCartItemAPI = (product_id) =>
  cartAPI.delete(`/cart/items/${product_id}`);

// DELETE entire cart
export const deleteCartAPI = () => cartAPI.delete("/cart");

// GET single cart item
export const getSingleCartItemAPI = (product_id) =>
  cartAPI.get(`/cart/items/${product_id}`);
