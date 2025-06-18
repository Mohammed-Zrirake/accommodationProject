import React from "react"
import Title from "./title"
import { assets, exclusiveOffers } from "../assets/assets"
export default function ExclusiveOffer(){
    const [viewAllOffers,SetViewAllOffers]=React.useState(false)
    return(
        <section className="flex flex-col justify-arround pb-10">
            <div className="flex justify-between items-center px-5 py-3 md:px-7 md:py-4 xl:px-8 ">
                <Title
                title="Exclusive Offers"
                subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and 
                create unforgettable memories."
                align="left"
                />
                <button className="group cursor-pointer py-3 px-4 mt-6" onClick={()=>{
                    SetViewAllOffers(prev=>!prev)}}>{viewAllOffers?"Show Less Offers":"View all Offers"  }
                    <span> </span> <img src={assets.arrowIcon} alt="arrow icon" 
                    className="group-hover:translate-x-1 transition-all inline-block"
                    />
                </button>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch  gap-2">
                {
                    exclusiveOffers.slice(0,viewAllOffers?exclusiveOffers.length:2).map((offer)=>(
                        <div key={offer._id} className="group relative flex flex-col items-start
                        justify-between gap-1 pt-12 md:pt-18 px-4 rounded-2xl text-white pb-10 bg-no-repeat
                        bg-center bg-cover max-w-3xs" style={{backgroundImage:`url(${offer.image})`}}>
                            <p className="px-3 py-1 absolute top-4 left-4 text-sm bg-white text-amber-900
                            font-medium font-playfair rounded-full">{offer.priceOff}% OFF</p>
                            <div>
                            <p className="text-2xl font-medium font-playfair">{offer.title}</p>   
                            <p>{offer.description}</p> 
                            <p className="text-xs text-white/80 font-bold mt-3 absolute top-3 right-4">Expires {offer.expiryDate}</p>
                            </div>
                            {/*<button className="group flex justify-center gap-1 items-center mt-1 px-4 py-2">
                                <span className="block">View offer</span>
                                <img src={assets.arrowIcon} alt="arrow icons" className="invert group-hover:translate-x-1 
                                transition-all" />
                            </button>*/}
                        </div>
                    ))
                }
            </div>
        </section>
    )
}