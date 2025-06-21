import React, { useState,useEffect } from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Title from "../components/title"

import { useNavigate, useParams } from "react-router-dom"
import RoomCard from "../components/RoomCard"
import { HiLocationMarker, HiOutlineHome, HiOutlineStar } from "react-icons/hi"

const RiadDetails=()=>{
    
    const navigate=useNavigate()
    const {id}=useParams()
    const [riadData,setRiadData]=useState([])
    const [allRooms,setAllRooms]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const getImageUrl = (imageName) => `https://localhost:7263/images/${imageName}`;
    
    useEffect(()=>{
        fetch(`https://localhost:7263/api/riad/${id}`).then(res=>{if((!res.ok)){
            throw new Error("Failed to fetch riad data")
        }
        return res.json();}).then(data=>{setRiadData(data);
            setAllRooms(data.rooms);
            if (data.photos && data.photos.length > 0) {
              setMainImage(getImageUrl(data.photos[0]));
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
            <p className="mt-4 text-gray-600">Loading riad information...</p>
          </div>
        );
    }

    if (error) {
        return (
          <div className="flex flex-col items-center justify-center h-screen text-red-500 p-4">
            <HiOutlineHome className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-xl font-semibold text-center">Error loading riad</p>
            <p className="text-center mt-2">{error}</p>
          </div>
        );
    }
    
    return(
        <>
            <NavBar />
            <div className="flex flex-col-reverse lg:flex-row items-start justify-between
                py-18 md:py-25 px-4 md:px-16 lg:px-24 "> 
                
                {/* This wrapper div matches the hotel page structure */}
                <div>
                
                    {/* Riad Information Section */}
                    <div className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
                        {/* Riad Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {riadData.name}
                            </h1>
                  
                            <div className="flex flex-wrap items-center gap-4 mt-3">
                                {riadData.starRating > 0 && (
                                    <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <HiOutlineStar 
                                                    key={i}
                                                    className={`w-5 h-5 ${i < riadData.starRating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                                />
                                            ))}
                                        </div>
                                        <p className="font-medium text-gray-700">
                                            {riadData.starRating}-star Riad
                                        </p>
                                    </div>
                                )}
                    
                                <div className="flex items-center gap-2 font-bold text-purple-950/95 ">
                                    <HiLocationMarker className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm md:text-base">
                                        {riadData.address.street}, {riadData.address.city}, 
                                        {riadData.address.stateOrProvince && ` ${riadData.address.stateOrProvince},`}
                                        {riadData.address.postalCode && ` ${riadData.address.postalCode},`} 
                                        {riadData.address.country}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Riad Gallery */}
                        <div className="flex flex-col lg:flex-row gap-6 mb-10">
                            <div className="lg:w-1/2">
                                <img 
                                    src={mainImage} 
                                    alt={`${riadData.name} main view`} 
                                    className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
                                />
                            </div>
                          
                            <div className="grid grid-cols-2 gap-4 lg:w-1/2">
                                {riadData.photos.slice(0, 5).map((photo, index) => (
                                    <img
                                        key={index}
                                        alt={`${riadData.name} view ${index + 1}`}
                                        src={getImageUrl(photo)}
                                        className={`w-full h-40 md:h-48 object-cover rounded-lg cursor-pointer transition-all ${
                                            mainImage === getImageUrl(photo) 
                                            ? 'ring-4 ring-blue-500' 
                                            : 'hover:opacity-90'
                                        }`}
                                        onClick={() => setMainImage(getImageUrl(photo))}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                            {riadData.photos.length > 5 && (riadData.photos.slice(5).map((photo, index) => (
                                <img
                                    key={index}
                                    src={getImageUrl(photo)}
                                    alt={`Riad view ${index + 1}`}
                                    className={`w-full h-40 md:h-48 object-cover rounded-lg cursor-pointer transition-all ${
                                        mainImage === getImageUrl(photo) 
                                        ? 'ring-4 ring-blue-500' 
                                        : 'hover:opacity-90'
                                    }`}
                                    onClick={() => setMainImage(getImageUrl(photo))}
                                />
                            )))}
                        </div>

                        {/* Riad Description */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {riadData.name}</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {riadData.description}
                            </p>
                        </div>

                        {/* Riad Amenities */}
                        {/*.Amenities.length>0 &&<div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Riad Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {riadData.Amenities?.map((amenity, index) => (
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
                        </div>*/}
                    </div>

                    {/* Rooms Section */}
                    {allRooms.length > 0 && (
                        <>
                            <Title title="Rooms" align="left" />
                            <div className="mb-8 xl:p-6">
                                {allRooms.map((room) => (
                                    <RoomCard hotelData={riadData} room={room} key={room.id} />
                                ))}
                            </div>
                        </>
                    )}

                </div>   {/* This is the closing tag for the main content wrapper */}
            </div> {/* This is the closing tag for the main flex container */}
                
            <Footer />
        </>
    )
}
export default RiadDetails;