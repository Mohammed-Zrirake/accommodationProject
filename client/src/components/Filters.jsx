import { useState } from "react";
const CheckBox=({label,selected,onChange=()=>{}})=>{
return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
        <input type="checkbox" checked={selected} onChange={(e)=>(onChange.target.checked,label)} />
        <span className="font-light select-none">{label}</span>
    </label>
)
}
const RadioButton=({label,selected,name,onChange=()=>{}})=>{
return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
        <input type="radio" name={name} checked={selected} onChange={()=>(onChange)} />
        <span className="font-light select-none">{label}</span>

    </label>
)
}
const Filters=()=>{
    const [displayFilters,setDisplayFilters]=useState(false)
        const roomTypes=["Single Bed","Double Bed","Luxury Room","Family Suite"]
        const priceRanges=["0 to 500","500 to 1000","1000 to 2000","2000 to 3000","+3000"]
        const sortOptions=["Price Low to High","Price High to Low","Newest First"]
return (
<div className=" bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
            <div className={`px-8 py-2 flex justify-between items-center min-lg:border-b border-gray-300 ${displayFilters && "border-b"} `}>
                <p className="text-base font-medium text-gray-800">Filters</p>
                <div className="text-xs cursor-pointer hover:scale-110">
                    <button className="lg:hidden" onClick={()=>{setDisplayFilters(prev=>!prev)}}>
                       {displayFilters?"Hide":"show"}</button>
                    <button className="hidden lg:block">Clear </button>
                </div>
            </div>
            {<div className={`${displayFilters?"block":"hidden md:block"} transition-all duration-700 `}>
                <div className="px-5 py-5">
                    <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
                    {roomTypes.map((room,index)=>(
                        <CheckBox key={index} label={room} />
                    ))}
                </div>
                <div className="px-5 py-5">
                    <p className="font-medium text-gray-800 pb-2">Price Range</p>
                    {priceRanges.map((range,index)=>(
                        <RadioButton key={index} name="sortRanges" label={`${range} DH`} />
                    ))}
                </div>
                <div className="px-5 py-5">
                    <p className="font-medium text-gray-800 pb-2">Sort By</p>
                    {sortOptions.map((option,index)=>(
                        <RadioButton key={index} name="sortOption" label={option} />
                    ))}
                </div>
            </div>}
        </div>
)
}
export default Filters;