import {type SalesSummary} from "../../service/SalesService.ts";
import Currency from "../../utils/Currency.tsx";

type DailySummaryProps = {
    salesSummary: SalesSummary | null
}

export default function DailySummaryTable({salesSummary}: DailySummaryProps) {
    if (salesSummary === null || !salesSummary.dailySummaries) return <></>

    const sortedDailySummaries = Object.entries(salesSummary.dailySummaries || {})
        .sort((a, b) => a[0].localeCompare(b[0]));

    return (
        <table className="table table-sm border rounded-5">
            <thead>
            <tr>
                <th>Tanggal</th>
                <th>Barang Terjual</th>
                <th className="text-end">Penjualan</th>
                <th className="text-end">Harga Beli</th>
                <th className="text-end">Biaya Admin</th>
                <th className="text-end">Biaya Pengemasan</th>
                <th className="text-end">Pengemasan Dibayar</th>
                <th className="text-end">Pendapatan</th>
            </tr>
            </thead>
            <tbody>
            {
                sortedDailySummaries.map(([dateKey, summary]) => (
                    <tr>
                        <td>{dateKey}</td>
                        <td>{summary.totalQuantity}</td>
                        <td className="text-end"><Currency value={summary.totalPrice}/></td>
                        <td className="text-end"><Currency value={summary.totalCogs}/></td>
                        <td className="text-end"><Currency value={summary.totalAdminFee}/></td>
                        <td className="text-end"><Currency value={summary.totalPackingFee}/></td>
                        <td className="text-end"><Currency value={summary.totalPackingFeePaid}/></td>
                        <td className="text-end"><Currency value={summary.income}/></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}