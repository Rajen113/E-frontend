import { orderAPI } from "../api/instances";

export const placeOrderAPI = (orderData) => {
  return orderAPI.post("/orders/", orderData);
};
