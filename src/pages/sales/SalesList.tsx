import {Container, ListGroup} from "react-bootstrap";
import type {Sales} from "../../entity/Sale.ts";
import Currency from "../../utils/Currency.tsx";

type SalesListProps = {
    sales: Sales[];
}

export default function SalesList({sales}: SalesListProps) {
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
                            <th>Admin</th>
                            <th>Pengemasan</th>
                            <th>Subsidi</th>
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
                                    <td><Currency value={s.details[0].price}/></td>
                                    <td><Currency value={s.details[0].cogs}/></td>
                                    <td><Currency value={s.details[0].adminFee}/></td>
                                    <td><Currency value={s.details[0].packingFee}/></td>
                                    <td><Currency value={s.details[0].packingFeePaid}/></td>
                                </tr>
                                {s.details.map((sd, index) => (
                                    index > 0 && (
                                        <tr>
                                            <td>{sd.productName}</td>
                                            <td>{sd.variantName}</td>
                                            <td>{sd.quantity}</td>
                                            <td><Currency value={sd.price}/></td>
                                            <td><Currency value={sd.cogs}/></td>
                                            <td><Currency value={sd.adminFee}/></td>
                                            <td><Currency value={sd.packingFee}/></td>
                                            <td><Currency value={sd.packingFeePaid}/></td>
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