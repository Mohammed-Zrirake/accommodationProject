import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const SearchByPropertyType=()=>{
    const {type}=useParams()
    const [allProperty,setAllProperty]=useState([]);
   useEffect(()=>{
        fetch(`https://localhost:7263/api/${type}`).then((res)=>{
            if(!res.ok){
                throw new Error("Network response was not ok")
            }
            return res.json()
        }).then((data)=>{
            setAllProperty(data);
            console.log(data);
        }).catch((error)=>{
            console.error("There was a problem with the fetch operation:", error);
        })
    },[]) 

    
    
    return (
        <>
        <NavBar />
        <div className="pt-24">
            <h1 className="text-xl font-intern font-medium px-8 py-4 md:text-2xl ">Search for all
                <span className="font-medium text-amber-500"> {type}</span></h1>
        </div>
        {allProperty.length==0?
        <div className="h-[70vh] flex justify-center items-center">
            <p className="text-gray-700">These aren't any <span className="font-bold text-gray-800"> {type}</span> </p>
        </div>
        :
        <div>
                Hello world
        </div>
        }
        
        <Footer />
        </>
    )
}
export default SearchByPropertyType