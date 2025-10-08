import Header from "./components/Header.tsx";
import ProductPage from "./pages/product/ProductPage.tsx";
import {Route, Routes} from "react-router-dom";
import SalesPage from "./pages/sales/SalesPage.tsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<div className="p-4">Welcome to Miserere!</div>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/sales" element={<SalesPage/>}/>
                <Route path="/extras" element={<div className="p-4">Tambahan page</div>}/>
            </Routes>
        </>
    );
}

export default App;