import { cartAPI } from "../api/instances";

// GET cart items
export const getCartAPI = () => cartAPI.get("/cart");

// ADD item to cart
export const addToCartAPI = (product_id, quantity = 1) =>
  cartAPI.post("/cart/items", { product_id, quantity });

// UPDATE qty
export const updateCartItemAPI = (product_id, quantity) =>
  cartAPI.put(`/cart/items/${product_id}`, { quantity });

// DELETE entire cart
export const deleteCartAPI = () => cartAPI.delete("/cart");

// GET single cart item
export const getSingleCartItemAPI = (product_id) =>
  cartAPI.get(`/cart/items/${product_id}`);
