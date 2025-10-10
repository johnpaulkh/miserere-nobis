import {Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import ProductList from "./ProductList.tsx";
import ProductAddButton from "./ProductAddButton.tsx";
import ProductAddModal from "./ProductAddModal.tsx";
import {useFetchProducts} from "../../manager/ProductManager.ts";

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