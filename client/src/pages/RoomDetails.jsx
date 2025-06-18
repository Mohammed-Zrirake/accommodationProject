import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets"
import StarRating from "../components/StarRating"
import NavBar from "../components/NavBar"

const RoomDetails=()=>{
    const {id}=useParams()
    const [room,setRoom]=useState(null)
    const [mainImage,setMailImage]=useState(null)

    useEffect(()=>{
        const room = roomsDummyData.find(room=>room._id===id)
        if(room){
            setRoom(room)
            if(room.images && room.images.length>0){
                setMailImage(room.images[0])
            }
            else{
                setMailImage(null)
            }
        }
        else{
            setRoom(null);
            setMailImage(null);
        }
        room && setMailImage(room.images[0])
    },[])
    if(room)
    {return (
<>
    
    <NavBar />    
    
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 ">
         <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-playfair">{room.hotel[0].name} 
                <span className="font-inter text-sm" >({room.roomType}) </span> </h1>
        </div>
        <div className="flex items-center gap-2">
            <p className="mt-4 font-serif text-gray-700">{`${room.rating}/5`}</p>
            <StarRating rating={room.rating} />
            
        </div>
        {/*room address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location icon" />
        <p>{room.hotel[0].address}</p>
        </div>
        {/* room images*/}
        <div className="flex flex-col lg:flex-row mt-6 gap-6 ">
            <div className="lg:w-1/2 w-full">
                <img src={mainImage} alt="Room image" className="w-full rounded-xl shadow-lg object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                {room?.images.length>1 && room.images.map((image,index)=>{
                    return(
                        <img onClick={()=>{setMailImage(image)}}
                        key={index} src={image} alt="Room image" className={`w-full rounded-xl shadow-md 
                            object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} />
                    )
                    
                })}
            </div>
        </div>
        {/*Room Highlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-playfair">
                    Experience Luxury Like Never Before
                </h1>
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                    {
                        room.amenities.map((item,index)=>{
                            return (
                                <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                                    <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                                    <p className="text-xs">
                                    {item}
                                    </p>
                                </div>
                                
                            )
                        })
                    }
                </div>
            </div>
            {/* Room Price */}
            <p className="text-2xl font-medium">{room.pricePerNight * 10} DH /night</p>
        </div>
        {/* CheckIn CheckOut Form */}
        <form className="flex flex-col md:flex-row items-start md:items-center justify-between 
        bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
            <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 
            md:gap-10 text-gray-500">
                <div className="flex flex-col ">
                    <label htmlFor="checkInDate" className="font-medium text-gray-800">Check In </label>
                    <input type="date" id="checkInDate" placeholder="check In" 
                    className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="checkOutDate" className="font-medium text-gray-800">Check Out </label>
                    <input type="date" id="checkOutDate" placeholder="check Out" 
                    className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="guests" className="font-medium text-gray-800">Guests </label>
                    <input type="number" id="guests" placeholder="check Out" 
                    className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                </div>
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-dull active:scale-95 
            transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25
            py-3 md:py-4 text-base cursor-pointer" >Book Now</button>
        </form>
        <div className="mt-25 space-y-4">
            {
                roomCommonData.map((spec,index)=>(
                    <div key={index} className="flex items-start gap-2" >
                        <img src={spec.icon} alt={`${spec.title} icon`} className="w-6.5" />
                        <div>
                            <p className="text-base">{spec.title}</p>
                            <p className="text-gray-500">{spec.description} </p>
                        </div>    
                    </div>    
                ))
            }
        </div>
        <div className="max-w-6xl border-y border-gray-300 my-15 py-10 text-gray-500">
            <p>Guests will be allocated on the ground floor according to availability.
                You get a comfortable Two bedroom apartment has a true city feeling. The 
                price quoted is for two guests, at the guests slot please mark the number of 
                guests to get the exact price for groups. The Guests will be allocated ground 
                floor according to availability. You get the comfortable two bedroom 
                apartment has a true city feeling.
            </p>
        </div>
        {/* Hosted by */}
        <div className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
                <img src={room.images[0]} alt="Host" className="h-14 w-14 md:h-18 rounded-full" />
                <div>
                    <p>Hosted by {room.hotel[0].owner.username}</p>
                    <div className="flex gap-2">
                        <p className="mt-4 font-serif text-gray-700">{`${room.hotel[0].owner.rating}/5`}</p>
                        <StarRating rating={room.hotel[0].owner.rating} />
                        
                    </div>
                    
                </div>
            </div>
            <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary 
            hover:bg-blue-400 transition-all cursor-pointer">Contact Now</button>
        </div>
    </div>
</>        
    )}
}
export default RoomDetails