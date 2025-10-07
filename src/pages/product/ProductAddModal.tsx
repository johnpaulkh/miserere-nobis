import {Button, Col, Container, Form, FormGroup, ListGroup, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import VariantAddButton from "./variant/VariantAddButton.tsx";
import Currency from "../../utils/Currency.tsx";
import {BsCheck2Circle} from "react-icons/bs";
import {createProduct} from "../../service/ProductService.ts";
import type {Variant} from "../../entity/Product.ts";

type ProductAddModalProps = {
    show: boolean,
    onCancel: () => void,
    refreshProduct: () => void
}

type ProductForm = {
    name: string,
    variants: VariantForm[],
}

type VariantForm = {
    name: string,
    price: number,
    cogs: number,
}

export default function ProductAddModal({show, onCancel, refreshProduct}: ProductAddModalProps) {
    const [form, setForm] = useState<ProductForm>({name: "", variants: []});
    const [variantForm, setVariantForm] = useState<VariantForm>({name: "", price: 0, cogs: 0})
    const [showAddVariant, setShowAddVariant] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setVariantForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const resetForm = () => {
        setForm({
            name: "",
            variants: [],
        })
    }

    const handleSave = async () => {
        console.log(form);
        resetForm();
        await createProduct({
            id: null,
            name: form.name,
            variants: form.variants.map((v): Variant => ({
                id: null,
                productId: null,
                name: v.name,
                price: v.price,
                cogs: v.cogs,
            }))
        });
        onCancel();
        refreshProduct();
    }

    const handleCancel = () => {
        resetForm();
        onCancel();
    }

    const resetVariantForm = () => {
        setVariantForm({
            name: "",
            price: 0,
            cogs: 0,
        })
    }

    const handleVariantSave = () => {
        const variants = form.variants;
        variants.push(variantForm);
        setForm({
            name: form.name,
            variants: variants,
        })
        resetVariantForm();
    }

    const handleVariantCancel = () => {
        resetVariantForm();
        setShowAddVariant(false);
    }

    const productVariantRow = () => (
        <ListGroup.Item>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Nama</Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="name" value={variantForm.name}
                                                  onChange={handleVariantChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Harga Jual</Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="price" value={variantForm.price}
                                                  onChange={handleVariantChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Harga Beli</Form.Label>
                                <Col sm={9}><Form.Control name="cogs" value={variantForm.cogs}
                                                          onChange={handleVariantChange}/></Col>
                            </Form.Group>
                            <FormGroup as={Row} className="mb-3">
                                <Col sm={{span: 9, offset: 3}} className="d-flex gap-2">
                                    <Button variant={"outline-primary"} onClick={handleVariantSave}>
                                        Simpan<BsCheck2Circle/>
                                    </Button>
                                    <Button variant={"outline-secondary"} onClick={handleVariantCancel}>
                                        Batal<BsCheck2Circle/>
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    )

    return (
        <Modal show={show} onHide={handleCancel} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Produk Baru</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item action>
                        <Row>
                            <Col>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Nama</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control name="name" value={form.name} onChange={handleChange}/>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {form.variants.map((v) => (
                        <ListGroup.Item key={"variant-detail-row-" + v.name}>
                            <Row>
                                <Col>
                                    <strong>{v.name}</strong> <br/>
                                    <small className="text-muted">harga jual : <Currency value={v.price}/></small>
                                    <br/>
                                    <small className="text-muted">harga beli : <Currency value={v.cogs}/></small>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                    {showAddVariant
                        ? productVariantRow()
                        : <VariantAddButton
                            onClick={() => {
                                setShowAddVariant(true)
                            }}
                        />
                    }
                    <ListGroup.Item>
                        <FormGroup as={Row} className="mb-3">
                            <Col sm={{span: 9}} className="d-flex gap-2">
                                <Button variant={"outline-primary"} onClick={handleSave}>
                                    Simpan<BsCheck2Circle/>
                                </Button>
                                <Button variant={"outline-secondary"} onClick={handleCancel}>
                                    Batal<BsCheck2Circle/>
                                </Button>
                            </Col>
                        </FormGroup>
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
        </Modal>
    )
}