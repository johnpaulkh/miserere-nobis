import {Button, Col, ListGroup, Row} from "react-bootstrap";
import {BsPlusCircle} from "react-icons/bs";

type SalesAddButtonProps = {
    onClick: () => void
}

export default function SalesAddButton({onClick}: SalesAddButtonProps) {
    return (
        <ListGroup.Item>
            <Row className="justify-content-center">
                <Col xs={"auto"}>
                    <Button style={{backgroundColor: '#de6a70'}} onClick={onClick}>Tambah
                        Penjualan <BsPlusCircle/></Button>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}