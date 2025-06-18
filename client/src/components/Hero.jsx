import React from "react"
import { assets, moroccainCities } from "../assets/assets"
import Video from "../assets/intro.mp4"
export default function Hero(){
    return(
        <section>
        <video src={Video} className="w-full h-screen object-cover z-10" autoPlay loop muted  />
        <div className='absolute top-0 xl:top-0 flex flex-col items-start px-6 md:px-16 lg:px-24 xl:px-32 justify-end md:justify-center h-screen w-full text-white  bg-no-repeat bg-center bg-cover'>
        
        <p className="text-[14px] md:text-[1rem] font-bold px-3.5 py-1 rounded-full mt-8 border-2 border-amber-500 "><span className="text-amber-500 font-bold">The  Ultimate Stay</span>: Hotels, Villas, Riads & More Await</p>
        <h1 className="font-playfair leading-8 text-2xl md:text-5xl mt-2 font-bold md:font-extrabold max-w-xl md:leading-[56px]">Find Your <span className="text-amber-500">Perfect Stay</span> — From <span className="text-blue-100 ">Riads</span> to <span className="text-blue-100">Villas</span> and <span className="text-blue-100">Beyond</span></h1>
        <p className="max-w-130 mt-2 text-sm md:text-base xl:text-7 ">Experience comfort and charm in handpicked hotels, riads, and villas — start your journey today.
        </p>
        <form className='bg-white text-gray-500 mt-3 md:mt-8 rounded-lg px-5 py-3 md:px-6 md:py-4 gap-3  flex flex-col md:flex-row md:flex-wrap max-md:items-start md:gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calender icon" className="h-4" />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                    {moroccainCities.map((city,index)=>(<option key={index} value={city.name}/>))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calender icon" className="h-4" />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  shadow-sm" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calender icon" className="h-4" />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                <img src={assets.searchIcon} alt="search icon" className="h-7" />
                <span>Search</span>
            </button>
        </form>
        </div>
        </section>
    )
}