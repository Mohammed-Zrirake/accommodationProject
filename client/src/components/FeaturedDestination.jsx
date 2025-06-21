import {useState,useEffect} from 'react'
import { hotelDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './title'
import HostelCard from './HostelCard'
import PropertyCard from './PropertyCard'
const FeaturedDestination=()=>{
    
    const [viewAllHotel,SetViewAllHotel]=useState(false)
    const [viewAllHostel,SetViewAllHostel]=useState(false)
    const [viewAllVilla,SetViewAllVilla]=useState(false)
    const [viewAllRiad,SetViewAllRiad]=useState(false)
    const [viewAllCottage,SetViewAllCottage]=useState(false)
    const [viewAllAppartment,SetViewAllAppartment]=useState(false)
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
    const hasAnyData =
    hotelData.length > 0 ||
    hostelData.length > 0 ||
    riadData.length > 0 ||
    villaData.length > 0 ||
    cottageData.length > 0 ||
    appartementData.length > 0;
     if (!hasAnyData) {
    return null; 
    // Or you can return a loading spinner or a "No destinations found" message
  }
    return(
        
        <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50'> 
        
            {hotelData.length>0&& <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
            <div className="text-left space-y-2 flex flex-col items-start justify-start ">
  <h1 className="text-2xl font-bold text-gray-900 xl:text-3xl">Stay at our best Moroccan hotels</h1>
  <p className="text-gray-600">Experience comfort and elegance inspired by Moroccan hospitality.</p>
</div>


            <div className='flex flex-wrap items-center justify-center gap-6 mt-12 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAllHotel?
                hotelData.map((hotel)=><PropertyCard property={hotel} id={hotel.hotelId} route="hotelDetails" type="hotel" />)
                :
                hotelData.slice(0,3).map((hotel)=><PropertyCard property={hotel} id={hotel.hotelId} route="hotelDetails" type="hotel" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAllHotel(prev=>!prev)}}>
            {viewAllHotel?"Show Less":"View All hotels"}
            </button>
            </div>}
            {hostelData.length>0 && <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50'>
                <div className="text-left space-y-2 mt-8 xl:mt-10">
  <h1 className="text-2xl font-bold text-gray-900 xl:text-3xl">Stay at our top Moroccan hostels</h1>
  <p className="text-gray-600">Share the spirit of Morocco with fellow travelers from around the world.</p>
</div>

            <div className='flex flex-wrap items-center justify-center gap-6 mt-12 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAllHostel?
                hostelData.map((hostel)=><PropertyCard property={hostel} id={hostel.hostelId} route="hostelDetails" type="hostel" />)
                :
                hostelData.slice(0,3).map((hostel)=><PropertyCard property={hostel} id={hostel.hostelId} route="hostelDetails" type="hostel" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAllHostel(prev=>!prev)}}>
            {viewAllHostel?"Show Less":"View All hostels"}
            </button>
            </div>}
           {riadData.length>0 && <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50'>
            <div className="text-left space-y-2 mt-8 xl:mt-10">
  <h1 className="text-2xl font-bold text-gray-900 xl:text-3xl">Stay at our authentic Moroccan riads</h1>
  <p className="text-gray-600">Step into tradition with serene courtyards and timeless architecture.</p>
</div>

            <div className='flex flex-wrap items-center justify-center gap-6 mt-12 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAllRiad?
                riadData.map((riad)=><PropertyCard property={riad} id={riad.riadId} route="riadDetails" type="riad" />)
                :
                riadData.slice(0,3).map((riad)=><PropertyCard property={riad} id={riad.riadId} route="riadDetails" type="riad" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAllRiad(prev=>!prev)}}>
            {viewAllRiad?"Show Less":"View All Riads"}
            </button>
            </div>}

            {villaData.length>0 && <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50 '>
                <div className="text-left space-y-2 mt-8 xl:mt-10">
  <h1 className="text-2xl font-bold text-gray-900 xl:text-3xl">Stay at our stunning Moroccan villas</h1>
  <p className="text-gray-600">Luxury and privacy in the heart of Moroccan charm.</p>
</div>

            <div className='flex flex-wrap items-center justify-center gap-6 mt-12 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                
                {viewAllVilla?
                villaData.map((villa)=><PropertyCard property={villa} id={villa.id} route="villaDetails" type="villa" />)
                :
                villaData.slice(0,3).map((villa)=><PropertyCard property={villa} id={villa.id} route="villaDetails" type="villa" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAllVilla(prev=>!prev)}}>
            {viewAllVilla?"Show Less":"View All villas"}
            </button>
            
            </div>}
            {cottageData.length>0 && <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50 '>
                <div className="text-left space-y-2 mt-8 xl:mt-10">
  <h1 className="text-2xl font-bold text-gray-900 xl:text-3xl">Stay at our peaceful Moroccan cottages</h1>
  <p className="text-gray-600">Reconnect with nature and simplicity, the Moroccan way.</p>
</div>

            <div className='flex flex-wrap items-center justify-center gap-6 mt-12 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAllCottage?
                cottageData.map((cottage)=><PropertyCard property={cottage} id={cottage.id} route="cottageDetails" type="cottage" />)
                :
                cottageData.slice(0,3).map((cottage)=><PropertyCard property={cottage} id={cottage.id} route="cottageDetails" type="cottage" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAllCottage(prev=>!prev)}}>
            {viewAllCottage?"Show Less":"View All cottages"}
            </button>
            </div>}
           {appartementData.length>0 && <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50'>
            <div className="text-left space-y-2 mt-8 xl:mt-10">
  <h1 className="text-2xl font-bold text-gray-900 xl:text-3xl">Stay at our stylish Moroccan apartments</h1>
  <p className="text-gray-600">Live like a local with comfort, design, and cultural flair.</p>
</div>

            <div className='flex flex-wrap items-center justify-center gap-6 mt-12 border-b border-gray-300 shadow-2xl shadow-gray-200 pb-12'>
                {viewAllAppartment?
                appartementData.map((appartement)=><PropertyCard property={appartementl} id={appartement.id} route="appartmentDetails" type="appartement" />)
                :
                appartementData.slice(0,3).map((appartement)=><PropertyCard property={appartement} id={appartement.id} route="appartmentDetails" type="appartement" />)
                }
            </div>
            <button className='-mt-5 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full bg-white 
            hover:bg-gray-50 transition-all cursor-pointer' onClick={()=>{SetViewAllAppartment(prev=>!prev)}}>
            {viewAllAppartment?"Show Less":"View All appartements"}
            </button>
            </div>}
            </div>
            
        
            
    )
}
export default FeaturedDestination