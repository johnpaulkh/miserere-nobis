import {Button, Modal} from "react-bootstrap";

type SalesAddModalProps = {
    show: boolean,
    onCancel: () => void,
    refreshSales: () => void,
}

export default function SalesAddModal({show, onCancel, refreshSales}: SalesAddModalProps) {

    const handleSubmit = () => {
        refreshSales();
        onCancel();
    }

    const handleCancel = () => {
        onCancel()
    }

    return (
        <Modal show={show} onHide={handleCancel} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Penjualan Baru</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={handleSubmit}>Simpan</Button>
            </Modal.Body>
        </Modal>
    )
}