import {Col, ListGroup, Row} from "react-bootstrap";
import type {Product} from "../../entity/Product.tsx";
import React, {useState} from "react";
import VariantList from "./variant/VariantList.tsx";

type ProductListProp = {
    products: Product[];
}

export default function ProductList({products}: ProductListProp) {

    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
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
                        />
                    )}
                </React.Fragment>
            ))}
        </ListGroup>
    )
}