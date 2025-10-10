import {useCallback, useEffect, useState} from "react";
import type {Product} from "../entity/Product.ts";
import {fetchProducts} from "../service/ProductService.ts";

const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        try {
            const fetchedProducts = await fetchProducts();
            const products = fetchedProducts?.data ?? []
            setProducts(products);
            setError(null);
        } catch (err) {
            console.error("Error in loadProducts:", err);
            setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.");
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts().then();
    }, [loadProducts]);

    return {products, isLoading, error, setProducts, refreshProducts: loadProducts};
};

export {
    useFetchProducts,
}