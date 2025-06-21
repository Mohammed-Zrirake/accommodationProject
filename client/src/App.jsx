
import Home from "./pages/Home"
import RoomDetails from "./pages/RoomDetails"
import VillaDetails from "./pages/VillaDetails"
import MyBookings from "./pages/MyBookings"
import SearchByCity from "./pages/searchByCity"
import SearchByTypeProperty from "./pages/SearchByTypeProperty"
import { Route, Routes,useLocation } from "react-router-dom"
import RiadDetails from "./pages/RiadDetails"
import AppartmentDetails from "./pages/AppartmentDetails"
import HotelDetails from "./pages/HotelDetails"
import HostelDetails from "./pages/HostelDetails"
import DormDetails from "./pages/DormDetails"
function App(){
const isOwnerPath=useLocation().pathname.includes("owner");
return (
<>

<div className="min-h-[70vh]">
<Routes>
    
    <Route path="/" element={<Home/>} />
   <Route path="/hotelDetails/:id" element={<HotelDetails/>} /> 
   <Route path="/roomDetails/:id" element={<RoomDetails/>}/>
   <Route path="/dormDetails/:id" element={<DormDetails/>}/>
   <Route path="/SearchByCity/:city" element={<SearchByCity/>}/>
   <Route path="/SearchByTypeProperty/:type" element={<SearchByTypeProperty/>}/>
   <Route path="/riadDetails/:id" element={<RiadDetails/>} />
   <Route path="/appartmentDetails/:id" element={<AppartmentDetails/>} />
  <Route path="/villaDetails/:id" element={<VillaDetails/>} />
   <Route path="/hostelDetails/:id" element={<HostelDetails/>} />
   <Route path="/my-bookings" element={<MyBookings/>} />
</Routes>
</div>
</>
)
}
export default App