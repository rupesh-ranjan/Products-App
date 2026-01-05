import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>Product</>} />
                <Route path="/products/:id" element={<>Prdoct Details</>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
