import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Rooms from "./pages/Rooms"
import Reservations from "./pages/Reservations"
import Clients from "./pages/Clients"
import Payments from "./pages/Payments"
import NotFound from "./pages/NotFound"


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chambres" element={<Rooms />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/paiements" element={<Payments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
