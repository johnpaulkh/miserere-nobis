import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {BsPlusCircle} from "react-icons/bs";

type ProductAddButtonProps = {
    onClick: () => void
}

export default function ProductAddButton({onClick} : ProductAddButtonProps) {
    return (
        <ListGroup.Item action style={{ backgroundColor: '#de6a70' }} onClick={onClick}>
            <Row className="justify-content-center">
                <Col xs={"auto"}>
                    <Container>Tambah Produk <BsPlusCircle/></Container>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}