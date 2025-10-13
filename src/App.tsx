import Header from "./components/Header.tsx";
import ProductPage from "./pages/product/ProductPage.tsx";
import {Route, Routes} from "react-router-dom";
import SalesPage from "./pages/sales/SalesPage.tsx";
import DashBoardPage from "./pages/dashboard/DashBoardPage.tsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<DashBoardPage/>}/>
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/sales" element={<SalesPage/>}/>
            </Routes>
        </>
    );
}

export default App;