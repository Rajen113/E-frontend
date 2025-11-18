import axios from "../instances";

export const getProductsAPI = () => axios.get("/products");
export const getProductByIdAPI = (id) => axios.get(`/products/${id}`);
export const createProductAPI = (data) => axios.post("/products", data);
