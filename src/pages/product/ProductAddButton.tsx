import {Button, Col, ListGroup, Row} from "react-bootstrap";
import {BsPlusCircle} from "react-icons/bs";

type ProductAddButtonProps = {
    onClick: () => void
}

export default function ProductAddButton({onClick}: ProductAddButtonProps) {
    return (
        <ListGroup.Item>
            <Row className="justify-content-center">
                <Col xs={"auto"}>
                    <Button style={{backgroundColor: '#de6a70'}} onClick={onClick}>Tambah
                        Produk <BsPlusCircle/></Button>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}