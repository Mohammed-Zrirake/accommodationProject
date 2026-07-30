
import Home from "./pages/Home"
import RoomDetails from "./pages/RoomDetails"
import VillaDetails from "./pages/VillaDetails"
import MyBookings from "./pages/MyBookings"
import SearchByCity from "./pages/searchByCity"
import SearchByTypeProperty from "./pages/SearchByTypeProperty"
import { Route, Routes,useLocation } from "react-router-dom"
import {RedirectToSignIn,Show} from "@clerk/react"
import RiadDetails from "./pages/RiadDetails"
import AppartmentDetails from "./pages/AppartmentDetails"
import HotelDetails from "./pages/HotelDetails"
import HostelDetails from "./pages/HostelDetails"
import DormDetails from "./pages/DormDetails"
import CottageDetails from "./pages/CottageDetails"
import RoleSignUp from "./components/RoleSignUp"
import RoleRoute from "./components/RoleRoute"
import OwnerProperties from "./pages/OwnerProperties"
import OwnerAddProperty from "./pages/OwnerAddProperty"
function App(){

return (
<>

<div className="min-h-[70vh]">
<Routes>
    
    <Route path="/" element={<Home/>} />
    <Route path="/sign-up" element={<RoleSignUp />} />
    <Route path="/owner/properties" element={<RoleRoute roles={["owner", "admin"]}><OwnerProperties /></RoleRoute>} />
    <Route path="/owner/properties/add" element={<RoleRoute roles={["owner", "admin"]}><OwnerAddProperty /></RoleRoute>} />
   <Route path="/hotelDetails/:id" element={<HotelDetails/>} /> 
   <Route path="/roomDetails/:id" element={<RoomDetails/>}/>
   <Route path="/dormDetails/:id" element={<DormDetails/>}/>
   <Route path="/SearchByCity/:city" element={<SearchByCity/>}/>
   <Route path="/SearchByTypeProperty/:type" element={<SearchByTypeProperty/>}/>
   <Route path="/riadDetails/:id" element={<RiadDetails/>} />
   <Route path="/appartmentDetails/:id" element={<AppartmentDetails/>} />
  <Route path="/villaDetails/:id" element={<VillaDetails/>} />
  <Route path="/cottageDetails/:id" element={<CottageDetails/>} />
   <Route path="/hostelDetails/:id" element={<HostelDetails/>} />
   <Route path="/my-bookings" element={
    <>
    
    <Show when="signed-in">
        <MyBookings />
    </Show>
    <Show when="signed-out">
        <RedirectToSignIn />
    </Show>
    
    </>

    
    } />
</Routes>
</div>
</>
)
}
export default App
