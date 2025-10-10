import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import React, {useState} from "react";
import {useFetchProducts} from "../../manager/ProductManager.ts";
import ProductSelect from "../../components/ProductSelect.tsx";
import VariantSelect from "../../components/VariantSelect.tsx";
import {BsCheck2Circle, BsPlusCircle} from "react-icons/bs";
import Currency from "../../utils/Currency.tsx";
import {createSales} from "../../service/SalesService.ts";
import {apiDateFormat} from "../../utils/DateFormatter.ts";

type SalesAddModalProps = {
    show: boolean,
    onCancel: () => void,
    refreshSales: () => void,
}

type SalesDetailForm = {
    productId: string,
    productName: string,
    variantId: string,
    variantName: string,
    quantity: number,
    price: number,
    cogs: number,
}

type SalesForm = {
    customer: string,
    address: string,
    logistic: string,
}

type SalesDetail = {
    productName: string,
    productId: string,
    variantId: string,
    variantName: string,
    quantity: number,
    price: number,
    cogs: number,
}

export default function SalesAddModal({show, onCancel, refreshSales}: SalesAddModalProps) {
    const [salesDetailForm, setSalesDetailForm] = useState<SalesDetailForm>({
        productId: "",
        productName: "",
        variantId: "",
        variantName: "",
        quantity: 0,
        price: 0,
        cogs: 0
    });
    const [salesForm, setSalesForm] = useState<SalesForm>({customer: "", address: "", logistic: ""})
    const [salesDetails] = useState<SalesDetail[]>([])
    const {products} = useFetchProducts();

    const handleSubmit = async () => {
        const date = apiDateFormat(new Date());
        await createSales({
            date: date,
            customer: salesForm.customer,
            address: salesForm.address,
            logistic: salesForm.logistic,
            details: salesDetails.map(sd => ({
                productId: sd.productId,
                variantId: sd.variantId,
                quantity: sd.quantity,
                price: sd.price,
                cogs: sd.cogs,
            }))
        })
        refreshSales();
        onCancel();
    }

    const handleCancel = () => {
        onCancel()
    }

    const handleSalesFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setSalesForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    const handleSalesDetailFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setSalesDetailForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));

        if (name === "productId") {
            const productName = products
                .filter(p => p.id === value)
                .map(p => (p.name))?.[0] ?? "";
            setSalesDetailForm(prevForm => ({
                ...prevForm,
                price: 0,
                productName: productName,
            }));
        }

        if (name === "variantId") {
            const variant = products
                .flatMap(p => (p.variants))
                .filter(v => v.id === value)?.[0];
            const price = variant?.price ?? 0;
            const variantName = variant?.name ?? ""
            const cogs = variant?.cogs ?? 0;
            setSalesDetailForm(prevForm => ({
                ...prevForm,
                price: price,
                variantName: variantName,
                cogs: cogs,
            }));
        }
    }

    const handleSaveSalesDetailForm = () => {
        const salesDetail: SalesDetail = {
            productId: salesDetailForm.productId,
            productName: salesDetailForm.productName,
            variantId: salesDetailForm.variantId,
            variantName: salesDetailForm.variantName,
            quantity: salesDetailForm.quantity,
            price: salesDetailForm.price,
            cogs: salesDetailForm.cogs,
        };

        salesDetails.push(salesDetail);
        setSalesDetailForm({
            productId: "",
            productName: "",
            variantId: "",
            variantName: "",
            quantity: 0,
            price: 0,
            cogs: 0
        })
    }

    return (
        <Modal show={show} onHide={handleCancel} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Penjualan Baru</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col sm={12}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Pembeli</Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="customer" value={salesForm.customer} onChange={handleSalesFormChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Alamat</Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="address" value={salesForm.address} onChange={handleSalesFormChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Logistik</Form.Label>
                                <Col sm={10}>
                                    <Form.Control name="logistic" value={salesForm.logistic} onChange={handleSalesFormChange} />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm={6}>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Produk</Form.Label>
                                <Col sm={9}>
                                    <ProductSelect products={products}
                                                   productId={salesDetailForm.productId}
                                                   onChange={handleSalesDetailFormChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Variant</Form.Label>
                                <Col sm={9}>
                                    <VariantSelect products={products}
                                                   productId={salesDetailForm.productId}
                                                   variantId={salesDetailForm.variantId}
                                                   onChange={handleSalesDetailFormChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Jumlah</Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="quantity" value={salesDetailForm.quantity}
                                                  onChange={handleSalesDetailFormChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Harga Jual</Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="quantity" value={salesDetailForm.price}
                                                  onChange={handleSalesDetailFormChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Col sm={{span: 12}} className="d-flex gap-2 justify-content-end">
                                    <Button variant={"outline-primary"} onClick={handleSaveSalesDetailForm}>
                                        Tambah <BsPlusCircle/>
                                    </Button>
                                </Col>
                            </Form.Group>

                        </Col>
                        <Col sm={6}>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Produk</th>
                                    <th>Variant</th>
                                    <th>Jumlah</th>
                                    <th>Harga Jual</th>
                                </tr>
                                </thead>
                                <tbody>
                                {salesDetails.map((sd) => (
                                    <tr>
                                        <td>{sd.productName}</td>
                                        <td>{sd.variantName}</td>
                                        <td>{sd.quantity}</td>
                                        <td><Currency value={sd.price}/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col sm={12} className="d-flex justify-content-end">
                            <Button onClick={handleSubmit}>Buat Penjualan <BsCheck2Circle/></Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}