import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import type {Product} from "../../entity/Product";

type AddProductModalProps = {
    show: boolean;
    onHide: () => void;
    onAdd: (product: Product) => void;
};

export default function AddProductModal({ show, onHide, onAdd }: AddProductModalProps) {
    const [form, setForm] = useState({ id: "", name: "", variantCount: 0 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onAdd({
            id: form.id,
            name: form.name,
            variants: []
        });
        setForm({ id: "", name: "", variantCount: 0 });
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
                        <Form.Label>Jumlah Variant</Form.Label>
                        <Form.Control name="variantCount" value={form.variantCount} onChange={handleChange} />
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
