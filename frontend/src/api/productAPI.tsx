import apiClient from "./apiClient";
import type { Product } from "../types/products";

export const fetchProducts = async () => {
  const response = await apiClient.get<Product[]>('/product/');
  return response.data;
};

export const createProduct = async (productData: Partial<Product>) => {
  const response = await apiClient.post<Product>('/product/', productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  await apiClient.delete(`/product/${id}`);
};