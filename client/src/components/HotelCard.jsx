import React from "react"
import { Link } from "react-router-dom"
import { assets } from "../assets/assets"
const HotelCard=({hotel})=>{
    return (
        <Link to={'/rooms/'+hotel.id} onClick={()=>scrollTo(0,0)} key={hotel.id} className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 
            shadow-[0px_4px_4px_tgba(0,0,0,0.05)]">
            <img src={`https://localhost:7263/images/${hotel.photos[0]}`} alt={`${hotel.name} image`} 
            
            />
            <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium 
            rounded-full">Best Seller</p>
            <div className="flex items-center flex-col justify-between p-4 pt-5 ">
                
                <div className="flex justify-center items-center gap-2">
                <p className="font-playfair text-xl font-medium text-gray-800">{hotel.name}</p>
                <div className="flex items-center gap-1">
                    <img src={assets.starIconFilled} alt="star icon"  /> <p>4.5</p>
                </div></div>
                <div className="flex items-center gap-1 text-sm">
                <img src={assets.locationIcon} alt="location icon"  /> 
                <span>{hotel.address.street},{hotel.address.city},{hotel.address.stateOrProvince? hotel.address.stateOrProvince : ''}
                    ,{hotel.address.postalCode},{hotel.address.country}
                </span>
                </div>
                <div className="flex items-center justify-between mt-4 gap-4">
                    {/*<p><span className="text-xl text-gray-800">{props.room.pricePerNight}</span>/night</p>*/}
                    <button className="px-4 py-2 text-sm font-medium border border-gray-300
                    rounded hover:bg-gray-50 transition-all cursor-pointer hover:text-amber-400
                    ">See all available rooms now</button>
                </div>
            </div>
        </Link>
    )
}
export default HotelCard