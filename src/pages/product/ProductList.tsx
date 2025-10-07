import {Col, ListGroup, Row} from "react-bootstrap";
import type {Product} from "../../entity/Product.ts";
import React, {useState} from "react";
import VariantList from "./variant/VariantList.tsx";
import ProductAddButton from "./ProductAddButton.tsx";
import ProductAddModal from "./ProductAddModal.tsx";

type ProductListProp = {
    products: Product[];
    refreshProduct: () => void
}

export default function ProductList({products, refreshProduct}: ProductListProp) {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleExpand = (id: string | null) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <ListGroup>
            {products.map((p) => (
                <React.Fragment key={p.id}>
                    <ListGroup.Item action onClick={() => toggleExpand(p.id)}>
                        <Row>
                            <Col>
                                <strong className="h4">{p.name}</strong> <br/>
                                <small className="text-muted">Jumlah Variant: {p.variants.length}</small>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {expanded === p.id && (
                        <VariantList
                            variants={p.variants}
                            refreshProduct={refreshProduct}
                        />
                    )}
                </React.Fragment>
            ))}
            {showAddProduct &&
                <ProductAddModal show={showAddProduct} onCancel={() => setShowAddProduct(false)} refreshProduct={refreshProduct}/>
            }
            <ProductAddButton
                onClick={() => {
                    setShowAddProduct(true)
                }}
            />
        </ListGroup>
    )
}