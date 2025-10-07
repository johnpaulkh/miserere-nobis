import {Container} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import type {Product} from "../../entity/Product.ts";
import ProductList from "./ProductList.tsx";
import {fetchProducts} from "../../service/ProductService.ts";

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
            // If fetchAllProducts throws an error, catch it here
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

    // Return the state variables and the setter function
    return { products, isLoading, error, setProducts, refreshProducts: loadProducts };
};

export default function ProductPage() {
    const { products, isLoading, error, refreshProducts } = useFetchProducts();

    if (isLoading) {
        return <Container className="py-4"><p>Memuat produk...</p></Container>;
    }

    if (error) {
        return <Container className="py-4"><p className="text-danger">{error}</p></Container>;
    }

    return (
        <Container className="py-4">
            <h2 className="mb-3">Daftar Produk</h2>
            <ProductList
                products={products}
                refreshProduct={refreshProducts}
            />
        </Container>
    );
}