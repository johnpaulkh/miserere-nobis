import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {BsPlusCircle} from "react-icons/bs";

type VariantAddButtonProps = {
    onClick: () => void
}

export default function VariantAddButton({onClick} : VariantAddButtonProps) {
    return (
        <ListGroup.Item action style={{ backgroundColor: '#de6a70' }} onClick={onClick}>
            <Row className="justify-content-center">
                <Col xs={"auto"}>
                    <Container>Tambah Variant <BsPlusCircle/></Container>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}