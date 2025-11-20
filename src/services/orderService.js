import { orderAPI } from "../api/instances";

export const placeOrderAPI = (orderData) => {
  return orderAPI.post("/orders/", orderData);
};

export const getMyOrdersAPI = async () => {
  return orderAPI.get("/orders/");
};