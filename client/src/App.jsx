
import Home from "./pages/Home"
import AllRooms from "./pages/AllRooms"
import RoomDetails from "./pages/RoomDetails"
import MyBookings from "./pages/MyBookings"
import SearchByCity from "./pages/searchByCity"
import SearchByTypeProperty from "./pages/SearchByTypeProperty"
import { Route, Routes,useLocation } from "react-router-dom"
import AllRiadRooms from "./pages/AllRiadRooms"
function App(){
const isOwnerPath=useLocation().pathname.includes("owner");
return (
<>

<div className="min-h-[70vh]">
<Routes>
    
    <Route path="/" element={<Home/>} />
   <Route path="/rooms/:id" element={<AllRooms/>} /> 
   <Route path="/room/:id" element={<RoomDetails/>}/>
   <Route path="/SearchByCity/:city" element={<SearchByCity/>}/>
   <Route path="/SearchByTypeProperty/:type" element={<SearchByTypeProperty/>}/>
   <Route path="/riad/rooms/:id" element={<AllRiadRooms/>} />
   <Route path="/my-bookings" element={<MyBookings/>} />
</Routes>
</div>
</>
)
}
export default App