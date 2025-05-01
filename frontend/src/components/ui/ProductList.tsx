import { Product } from '../../types/products';

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

export default function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border">
      <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold">
        <div className="col-span-3">Nombre</div>
        <div className="col-span-3">Descripción</div>
        <div className="col-span-1">Precio</div>
        <div className="col-span-1">Stock</div>
        <div className="col-span-2">Descuento</div>
        <div className="col-span-2">Acciones</div>
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
            <div className="col-span-2">{product.discount}%</div>
            <div className="col-span-2 space-x-2">
            <button className="text-blue-600 hover:text-blue-800">
                Editar
            </button>
            <button
                onClick={() => onDelete(product.id)}
                className="text-red-600 hover:text-red-800"
            >
                Eliminar
            </button>
              
            </div>
          </div>
        ))
      )}
    </div>
  );
}