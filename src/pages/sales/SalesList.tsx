import {Container, ListGroup} from "react-bootstrap";
import type {Sales} from "../../entity/Sale.ts";

type SalesListProps = {
    sales: Sales[];
    refreshSales: () => void
}

export default function SalesList({sales, refreshSales}: SalesListProps) {
    return (
        <ListGroup>
            <ListGroup.Item>
                <Container>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Customer</th>
                            <th>Produk</th>
                            <th>Variant</th>
                            <th>Jumlah</th>
                            <th>Harga Jual</th>
                            <th>Harga Beli</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sales.map((s) => (
                            <>
                                <tr>
                                    <td rowSpan={s.details.length}>{s.date}</td>
                                    <td rowSpan={s.details.length}>{s.customer}</td>
                                    <td>{s.details[0].productName}</td>
                                    <td>{s.details[0].variantName}</td>
                                    <td>{s.details[0].quantity}</td>
                                    <td>{s.details[0].price}</td>
                                    <td>{s.details[0].cogs}</td>
                                </tr>
                                {s.details.map((sd, index) => (
                                    index > 0 && (
                                        <tr>
                                            <td>{sd.productName}</td>
                                            <td>{sd.variantName}</td>
                                            <td>{sd.quantity}</td>
                                            <td>{sd.price}</td>
                                            <td>{sd.cogs}</td>
                                        </tr>
                                    )
                                ))}
                            </>
                        ))}
                        </tbody>
                    </table>
                </Container>
            </ListGroup.Item>
        </ListGroup>
    )
}