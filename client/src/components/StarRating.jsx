import React from "react"
import { assets } from "../assets/assets"

const StarRating=(props)=>{
return(<div className="flex items-center gap-1 mt-4">
    {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={props.rating>index?assets.starIconFilled:assets.starIconOutlined}  />
                                        )
                         )}
</div>)
}
export default StarRating