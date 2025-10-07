import {Button, Col, Container, Form, FormGroup, ListGroup, Row} from "react-bootstrap";
import type {Variant} from "../../../entity/Product.ts";
import {BsCheck2Circle, BsFillPencilFill} from "react-icons/bs";
import VariantAddButton from "./VariantAddButton.tsx";
import Currency from "../../../utils/Currency.tsx";
import {type ChangeEvent, useState} from "react";
import VariantAddRow from "./VariantAddRow.tsx";
import {updateVariant} from "../../../service/VariantService.ts";

type VariantListProps = {
    variants: Variant[],
    refreshProduct: () => void,
}

type VariantForm = {
    id: string | null,
    productId: string | null,
    name: string,
    price: number,
    cogs: number,
}

export default function VariantList({variants, refreshProduct}: VariantListProps) {
    const [showAddVariantRow, setShowAddVariantRow] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<VariantForm>({id: "", productId: "", name: "", price: 0, cogs: 0})

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setEditForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    const onClickEdit = (variant: Variant) => {
        console.log("Begin edit variant : " + variant.id)
        setEditingId(variant.id)
        setEditForm({
            id: variant.id,
            productId: variant.productId,
            name: variant.name,
            price: variant.price,
            cogs: variant.cogs,
        })
    }

    const onClickEditSave = async (variant: Variant) => {
        console.log("Save edit variant : " + variant.id);
        await updateVariant(editForm);
        refreshProduct();
        setEditingId(null);
        setEditForm({id: "", productId: "", name: "", price: 0, cogs: 0});

    }

    const onClickEditCancel = (variant: Variant) => {
        console.log("Cancel edit variant : " + variant.id);
        setEditingId(null);
        setEditForm({id: "", productId: "", name: "", price: 0, cogs: 0});
    }

    return (
        <ListGroup.Item>
            <Container>
                {variants.map((variant) =>
                    variant.id == editingId
                        ? <ListGroup.Item key={"variant-edit-form-row-" + variant.id}>
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Nama</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control name="name" value={editForm.name} onChange={handleChange}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Harga Jual</Form.Label>
                                            <Col sm={9}>
                                                <Form.Control name="price" value={editForm.price} onChange={handleChange}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Harga Beli</Form.Label>
                                            <Col sm={9}><Form.Control name="cogs" value={editForm.cogs}
                                                                      onChange={handleChange}/></Col>
                                        </Form.Group>
                                        <FormGroup as={Row} className="mb-3">
                                            <Col sm={{span: 9, offset: 3}} className="d-flex gap-2">
                                                <Button variant={"outline-primary"}
                                                        onClick={() => onClickEditSave(variant)}>
                                                    Simpan<BsCheck2Circle/>
                                                </Button>
                                                <Button variant={"outline-secondary"}
                                                        onClick={() => onClickEditCancel(variant)}>
                                                    Batal<BsCheck2Circle/>
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        : <ListGroup.Item key={"variant-detail-row-" + variant.id}>
                            <Row>
                                <Col>
                                    <strong>{variant.name}</strong> <br/>
                                    <small className="text-muted">harga jual : <Currency value={variant.price}/></small>
                                    <br/>
                                    <small className="text-muted">harga beli : <Currency value={variant.cogs}/></small>
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-primary" onClick={() => onClickEdit(variant)}>
                                        <BsFillPencilFill/> Edit
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                )}
                {showAddVariantRow &&
                    <VariantAddRow
                        key={"variant-add-row"}
                        productId={variants[0].productId ?? ""}
                        onCancel={() => setShowAddVariantRow(false)}
                        refreshProduct={refreshProduct}/>
                }
                <VariantAddButton
                    onClick={() => {
                        setShowAddVariantRow(true)
                    }}
                />
            </Container>
        </ListGroup.Item>
    )
}
