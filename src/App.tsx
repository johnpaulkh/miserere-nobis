import Header from "./components/Header.tsx";
import ProductPage from "./pages/product/ProductPage.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<div className="p-4">Welcome to Miserere!</div>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/sales" element={<div className="p-4">Penjualan page</div>}/>
                <Route path="/extras" element={<div className="p-4">Tambahan page</div>}/>
            </Routes>
        </>
    );
}

export default App;