import React, { useState,useEffect } from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Title from "../components/title"
import { assets, facilityIcons, hotelDummyData } from "../assets/assets"
import StarRating from "../components/StarRating"
import { useNavigate, useParams } from "react-router-dom"
import Filters from "../components/Filters"
import RoomCard from "../components/RoomCard"
import { 
  HiLocationMarker, 
  HiOutlineStar,
  HiOutlineWifi,
 
  HiOutlineClock,
  HiOutlineHome
} from "react-icons/hi";
import DormCard from "../components/DormCard"


const HostelDetails=()=>{
    
    const navigate=useNavigate()
    const {id}=useParams()
    const [hostelData,setHostelData]=useState([])
    const [allRooms,setAllRooms]=useState([])
    const [allDorms,setAllDorms]=useState([])
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainHostelImage, setMainHostelImage] = useState("");
    const getImageUrl = (imageName) => `https://localhost:7263/images/${imageName}`;
    useEffect(()=>{
        fetch(`https://localhost:7263/api/hostel/${id}`).then(res=>{if((!res.ok)){
            throw new Error("Failed to fetch hostel data")
        }
        return res.json();}).then(data=>{setHostelData(data);
            setAllRooms(data.privateRooms );
            setAllDorms(data.dorms );
            if (data.photos && data.photos.length > 0) {
          setMainHostelImage(getImageUrl(data.photos[0]));
        }
            setLoading(false);
        }).catch(error=>
            {console.error("Fetch error:", error);
        setError(error.message);
        setLoading(false);})},[id])

    if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading hostel information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 p-4">
        <HiOutlineHome className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-xl font-semibold text-center">Error loading hostel</p>
        <p className="text-center mt-2">{error}</p>
      </div>
    );
  }
    const commonAmenities = [
    { 
      icon: <HiOutlineWifi className="w-5 h-5" />, 
      name: "Free WiFi" 
    },
    
    
    { 
      icon: <HiOutlineClock className="w-5 h-5" />, 
      name: "24-Hour Front Desk" 
    }
  ];
    return(
<>
    <NavBar />
    <div className="flex flex-col-reverse  lg:flex-row items-start justify-between
        py-18 md:py-25 px-4 md:px-16 lg:px-24 "> 
        <div>
        
        {/* Hostel Information Section */}
      <div className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Hostel Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {hostelData.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {hostelData.starRating > 0 && (
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <HiOutlineStar 
                      key={i}
                      className={`w-5 h-5 ${i < hostelData.starRating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="font-medium text-gray-700">
                  {hostelData.starRating}-star hostel
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-2 font-bold text-purple-950/95 ">
              <HiLocationMarker className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm md:text-base">
                {hostelData.address.street}, {hostelData.address.city}, 
                {hostelData.address.stateOrProvince && ` ${hostelData.address.stateOrProvince},`}
                {hostelData.address.postalCode && ` ${hostelData.address.postalCode},`} 
                {hostelData.address.country}
              </p>
            </div>
          </div>
        </div>

        {/* Hostel Gallery */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="lg:w-1/2">
            <img 
              src={mainHostelImage} 
              alt={`${hostelData.name} main view`} 
              className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:w-1/2">
            {hostelData.photos.slice(0, 4).map((photo, index) => (
              <img
                key={index}
                src={getImageUrl(photo)}
                alt={`${hostelData.name} view ${index + 1}`}
                className={`w-full h-40 md:h-48 object-cover rounded-lg cursor-pointer transition-all ${
                  mainHostelImage === getImageUrl(photo) 
                    ? 'ring-4 ring-blue-500' 
                    : 'hover:opacity-90'
                }`}
                onClick={() => setMainHostelImage(getImageUrl(photo))}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {hostelData.photos.length > 4? (hostelData.photos.slice(5).map((photo, index) => (
              <img
                key={index}
                src={getImageUrl(photo)}
                alt={`hotel view ${index + 1}`}
                className={`w-full h-40 md:h-48 object-cover rounded-lg cursor-pointer transition-all ${
                  mainImage === getImageUrl(photo) 
                    ? 'ring-4 ring-blue-500' 
                    : 'hover:opacity-90'
                }`}
                onClick={() => setMainImage(getImageUrl(photo))}
              />
            ))):null}
          </div>

        {/* Hostel Description */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {hostelData.name}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {hostelData.description}
          </p>
        </div>

        {/* Hostel Amenities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {commonAmenities.map((amenity, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="text-blue-600">{amenity.icon}</div>
                <p className="text-gray-800">{amenity.name}</p>
              </div>
            ))}
            {hostelData.amenities?.map((amenity, index) => (
              <div 
                key={`custom-${index}`} 
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="text-blue-600">
                  <HiOutlineHome className="w-5 h-5" />
                </div>
                <p className="text-gray-800">{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {allRooms.length>0 && <><Title title="Rooms" align="left" />
        <div  className="mb-8 xl:p-6">
        {allRooms?.map((room)=>(
            
            
            <RoomCard key={room.id} hotelData={hostelData} room={room}/>
                    
        ))} </div></>}
        {allDorms.length>0 && <>
        <Title title="Dorms" align="left" />
        <div  className="mb-8 xl:p-6">
        {allDorms?.map((dorm)=>(
            
            
            <DormCard dorm={dorm} hostelData={hostelData} />
                    
        ))} </div></>}
        </div>   
        
        
    </div>
        
    <Footer />
</>
    )
}
export default HostelDetails