import { useNavigate } from "react-router-dom"
import { propertyType } from "../assets/assets"
import Title from "./title"

const TypeProperty=()=>{
    const navigate=useNavigate()
    return(
        <>
        <Title title="Browse by property type" />
        <div className="flex items-center flex-wrap gap-4  justify-center py-6">
            {propertyType.map((property)=>(
                <div key={property.id} className=" relative cursor-pointer"
                onClick={()=>{window.scrollTo(0,0);navigate(`/SearchByTypeProperty/${property.name.toLowerCase()}`)}}
                >
                    <img src={property.image} alt={`${property.name} image`} 
                    className="h-35 w-35 md:h-40 md:w-40 xl:w-45 xl:h-45 object-cover object-center rounded-t-xl" />
                    <p className="bg-gray-700/40 font-playfair px-2 py-1 rounded-xl absolute top-2 text-white font-bold left-2">{property.name}</p>
                </div>
            ))}
        </div>
        </>
    )
}
export default TypeProperty