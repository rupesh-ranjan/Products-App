import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Products />} />

                <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
