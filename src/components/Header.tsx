import {Container, Nav, Navbar} from "react-bootstrap";

export default function Header() {
    return (
        <Navbar style={{backgroundColor : "#563d7c"}} variant="dark" expand="lg" className="px-5">
            <Container>
                <Navbar.Brand href="/">Miserere</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Nav className="ms-auto">
                    <Nav.Link href="/products">Produk</Nav.Link>
                    <Nav.Link href="/sales">Penjualan</Nav.Link>
                    <Nav.Link href="/extras">Tambahan</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}