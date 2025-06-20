import React, { useState,useEffect } from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Title from "../components/title"

import { useNavigate, useParams } from "react-router-dom"
import Filters from "../components/Filters"
import RoomCard from "../components/RoomCard"

const AllRiadRooms=()=>{
    
    const navigate=useNavigate()
    const {id}=useParams()
    const [riadData,setRiadData]=useState([])
    const [allRooms,setAllRooms]=useState([])
    useEffect(()=>{
        fetch(`https://localhost:7263/api/riad/${id}`).then(res=>{if((!res.ok)){
            throw new Error("Failed to fetch riad data")
        }
        return res.json();}).then(data=>{setRiadData(data);
            setAllRooms(data.rooms);
            console.log(data.rooms)
        }).catch(error=>
            {console.error("There was a problem with the fetch operation:", error)})},[])
    
    return(
<>
    <NavBar />
    <div className="flex flex-col-reverse  lg:flex-row items-start justify-between
        py-28 md:py-35 px-4 md:px-16 lg:px-24 "> 
        <div>
        <div className="max-w-174 md:w-full">
        <Title title={`${riadData.name} Hotel Rooms `}
            subTitle="Take advantage of our limited-time offers and special packages to 
            enhance your stay and create unforgettable memories" 
            align="left"/>
        </div>
        <div  className="mb-8 xl:p-6">
        {allRooms.map((room)=>(
            
            
            <RoomCard hotelData={riadData} room={room}/>
                    
        ))} </div>
        </div>   
        
        
    </div>
        
    <Footer />
</>
    )
}
export default AllRiadRooms