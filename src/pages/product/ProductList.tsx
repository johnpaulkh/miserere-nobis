import {Col, Container, ListGroup, Row} from "react-bootstrap";
import AddProductModal from "./AddProductModal.tsx";
import {useState} from "react";
import type {Product} from "../../entity/Product.tsx";
import AddButton from "../../components/AddButton.tsx";

const initialProducts = [
    { name: "Sapo Tinggi", variant: "S065", price: 120000, cogs: 77000 },
    { name: "Sapo Tinggi", variant: "S075", price: 140000, cogs: 90000 },
    { name: "Sapo Tinggi", variant: "S085", price: 176000, cogs: 110000 },
    { name: "Sapo Tinggi", variant: "S095", price: 198400, cogs: 134000 },
    { name: "Sapo Ceper", variant: "P065", price: 92200, cogs: 46400 },
    { name: "Sapo Ceper", variant: "P075", price: 112000, cogs: 76000 },
];

export default function ProductList() {
    const [products, setProducts] = useState(initialProducts);
    const [showModal, setShowModal] = useState(false);

    const handleAddProduct = (p: Product) => setProducts([...products, p]);

    return (
        <Container className="py-4">
            <h2 className="mb-3">Product List</h2>
            <ListGroup>
                {products.map((p) => (
                    <ListGroup.Item key={p.variant}>
                        <Row>
                            <Col>
                                <strong>{p.name}</strong> <br />
                                <small className="text-muted">Variant: {p.variant}</small>
                            </Col>
                            <Col className="text-end">
                                <div>Rp {p.price.toLocaleString("id-ID")}</div>
                                <small className="text-muted">
                                    COGS: Rp {p.cogs.toLocaleString("id-ID")}
                                </small>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <AddButton
                onClick={() => setShowModal(true)}
            />

            <AddProductModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onAdd={handleAddProduct}
            />
        </Container>
    );
}