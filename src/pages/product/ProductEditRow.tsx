import type {Product} from "../../entity/Product.ts";
import React, {useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {updateProduct} from "../../service/ProductService.ts";
import {BsCheck2Circle, BsXCircle} from "react-icons/bs";

type ProductForm = {
    name: string,
    adminFeePercentage: number,
}

type EditProductRowProps = {
    product: Product,
    onCancel: () => void,
    onRefresh: () => void,
}

export default function EditProductRow({product, onCancel, onRefresh}: EditProductRowProps) {
    const [editForm, setEditForm] = useState<ProductForm>({
        name: product.name,
        adminFeePercentage: product.adminFeePercentage
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setEditForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        const updatedProduct: Product = {
            ...product,
            name: editForm.name,
            adminFeePercentage: editForm.adminFeePercentage,
        }
        await updateProduct(updatedProduct);
        onRefresh();
        onCancel();
    }

    return (
            <Col>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Nama</Form.Label>
                        <Col sm={3}>
                            <Form.Control name="name" value={editForm.name} onChange={handleChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Biaya Admin</Form.Label>
                        <Col sm={3}>
                            <InputGroup>
                                <Form.Control name="adminFeePercentage" value={editForm.adminFeePercentage} onChange={handleChange}/>
                                <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Col sm={2}>
                            <Button variant="outline-primary" onClick={handleSubmit}>Simpan <BsCheck2Circle/></Button>&nbsp;
                            <Button variant="outline-secondary" onClick={onCancel}>Batal <BsXCircle/></Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Col>
    )
}