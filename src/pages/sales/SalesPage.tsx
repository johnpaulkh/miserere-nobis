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

    const loadSales = useCallback(async () => {
        try {
            const fetchedSales = await fetchSales();
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
    }, []);

    useEffect(() => {
        loadSales().then();
    }, [loadSales]);

    return {sales, isLoading, error, setSales, refreshSales: loadSales};
};

export default function SalesPage() {
    const {sales, isLoading, error, refreshSales} = useFetchSales();
    const [showAddSales, setShowAddSales] = useState(false);
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())

    if (isLoading) {
        return <Container className="py-4"><p>Memuat sales...</p></Container>;
    }

    if (error) {
        return <Container className="py-4"><p className="text-danger">{error}</p></Container>;
    }

    return (
        <Container className="py-4">
            <Row>
                <Col sm={10}>
                    <h2 className="mb-3">Daftar Sales</h2>
                </Col>
            </Row>
            <Row className="py-4">
                <Col sm={3}>Dari <DefaultDatePicker selectedDate={startDate} onChange={(date) => setStartDate(date)} /></Col>
                <Col sm={3}>Sampai <DefaultDatePicker selectedDate={endDate} onChange={(date) => setEndDate(date)} /></Col>
                <Col sm={3}></Col>
                <Col sm={3}>
                    <Container>
                        <SalesAddButton onClick={() => { setShowAddSales(true) }} />
                    </Container>
                </Col>
            </Row>
            <SalesList
                sales={sales}
                refreshSales={refreshSales}
            />
            {showAddSales &&
                <SalesAddModal show={showAddSales} onCancel={() => setShowAddSales(false)} refreshSales={refreshSales} />
            }
        </Container>
    );
}