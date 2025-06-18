import React from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Title from "../components/title"
import { assets, facilityIcons, hotelDummyData } from "../assets/assets"
import StarRating from "../components/StarRating"
import { useNavigate, useParams } from "react-router-dom"
const CheckBox=({label,selected,onChange=()=>{}})=>{
return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
        <input type="checkbox" checked={selected} onChange={(e)=>(onChange.target.checked,label)} />
        <span className="font-light select-none">{label}</span>
    </label>
)
}
const RadioButton=({label,selected,name,onChange=()=>{}})=>{
return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
        <input type="radio" name={name} checked={selected} onChange={()=>(onChange)} />
        <span className="font-light select-none">{label}</span>

    </label>
)
}
const AllRooms=()=>{
    const [displayFilters,setDisplayFilters]=React.useState(false)
    const roomTypes=["Single Bed","Double Bed","Luxury Room","Family Suite"]
    const priceRanges=["0 to 500","500 to 1000","1000 to 2000","2000 to 3000","+3000"]
    const sortOptions=["Price Low to High","Price High to Low","Newest First"]
    const navigate=useNavigate()
    const {id}=useParams()
    const hotel =hotelDummyData.find(hotel=>hotel._id===id)
    const allRooms=hotel.rooms
    return(
<>
    <NavBar />
    <div className="flex flex-col-reverse  lg:flex-row items-start justify-between
        py-28 md:py-35 px-4 md:px-16 lg:px-24 "> 
        <div>
        <div className="max-w-174 md:w-full">
        <Title title={`${hotel.name} Hotel Rooms `}
            subTitle="Take advantage of our limited-time offers and special packages to 
            enhance your stay and create unforgettable memories" 
            align="left"/>
        </div>
        
        {allRooms.map((room)=>(
            <div key={room._id} className="flex flex-col md:flex-row items-start py-10 
            gap-6 border-b border-gray-300 last:border-0">
                <img onClick={()=>{navigate(`/room/${room._id}`)}}
                src={room.images[0]} alt="room image" title="View room details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer" />
                <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{hotel.city}</p>
                <p className="text-gray-800 text-3xl font-playfair cursor-pointer" 
                onClick={()=>{navigate(`/room/${room._id}`)}}>{hotel.name} </p>
                <div>

                    <StarRating rating={room.rating}/>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                    <img src={assets.locationIcon} alt="location icon" />
                    <span>{hotel.address}</span>
                </div>
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                    {room.amenities.map((item,index)=>
                    (
                        <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                            <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                            <p className="text-xs" >{item}</p>
                        </div>
                    ))}
                </div>
                {/* Room Price per Night */}
                <p className="text-xl font-medium text-gray-700">{room.pricePerNight}$ /Night</p>
                </div>
            </div>  
            

        ))} 
        </div>   
        <div className=" bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
            <div className={`px-8 py-2 flex justify-between items-center min-lg:border-b border-gray-300 ${displayFilters && "border-b"} `}>
                <p className="text-base font-medium text-gray-800">Filters</p>
                <div className="text-xs cursor-pointer hover:scale-110">
                    <button className="lg:hidden" onClick={()=>{setDisplayFilters(prev=>!prev)}}>
                       {displayFilters?"Hide":"show"}</button>
                    <button className="hidden lg:block">Clear </button>
                </div>
            </div>
            {<div className={`${displayFilters?"block":"hidden md:block"} transition-all duration-700 `}>
                <div className="px-5 py-5">
                    <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
                    {roomTypes.map((room,index)=>(
                        <CheckBox key={index} label={room} />
                    ))}
                </div>
                <div className="px-5 py-5">
                    <p className="font-medium text-gray-800 pb-2">Price Range</p>
                    {priceRanges.map((range,index)=>(
                        <RadioButton key={index} name="sortRanges" label={`${range} DH`} />
                    ))}
                </div>
                <div className="px-5 py-5">
                    <p className="font-medium text-gray-800 pb-2">Sort By</p>
                    {sortOptions.map((option,index)=>(
                        <RadioButton key={index} name="sortOption" label={option} />
                    ))}
                </div>
            </div>}
        </div>
    </div>
        
    <Footer />
</>
    )
}
export default AllRooms