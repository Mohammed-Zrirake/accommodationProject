import {useState,useEffect} from 'react'
import { hotelDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './title'
import HostelCard from './HostelCard'
import PropertyCard from './PropertyCard'
const FeaturedDestination=()=>{
    const [viewAll,SetViewAll]=useState(false)
    const [hotelData, setHotelData] = useState([]);
    const [hostelData, setHostelData] = useState([]);
    const [riadData, setRiadData] = useState([]);
    const [appartementData, setAppartementData] = useState([]);
    const [cottageData, setCottageData] = useState([]);
    const [villaData, setVillaData] = useState([]);
    useEffect(()=>{
        fetch('https://localhost:7263/api/hotel').then
        (res=>{if(!res.ok){
            throw new Error("Failed to fetch hotel data")
        }
        return res.json();
    }).then(data=>{setHotelData(data)
        console.log(data)}).catch(error=>
            {console.error("There was a problem with the fetch operation:", error)})},[])
            useEffect(()=>{
        fetch('https://localhost:7263/api/hostel').then
        (res=>{if(!res.ok){
            throw new Error("Failed to fetch hotel data")
        }
        return res.json();
    }).then(data=>{setHostelData(data)
        console.log(data)}).catch(error=>
            {console.error("There was a problem with the fetch operation:", error)})},[]);
            useEffect(()=>{
        fetch('https://localhost:7263/api/riad').then
        (res=>{if(!res.ok){
            throw new Error("Failed to fetch hotel data")
        }
        return res.json();
    }).then(data=>{setRiadData(data)
        console.log(data)}).catch(error=>
            {console.error("There was a problem with the fetch operation:", error)})},[]);
            useEffect(()=>{
        fetch('https://localhost:7263/api/villa').then
        (res=>{if(!res.ok){
            throw new Error("Failed to fetch hotel data")
        }
        return res.json();
    }).then(data=>{setVillaData(data)
        console.log(data)}).catch(error=>
            {console.error("There was a problem with the fetch operation:", error)})},[]);
            useEffect(()=>{
        fetch('https://localhost:7263/api/appartment').then
        (res=>{if(!res.ok){
            throw new Error("Failed to fetch hotel data")
        }
        return res.json();
    }).then(data=>{setAppartementData(data)
        console.log(data)}).catch(error=>
            {console.error("There was a problem with the fetch operation:", error)})},[]);
        useEffect(()=>{
        fetch('https://localhost:7263/api/cottage').then
        (res=>{if(!res.ok){
            throw new Error("Failed to fetch hotel data")
        }
        return res.json();
    }).then(data=>{setCottageData(data)
        console.log(data)}).catch(error=>
            {console.error("There was a problem with the fetch operation:", error)})},[]);    
    
    return(
        <>
        <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50 py-20'> 
        <Title title="Featured destination" 
        subTitle="Discover our handpicked selection of exceptional properties around the world ; 
        offering unparalleled luxury and unforgettable experiences."
        
        /> 
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAll?
                hotelData.map((hotel)=><PropertyCard property={hotel} id={hotel.hotelId} route="rooms" type="hotel" />)
                :
                hotelData.slice(0,3).map((hotel)=><PropertyCard property={hotel} id={hotel.hotelId} route="rooms" type="hotel" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAll(prev=>!prev)}}>
            {viewAll?"Show Less":"View All hotels"}
            </button>
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAll?
                hostelData.map((hostel)=><PropertyCard property={hostel} id={hostel.hostelId} route="hostelsDetails" type="hostel" />)
                :
                hostelData.slice(0,3).map((hostel)=><PropertyCard property={hostel} id={hostel.hostelId} route="hostelDetails" type="hostel" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAll(prev=>!prev)}}>
            {viewAll?"Show Less":"View All hostels"}
            </button>
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAll?
                riadData.map((riad)=><PropertyCard property={riad} id={riad.riadId} route="riadDetails" type="riad" />)
                :
                riadData.slice(0,3).map((riad)=><PropertyCard property={riad} id={riad.riadId} route="riadDetails" type="riad" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAll(prev=>!prev)}}>
            {viewAll?"Show Less":"View All hostels"}
            </button>
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAll?
                villaData.map((villa)=><PropertyCard property={villa} id={villa.Id} route="villaDetails" type="villa" />)
                :
                villaData.slice(0,3).map((villa)=><PropertyCard property={villa} id={villa.Id} route="hostelsDetails" type="villa" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAll(prev=>!prev)}}>
            {viewAll?"Show Less":"View All villas"}
            </button>
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAll?
                cottageData.map((cottage)=><PropertyCard property={cottage} id={cottage.Id} route="cottageDetails" type="cottage" />)
                :
                cottageData.slice(0,3).map((cottage)=><PropertyCard property={cottage} id={cottage.Id} route="cottageDetails" type="cottage" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAll(prev=>!prev)}}>
            {viewAll?"Show Less":"View All cottages"}
            </button>
            <div className='flex flex-wrap items-center justify-center gap-6 mt-20 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAll?
                appartementData.map((appartement)=><PropertyCard property={appartementl} id={appartement.Id} route="appartementDetails" type="appartement" />)
                :
                appartementData.slice(0,3).map((appartement)=><PropertyCard property={appartement} id={appartement.Id} route="appartementDetails" type="appartement" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAll(prev=>!prev)}}>
            {viewAll?"Show Less":"View All appartements"}
            </button>
            </div>
            
        
            </>
    )
}
export default FeaturedDestination