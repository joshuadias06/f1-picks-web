import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./index.css";
import Picks from "./pages/Picks/Picks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Circuits from "./pages/Circuits/Circuits";
import Drivers from "./pages/Drivers/Drivers";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark text-ice">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/picks" element={<Picks />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/circuits" element={<Circuits />} />
          <Route path="/drivers" element={<Drivers />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
