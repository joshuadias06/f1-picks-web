import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./index.css"; // contém Tailwind + fontes F1

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark text-ice">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
