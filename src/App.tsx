import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./index.css";
import Picks from "./pages/Picks/Picks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Circuits from "./pages/Circuits/Circuits";
import Drivers from "./pages/Drivers/Drivers";
import Teams from "./pages/Teams/Teams";
import Calendar from "./pages/Calendar/Calendar";
import DriverDetails from "./pages/DriversDetails/DriverDetails";
import RaceDetails from "./pages/RaceDetails/RaceDetails";

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
          <Route path="/teams" element={<Teams />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/driver/:id" element={<DriverDetails />} />
          <Route path="/race/:id" element={<RaceDetails />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
