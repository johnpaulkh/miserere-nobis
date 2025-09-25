import {Button, Col, Container, ListGroup, Row} from "react-bootstrap";
import type {Variant} from "../../entity/Product.tsx";
import {BsFillPencilFill} from "react-icons/bs";
import VariantAddButton from "./VariantAddButton.tsx";
import Currency from "../../utils/Currency.tsx";

type VariantListProps = {
    variants: Variant[],
}

export default function VariantList({variants}: VariantListProps) {
    return (
        <ListGroup.Item>
            <Container>
                {variants.map((v) =>
                    <ListGroup.Item action>
                        <Row>
                            <Col>
                                <strong>{v.name}</strong> <br/>
                                <small className="text-muted">harga jual : <Currency value={v.price} /></small> <br/>
                                <small className="text-muted">harga beli : <Currency value={v.cogs} /></small>
                            </Col>
                            <Col xs="auto">
                                <Button variant="outline-primary">
                                    <BsFillPencilFill /> Edit
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}
                <VariantAddButton/>
            </Container>
        </ListGroup.Item>
    )
}