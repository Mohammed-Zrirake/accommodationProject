import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const SearchByCity=()=>{
    const {city}=useParams()
    console.log(city)
    const allHotel=[]
    
    return (
        <>
        <NavBar />
        <div className="pt-24">
            <h1 className="text-xl font-intern font-medium px-8 py-4 md:text-2xl ">Search for all accommodation in 
                <span className="font-medium text-amber-500"> {city}</span></h1>
        </div>
        {allHotel.length==0?
        <div className="h-[70vh] flex justify-center items-center">
            <p className="text-gray-700">These aren't any hotels in <span className="font-bold text-gray-800"> {city}</span> </p>
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
export default SearchByCity