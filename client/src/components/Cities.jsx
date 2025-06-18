import React from "react"
import { moroccainCitiesByType } from "../assets/assets"
import { FiHome, FiSun, FiMapPin, FiHeart, FiCoffee, FiShoppingBag } from 'react-icons/fi'
import Title from "./title"
import { useNavigate } from "react-router-dom"
const Cities=()=>{
function cityClick(id){
console.log(`has click on ${id}`)
}
const navigate=useNavigate()
const categories = [
  { id: 'city', name: 'City', icon: <FiHome /> ,textColor:"text-sky-300",borderColor:"border-sky-300" }, 
  { id: 'beach', name: 'Beach', icon: <FiSun /> ,textColor:"text-yellow-300",borderColor: "border-yellow-300"},
  { id: 'outdoors', name: 'Outdoors', icon: <FiMapPin /> ,textColor:"text-emerald-300",borderColor:"border-emerald-300"}, 
  { id: 'relax', name: 'Relax', icon: <FiCoffee /> ,textColor:"text-teal-600/60",borderColor:"border-teal-600/60"}, 
  { id: 'romance', name: 'Romance', icon: <FiHeart /> ,textColor:"text-pink-500" ,borderColor:"border-pink-500"},
  { id: 'food', name: 'Food', icon: <FiShoppingBag /> ,textColor:"text-purple-400",borderColor:"border-purple-400" }, 
];
const [cities,setCities]=React.useState([])
const [selectedCategory,setSelectedCategory]=React.useState('city')
React.useEffect(()=>{
setCities(moroccainCitiesByType["City"])
},[])
return (
    <>
    
    <Title 
    title="Explore Morocco"
    subTitle="These popular destinations have a lot to offer"
    
    />
    <div className="flex gap-4 max-md:ml-9 max-md:mt-3 md:ml-4 md:mt-2 items-center py-2 px-4 flex-wrap xl:ml-27 xl:mt-4">
    {
    categories.map((category)=>(
        <div key={category.id} 
        className={`flex items-center gap-2 border ${category.borderColor} ${category.textColor}
        cursor-pointer rounded-2xl px-2 py-1 ${category.id===selectedCategory?"border-3":" border"}`}
        onClick={()=>{setCities(moroccainCitiesByType[category.name]);setSelectedCategory(category.id)}}>
            <div>{category.icon}</div>
            <p className="font-medium font-playfair">{category.name} </p>
            
        </div>
    ))}
    </div>
    {/*new URL(`../assets/cities/${city.path}`, import.meta.url).href*/}
<div className="flex  justify-center gap-y-2.5 mt-4 flex-wrap scrollbar-hide p-1 ">
{
    cities.map(city=>(
        <div key={city.id} onClick={()=>{navigate(`/SearchByCity/${city.name}`)}} className=" border-gray-100 relative border-1 h-35 w-35 md:h-50 md:w-50 flex flex-col rounded-xl shadow-sm shadow-gray-200 bg-[url] justify-center items-center flex-none cursor-pointer">
       <img src={`../../src/assets/cities/${city.path}`} alt={`${city.name} image`} className="h-full w-full  rounded-xl shadow-sm shadow-gray-200 " />
       <p className="font-playfair text-gray-100 px-2 py-0.5 absolute top-2 left-2 bg-gray-600/40 font-bold text-xl">{city.name}</p>
       </div>
    ))
}

</div>

</>
)
}
export default Cities