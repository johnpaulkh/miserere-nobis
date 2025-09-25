import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {BsPlusCircle} from "react-icons/bs";

export default function VariantAddButton() {
    return (
        <ListGroup.Item action style={{ backgroundColor: '#de6a70' }}>
            <Row className="justify-content-center">
                <Col xs={"auto"}>
                    <Container>Tambah Variant <BsPlusCircle/></Container>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}