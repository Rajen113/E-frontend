import { cartAPI } from "./instances";

export const addToCartAPI = (data) => cartAPI.post("/cart/add", data);
export const getCartAPI = () => cartAPI.get("/cart");
