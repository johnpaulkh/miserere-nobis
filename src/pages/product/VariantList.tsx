import {Col, ListGroup, Row} from "react-bootstrap";
import type {Variant} from "../../entity/Product.tsx";

type VariantListProps = {
    variants: Variant[],
}

export default function VariantList({variants}: VariantListProps) {
    return (
        <ListGroup.Item>
            {variants.map((v) =>
                <Row action>
                    <Col>
                        Nama Variant : <strong>{v.name}</strong> <br/>
                        <small className="text-muted">harga jual : {v.price}</small> <br/>
                        <small className="text-muted">harga beli : {v.cogs}</small>
                    </Col>
                </Row>
            )}
        </ListGroup.Item>
    )
}