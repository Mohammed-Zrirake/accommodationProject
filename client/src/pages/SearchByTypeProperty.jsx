import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { HiOutlineHome } from "react-icons/hi"
import SearchPropertyCard from "../components/SearchPropertyCard"

const SearchByPropertyType=()=>{
    const {type}=useParams()
    const [allProperty,setAllProperty]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   useEffect(()=>{
        fetch(`https://localhost:7263/api/${type}`).then((res)=>{
            if(!res.ok){
                throw new Error("Network response was not ok")
            }
            return res.json()
        }).then((data)=>{
            setAllProperty(data);
            setLoading(false);
            console.log(data);
        }).catch((error)=>{
            setError(error.message);
            setLoading(false);
            console.error("There was a problem with the fetch operation:", error);
        })
    },[type]) 

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
                <p className="text-xl font-semibold text-center">Error loading {type}</p>
                <p className="text-center mt-2">{error}</p>
              </div>
            );
        }
    
    return (
        <>
        <NavBar />
        <div className="pt-24 px-8 ">
            <h1 className="text-xl font-intern pt-4 font-medium  md:text-2xl ">Search for all
                <span className="font-medium text-amber-500"> {type}{allProperty.length>1?'s':''}</span></h1>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {allProperty.length} {type}{allProperty.length>1?'s':''} found.
                            </p>
        </div>
        {allProperty.length==0?
        <div className="h-[70vh] flex justify-center items-center">
            <p className="text-gray-700">These aren't any <span className="font-bold text-gray-800"> {type}</span> </p>
        </div>
        :
        <div className="flex flex-col items-start gap-4 md:gap-6 lg:gap-8
                py-18 md:py-25 px-4 md:px-16 lg:px-24 ">
                {
                    
                allProperty.map((property)=>(
                   
                    <SearchPropertyCard property={property} type={type} propertyId={type=='hotel'?property.hotelId:type=='hostel'?property.hostelId:
                    property.id} />
                    
                ))}
        </div>
        }
        
        <Footer />
        </>
    )
}
export default SearchByPropertyType