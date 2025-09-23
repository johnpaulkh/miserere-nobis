import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import type {Product} from "../../entity/Product";

type AddProductModalProps = {
    show: boolean;
    onHide: () => void;
    onAdd: (product: Product) => void;
};

export default function AddProductModal({ show, onHide, onAdd }: AddProductModalProps) {
    const [form, setForm] = useState({ name: "", variant: "", price: "", cogs: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onAdd({
            name: form.name,
            variant: form.variant,
            price: Number(form.price),
            cogs: Number(form.cogs),
        });
        setForm({ name: "", variant: "", price: "", cogs: "" });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={form.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Variant</Form.Label>
                        <Form.Control name="variant" value={form.variant} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" value={form.price} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>COGS</Form.Label>
                        <Form.Control type="number" name="cogs" value={form.cogs} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="success" onClick={handleSubmit}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}
