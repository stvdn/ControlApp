import { useEffect, useState } from "react";
import { Product } from "../types/products";
import { fetchProducts } from "../api/productAPI";

export default function useProducts(){
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        async function laodProducts(){
            try{
                const data = await fetchProducts()
                setProducts(data)
            } catch (err) {
                setError('Failed to load products')
                console.log('err')
            } finally {
                setIsLoading(false)
            }
        }

        laodProducts()
    }, [])

    return {products, isLoading, error}
}