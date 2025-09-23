import Header from "./components/Header.tsx";
import ProductList from "./pages/product/ProductList";
import {Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";

function App() {
    return (
        <Container>
            <Header/>
            <Routes>
                <Route path="/" element={<div className="p-4">Welcome to Miserere!</div>}/>
                <Route path="/products" element={<ProductList/>}/>
                <Route path="/sales" element={<div className="p-4">Penjualan page</div>}/>
                <Route path="/extras" element={<div className="p-4">Tambahan page</div>}/>
            </Routes>
        </Container>
    );
}

export default App;