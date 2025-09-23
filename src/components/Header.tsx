import {Nav, Navbar} from "react-bootstrap";

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
            <Navbar.Brand href="/">Miserere</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar"/>
            <Nav className="ms-auto">
                <Nav.Link href="/products">Produk</Nav.Link>
                <Nav.Link href="/sales">Penjualan</Nav.Link>
                <Nav.Link href="/extras">Tambahan</Nav.Link>
            </Nav>
        </Navbar>
    );
}