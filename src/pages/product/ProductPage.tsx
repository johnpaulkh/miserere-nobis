import {Container} from "react-bootstrap";
import AddProductModal from "./AddProductModal.tsx";
import {useState} from "react";
import type {Product} from "../../entity/Product.tsx";
import AddButton from "../../components/AddButton.tsx";
import ProductList from "./ProductList.tsx";

const initialProducts: Product[] = [
    {
        id: "VAR-001",
        name: "Sapo Tinggi",
        variants: [
            {
                id: "VAR-001-001",
                name: "ST-001",
                price: 109200,
                cogs: 87000,
            },
            {
                id: "VAR-001-002",
                name: "ST-002",
                price: 129200,
                cogs: 107000,
            },
            {
                id: "VAR-001-003",
                name: "ST-003",
                price: 159200,
                cogs: 127000,
            },
        ],
    },
    {
        id: "VAR-002",
        name: "Sapo Ceper",
        variants: [
            {
                id: "VAR-002-001",
                name: "SP-001",
                price: 109200,
                cogs: 87000,
            },
            {
                id: "VAR-002-002",
                name: "SP-002",
                price: 129200,
                cogs: 107000,
            },
            {
                id: "VAR-002-003",
                name: "SP-003",
                price: 159200,
                cogs: 127000,
            },
        ],
    }
]

export default function ProductPage() {
    const [products, setProducts] = useState(initialProducts);
    const [showModal, setShowModal] = useState(false);

    const handleAddProduct = (p: Product) => setProducts([...products, p]);

    return (
        <Container className="py-4">
            <h2 className="mb-3">Daftar Produk</h2>
            <ProductList
                products={products}
            />

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