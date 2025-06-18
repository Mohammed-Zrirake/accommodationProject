import React from 'react'
import { hotelDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './title'
const FeaturedDestination=()=>{
    const [viewAll,SetViewAll]=React.useState(false)
    return(
        
        <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'> 
        <Title title="Featured destination" 
        subTitle="Discover our handpicked selection of exceptional properties around the world ; 
        offering unparalleled luxury and unforgettable experiences."
        
        /> 
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAll?
                hotelDummyData.map((hotel,index)=><HotelCard key={hotel._id} hotel={hotel} index={index} />)
                :
                hotelDummyData.slice(0,3).map((hotel,index)=><HotelCard key={hotel._id} hotel={hotel} index={index} />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAll(prev=>!prev)}}>
            {viewAll?"Show Less":"View All Destinations"}
            </button>
        </div>
    )
}
export default FeaturedDestination