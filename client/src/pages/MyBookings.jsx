import { useState } from "react"
import NavBar from "../components/NavBar"
import Title from "../components/title"
import Footer from "../components/Footer"
import { assets, userBookingsDummyData } from "../assets/assets"

const MyBookings=()=>{
    const [bookings,setBookings]=useState(userBookingsDummyData)
    return (
        <>
        <NavBar />
        <div className="py-28 md:pb-35 md:pt-24 px-4 md:px-16 lg:px-24 xl:px-28">
            <Title title="My Bookings"
            subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips
            seamlessly with just a few clicks" 
            align="left"
            />
            <div className="max-w-6xl mt-8 text-gray-800">
                <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300
                font-medium text-base py-3">
                    <div className="w-1/3">Hotels</div>
                    <div className="w-1/3">Date & Timings</div>
                    <div className="w-1/3">Payment</div>
                </div>
                {
                    bookings.map((booking)=>(
                        <div key={booking._id} className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full
                        border-b border-gray-300 py-6 gap-6 first:border-t">
                            {/* Hotel Details */}
                            <div className="flex flex-col md:flex-row ">
                                <img src={booking.room.images[0]} alt="room image" 
                                className="min-md:w-44 rounded shadow object-cover" />
                                <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                                    <p className="font-playfair text-2xl">
                                        {booking.hotel.name} <span className="font-inter text-sm"> ({booking.room.roomType}) </span>
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <img src={assets.locationIcon} alt="location icon" />
                                        <span>{booking.hotel.address} </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <img src={assets.guestsIcon} alt="location icon" />
                                        <span>{booking.guests} </span>
                                    </div>
                                    <p className="text-base">Total : {booking.totalPrice} DH </p>
                                </div>
                            </div>
                            {/* Date & Timings */}
                            <div className="flex md:items-start md:gap-12 mt-3 gap-8">
                                <div>
                                    <p>Check-In: </p>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(booking.checkInDate).toDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p>Check-Out: </p>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(booking.checkOutDate).toDateString()}
                                    </p>
                                </div>
                            </div>
                            {/*Payment & status */}
                            <div className="flex justify-around items-center md:items-baseline md:flex-col md:justify-center pt-3">
                                <div className="flex items-center gap-2">
                                    <div className={`h-3 w-3 rounded-full ${booking.isPaid?"bg-green-500":"bg-red-500"}`}>

                                    </div>
                                    <p className={` text-base ${booking.isPaid?"text-green-500":"text-red-500"}`}>
                                        {booking.isPaid ? "Paid":"Unpaid"}
                                    </p>
                                </div>
                                {
                                !booking.isPaid && (<button className="bg-gray-50 font-bold text-gray-800 w-1/2 px-4 py-1.5 md:mt-4 text-xs border border-gray-400
                                rounded-full hover:bg-amber-500 hover:text-white hover:scale-110 transition-all cursor-pointer">
                                    Pay Now</button>)
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <Footer />
        
        </>
    )
}
export default MyBookings