import {Button, Col, ListGroup, Row} from "react-bootstrap";
import type {Product} from "../../entity/Product.ts";
import React, {useState} from "react";
import VariantList from "./variant/VariantList.tsx";
import {BsFillPencilFill} from "react-icons/bs";
import EditProductRow from "./ProductEditRow.tsx";

type ProductListProp = {
    products: Product[];
    refreshProduct: () => void
}

export default function ProductList({products, refreshProduct}: ProductListProp) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [editProductId, setEditProductId] = useState<string | null>(null);

    const toggleExpand = (id: string | null) => {
        setExpanded(expanded === id ? null : id);
    };

    const toggleEditProduct = (id: string | null) => {
        setEditProductId(id);
    }

    return (
        <ListGroup>
            {products.map((p) => (
                <React.Fragment key={p.id}>
                    <ListGroup.Item>
                        <Row>
                            {
                                editProductId === p.id
                                    ? <EditProductRow
                                        product={p}
                                        onCancel={() => setEditProductId(null)}
                                        onRefresh={refreshProduct}
                                    />
                                    :
                                    <>
                                        <Col sm={11} onClick={() => toggleExpand(p.id)} action>
                                            <strong className="h4">{p.name}</strong> <br/>
                                            <small className="text-muted">Jumlah Variant: {p.variants.length}</small><br/>
                                            <small className="text-muted">Biaya Admin: {p.adminFeePercentage} %</small>
                                        </Col>
                                        <Col sm={1} className="text-end" xs="auto">
                                            <Button variant="outline-primary"
                                                    onClick={() => toggleEditProduct(p.id)}><BsFillPencilFill/> Edit</Button>
                                        </Col>
                                    </>
                            }
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
        </ListGroup>
    )
}