import axios from "axios";
import type { Product } from "../types/products";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await apiClient.get<Product[]>("/product/");
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};
