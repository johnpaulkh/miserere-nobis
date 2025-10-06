import {Button, Col, Form, FormGroup, ListGroup, Row} from "react-bootstrap";
import React, {useState} from "react";
import {BsCheck2Circle} from "react-icons/bs";

export default function VariantAddRow() {
    const [form, setForm] = useState({id: "", name: "", price: 0, cogs: 0});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log(form);
    }

    return (
        <ListGroup.Item>
            <Row>
                <Col>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Nama</Form.Label>
                            <Col sm={9}>
                                <Form.Control name="name" value={form.name} onChange={handleChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Harga Jual</Form.Label>
                            <Col sm={9}>
                                <Form.Control name="variantCount" value={form.price} onChange={handleChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Harga Beli</Form.Label>
                            <Col sm={9}><Form.Control name="variantCount" value={form.cogs} onChange={handleChange}/></Col>
                        </Form.Group>
                        <FormGroup as={Row} className="mb-3">
                            <Col sm={{ span: 9, offset: 3 }} className="d-flex gap-2">
                                <Button variant={"outline-primary"} onClick={handleSave}>
                                    Simpan<BsCheck2Circle/>
                                </Button>
                                <Button variant={"outline-secondary"}>
                                    Batal<BsCheck2Circle/>
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}