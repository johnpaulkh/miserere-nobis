import {Col, Container, Row} from "react-bootstrap";
import DefaultDatePicker from "../../utils/DatePicker.tsx";
import {useCallback, useEffect, useState} from "react";
import {fetchSalesSummary, type SalesSummary, SalesSummaryYeah} from "../../service/SalesService.ts";
import Currency from "../../utils/Currency.tsx";

const useFetchSalesSummary = () => {
    const [salesSummary, setSalesSummary] = useState<SalesSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())

    const loadSalesSummary = useCallback(async () => {
        try {
            const fetchedSales = await fetchSalesSummary(startDate, endDate);
            const salesSummary = fetchedSales ?? null;
            setSalesSummary(salesSummary);
            setError(null);
        } catch (err) {
            console.error("Error in loadSalesSummary:", err);
            setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.");
            setSalesSummary(null);
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        loadSalesSummary().then();
    }, [loadSalesSummary]);

    return {
        salesSummary: salesSummary,
        isLoading,
        error,
        setSalesSummary: setSalesSummary,
        refreshSales: loadSalesSummary,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    };
};

function summaryTable(salesSummary: SalesSummary | null) {
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

function dailySummaryTable(salesSummary: SalesSummaryYeah | null) {
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

export default function DashBoardPage() {
    const {
        salesSummary,
        isLoading,
        error,
        refreshSales,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    } = useFetchSalesSummary();

    const onDatePickerChange = (datePickerName: string, date: Date | null) => {
        if (datePickerName === "startDate") setStartDate(date ?? new Date())
        else setEndDate(date ?? new Date())
        refreshSales().then();
    }

    useEffect(() => {
        document.title = 'Dashboard | Miserere';
    }, []);

    if (isLoading) {
        return <Container className="py-4"><p>Memuat sales summary...</p></Container>;
    }

    if (error) {
        return <Container className="py-4"><p className="text-danger">{error}</p></Container>;
    }

    return (
        <Container className="py-4">
            <Row>
                <Col sm={10}>
                    <h2 className="mb-3">Dashboard</h2>
                </Col>
            </Row>
            <Row className="py-4">
                <Col sm={3}>Dari&nbsp;
                    <DefaultDatePicker name="startDate" selectedDate={startDate}
                                       onChange={(date) => onDatePickerChange('startDate', date)}/>
                </Col>
                <Col sm={3}>Sampai&nbsp;
                    <DefaultDatePicker name="endDate" selectedDate={endDate}
                                       onChange={(date) => onDatePickerChange('endDate', date)}/>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6}>
                    {summaryTable(salesSummary)}
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    {dailySummaryTable(salesSummary)}
                </Col>
            </Row>
        </Container>
    );
}