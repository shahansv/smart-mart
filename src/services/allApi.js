import axiosConfig from "./axiosConfig";
import { base } from "./baseURL";

export const addProduct = async (reqBody) => {
  return await axiosConfig("post", `${base}/inventory`, reqBody);
};

export const displayProducts = async () => {
  return await axiosConfig("get", `${base}/inventory`, "");
};

export const editProduct = async (id, reqBody) => {
  return await axiosConfig("put", `${base}/inventory/${id}`, reqBody);
};

export const deleteProduct = async (id) => {
  return await axiosConfig("delete", `${base}/inventory/${id}`, {});
};

export const reduceQuantity = async (id, reqBody) => {
  return await axiosConfig("patch", `${base}/inventory/${id}`, reqBody);
};

export const updateQuantity = async (id, reqBody) => {
  return await axiosConfig("patch", `${base}/inventory/${id}`, reqBody);
};

export const saveInvoice = async (reqBody) => {
  return await axiosConfig("post", `${base}/invoice`, reqBody);
};

export const getSavedInvoice = async () => {
  return await axiosConfig("get", `${base}/invoice`, "");
};
