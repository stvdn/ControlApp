import { useProducts } from '../hooks/useProducts';
import ProductForm from '../components/ui/ProductForm';
import ProductList from '../components/ui/ProductList';

export default function ProductManagement() {
  const { 
    products, 
    loading, 
    error, 
    removeProduct,
  } = useProducts();


  const handleDelete = async (id: number) => {
    if (window.confirm('Estas seguro de eliminar el producto')) {
      try {
        await removeProduct(id);
      } catch (err: any) {
        alert(err.message || 'Failed to delete product');
      }
    }
  };

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 text-text-base">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestionar Productos</h1>
      <ProductForm />
      <ProductList 
        products={products} 
        onDelete={handleDelete} 
      />
    </div>
  );
}