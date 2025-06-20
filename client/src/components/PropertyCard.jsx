import React from "react"
import { Link } from "react-router-dom"
import { assets } from "../assets/assets"
const PropertyCard=({property,id,route,type})=>{
    
    return (
        <Link to={`/${route}/${id}`} onClick={()=>scrollTo(0,0)} key={id} className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 
            shadow-[0px_4px_4px_tgba(0,0,0,0.05)]">
           <div className="max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
      <div className="relative">
        <div className="overflow-hidden">
          <img 
            src={`https://localhost:7263/images/${property.photos[0]}`} 
            alt={`${property.name} image`}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className=" absolute top-3 w-full flex justify-between items-center gap-2">
          <span className=" absolute top-0 left-3.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-md">
            Best Seller
          </span>
          <span className="absolute top-0 right-3.5 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
            {property.address.city}
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-semibold text-gray-800">4.5</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <Link 
            to={`/${route}/${id}`} 
            onClick={() => window.scrollTo(0, 0)}
            className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors"
          >
            {property.name}
          </Link>
          
          <div className="flex items-center gap-1 text-gray-500 mt-1 mb-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{property.address.city}, {property.address.country}</span>
          </div>
          
          
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          
          
          <Link 
            to={`/${route}/${id}`} 
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>View {type}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>



        </Link>
    )
}
export default PropertyCard