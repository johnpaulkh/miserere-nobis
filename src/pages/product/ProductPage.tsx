import {Col, Container, Row} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import type {Product} from "../../entity/Product.ts";
import ProductList from "./ProductList.tsx";
import {fetchProducts} from "../../service/ProductService.ts";
import ProductAddButton from "./ProductAddButton.tsx";
import ProductAddModal from "./ProductAddModal.tsx";

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

export default function ProductPage() {
    const {products, isLoading, error, refreshProducts} = useFetchProducts();
    const [showAddProduct, setShowAddProduct] = useState(false);

    if (isLoading) {
        return <Container className="py-4"><p>Memuat produk...</p></Container>;
    }

    if (error) {
        return <Container className="py-4"><p className="text-danger">{error}</p></Container>;
    }

    return (
        <Container className="py-4">
            <Row>
                <Col sm={10}>
                    <h2 className="mb-3">Daftar Produk</h2>
                </Col>
                <Col sm={2} className="d-flex justify-content-end">
                    <Container>
                        <ProductAddButton
                            onClick={() => {
                                setShowAddProduct(true)
                            }}
                        />
                    </Container>
                </Col>
            </Row>
            <ProductList
                products={products}
                refreshProduct={refreshProducts}
            />
            {showAddProduct &&
                <ProductAddModal show={showAddProduct} onCancel={() => setShowAddProduct(false)}
                                 refreshProduct={refreshProducts}/>
            }
        </Container>
    );
}