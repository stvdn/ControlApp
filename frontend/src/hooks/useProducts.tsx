import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/products';
import { fetchProducts, createProduct, deleteProduct } from '../api/productAPI';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err:any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (productData: Partial<Product>) => {
    setLoading(true)
    try {
      const newProduct = await createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false)
    }
  };

  const removeProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    addProduct,
    removeProduct,
    refresh: loadProducts,
  };
}