import { productAPI } from "../instances";

export const getProductsAPI = () => productAPI.get("/api/get_products/");

export const getProductByIdAPI = (id) =>
  productAPI.get(`/api/product/get/${id}`);

export const createProductAPI = (data) =>
  productAPI.post("/api/create_product/", data);
