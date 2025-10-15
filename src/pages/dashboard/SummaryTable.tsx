import type {SalesSummary} from "../../service/SalesService.ts";
import Currency from "../../utils/Currency.tsx";

type SummaryTableProps = {
    salesSummary: SalesSummary | null
}

export default function SummaryTable({salesSummary}: SummaryTableProps) {
    if (salesSummary === null || salesSummary.summary === null) return <></>

    const summary = salesSummary.summary
    return (
        <table className="table table-sm border rounded-5">
            <tbody>
            <tr>
                <th className="p-2">Total Barang Terjual</th>
                <td className="text-end"><Currency
                    value={summary.totalQuantity}/></td>
            </tr>
            <tr>
                <th className="p-2">Total Penjualan</th>
                <td className="text-end"><Currency value={summary.totalPrice}/>
                </td>
            </tr>
            <tr>
                <th className="p-2">Total Harga Beli</th>
                <td className="text-end"><Currency value={summary.totalCogs}/>
                </td>
            </tr>
            <tr>
                <th className="p-2">Total Biaya Admin</th>
                <td className="text-end"><Currency
                    value={summary.totalAdminFee}/></td>
            </tr>
            <tr>
                <th className="p-2">Total Biaya Pengemasan</th>
                <td className="text-end"><Currency
                    value={summary.totalPackingFee}/></td>
            </tr>
            <tr>
                <th className="p-2">Total Biaya Pengemasan Terbayar</th>
                <td className="text-end"><Currency
                    value={summary.totalPackingFeePaid}/></td>
            </tr>
            <tr>
                <th className="p-2">Total Pendapatan</th>
                <td className="text-end"><Currency
                    value={summary.income}/></td>
            </tr>
            </tbody>
        </table>
    )
}