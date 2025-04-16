import React from 'react';
import { Product } from '../../types/products';

interface ProductCardProps {
    product: Product;
    addToCart: (id: number) => void;
  }
  

export default function ProductCard({product, addToCart}: ProductCardProps) {
    return (
        <div className="border rounded-log overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
                src={product.image_paths[0]}
                alt={product.name}
                className="w-full h-64 object-cover"
                loading='lazy'
            />
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => addToCart(product.id)}
                >
                Add to Cart
                </button>
            </div>
        </div>
    )
}