import apiClient from "./apiClient";
import type { Product } from "../types/products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await apiClient.get<Product[]>("/product/");
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
}
