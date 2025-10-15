import {Col, Container, Row} from "react-bootstrap";
import DefaultDatePicker from "../../utils/DatePicker.tsx";
import {useCallback, useEffect, useState} from "react";
import {fetchSalesSummary, type SalesSummary} from "../../service/SalesService.ts";
import DailySummaryTable from "./DailySummaryTable.tsx";
import SummaryTable from "./SummaryTable.tsx";

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
                    <SummaryTable salesSummary={salesSummary} />
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <DailySummaryTable salesSummary={salesSummary} />
                </Col>
            </Row>
        </Container>
    );
}