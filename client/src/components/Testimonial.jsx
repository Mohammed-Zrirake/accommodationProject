import React from "react"
import Title from "./title"
import { testimonials,assets } from "../assets/assets"
const Star = ({ filled }) => (
        <svg className="w-4 h-4 text-yellow-400" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
        </svg>
    );
const Testimonial=()=>{
    return(
        <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
            <Title
            title="What Our Guests Say"
            subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and 
            luxurious accomondations around the world."
            />
            <div className="flex flex-wrap justify-center  gap-6 mt-20 ">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full object-cover object-center" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img src={testimonial.rating>index?assets.starIconFilled:assets.starIconOutlined} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">{testimonial.review}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Testimonial