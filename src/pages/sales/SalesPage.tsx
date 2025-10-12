import {Col, Container, Row} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import SalesList from "./SalesList.tsx";
import type {Sales} from "../../entity/Sale.ts";
import {fetchSales} from "../../service/SalesService.ts";
import DefaultDatePicker from "../../utils/DatePicker.tsx";
import SalesAddModal from "./SalesAddModal.tsx";
import SalesAddButton from "./SalesAddButton.tsx";

const useFetchSales = () => {
    const [sales, setSales] = useState<Sales[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())

    const loadSales = useCallback(async () => {
        try {
            const fetchedSales = await fetchSales(startDate, endDate);
            const sales = fetchedSales?.data ?? []
            setSales(sales);
            setError(null);
        } catch (err) {
            console.error("Error in loadSales:", err);
            setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.");
            setSales([]);
        } finally {
            setIsLoading(false);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        loadSales().then();
    }, [loadSales]);

    return {sales, isLoading, error, setSales, refreshSales: loadSales, startDate, setStartDate, endDate, setEndDate};
};

export default function SalesPage() {
    const {sales, isLoading, error, refreshSales, startDate, setStartDate, endDate, setEndDate} = useFetchSales();
    const [showAddSales, setShowAddSales] = useState(false);

    if (isLoading) {
        return <Container className="py-4"><p>Memuat sales...</p></Container>;
    }

    if (error) {
        return <Container className="py-4"><p className="text-danger">{error}</p></Container>;
    }

    const onDatePickerChange = (datePickerName: string, date: Date | null) => {
        if (datePickerName === "startDate") setStartDate(date ?? new Date())
            else setEndDate(date ?? new Date())
        refreshSales().then();
    }

    return (
        <Container className="py-4">
            <Row>
                <Col sm={10}>
                    <h2 className="mb-3">Daftar Sales</h2>
                </Col>
            </Row>
            <Row className="py-4">
                <Col sm={3}>Dari <DefaultDatePicker name="startDate" selectedDate={startDate} onChange={(date) => onDatePickerChange('startDate', date)} /></Col>
                <Col sm={3}>Sampai <DefaultDatePicker name="endDate" selectedDate={endDate} onChange={(date) => onDatePickerChange('endDate', date)} /></Col>
                <Col sm={3}></Col>
                <Col sm={3}>
                    <Container className="d-flex justify-content-end">
                        <SalesAddButton onClick={() => { setShowAddSales(true) }} />
                    </Container>
                </Col>
            </Row>
            <SalesList
                sales={sales}
            />
            {showAddSales &&
                <SalesAddModal show={showAddSales} onCancel={() => setShowAddSales(false)} refreshSales={refreshSales} />
            }
        </Container>
    );
}