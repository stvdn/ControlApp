import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types/products';

export default function CRUDProduct() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product/', {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' || name === 'discount' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create product');
      
      const newProduct = await response.json();
      setProducts(prev => [...prev, newProduct]);
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete product');
      
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products Management</h1>
      
      {/* Create Product Form */}
      {user?.role === 'admin' && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Size</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  step="0.01"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Product
            </button>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Stock</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Actions</div>
        </div>
        
        {products.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No products found</div>
        ) : (
          products.map(product => (
            <div key={product.id} className="grid grid-cols-12 p-4 border-t hover:bg-gray-50">
              <div className="col-span-3">{product.name}</div>
              <div className="col-span-3 truncate">{product.description}</div>
              <div className="col-span-1">${product.price}</div>
              <div className="col-span-1">{product.stock}</div>
              <div className="col-span-2">{product.size || '-'}</div>
              <div className="col-span-2 space-x-2">
                <button 
                  onClick={() => {/* Implement edit modal */}}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}