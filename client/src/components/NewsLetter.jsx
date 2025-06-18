import Title from "./title"

const NewsLetter=()=>{
return (
<section className="px-8 py-4 mx-10 flex justify-center flex-wrap border border-gray-500/30 rounded-lg md:mx-22 lg:mx-25 xl:mx-30 mt-15 mb-15">
<div className="flex md:flex-row flex-col justify-center items-start md:items-center md:justify-between gap-5 text-sm max-w-5xl bg-white px-8 py-4">
    
    <div className="max-w-md w-full">
        <Title
        title="Subscribe to our newsletter"
        subTitle="Get exclusive travel offers, last-minute deals, and insider tips for booking top-rated hotels, apartments, villas, and more — all sent straight to your inbox."
        />
    </div>
    <div className="space-y-4 md:max-w-48">
        <div className="flex items-center gap-3">
            <div className="bg-gray-500/10 w-max p-2.5 rounded">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.834 20.167H9.167c-3.457 0-5.186 0-6.26-1.074s-1.074-2.802-1.074-6.26V11c0-3.457 0-5.185 1.074-6.26 1.074-1.073 
                    2.803-1.073 6.26-1.073h3.667c3.456 0 5.185 0 6.259 1.074s1.074 2.802 1.074 6.26v1.833c0 3.457 0 5.185-1.074 6.259-.599.599-1.401.864-2.593.981M6.417 3.667V2.292m9.167 1.375V2.292m4.125 5.958H9.854m-8.02 0h3.552" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>
            <h3 className="text-base font-medium text-gray-800">Weekly articles</h3>
        </div>
        <p className="text-gray-500">
            Receive inspiring travel guides and handpicked destination recommendations to help you plan your next unforgettable getaway.
        </p>
    </div>
    <div className="space-y-4 md:max-w-48">
        <div className="flex items-center gap-3">
            <div className="bg-gray-500/10 w-max p-2.5 rounded">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.834 3.208v6.875-5.958a1.375 1.375 0 1 1 2.75 0v5.958-3.208a1.375 1.375 0 1 1 2.75 0v7.791a5.5 5.5 0 0 1-5.5 
                    5.5H11.8a5.5 5.5 0 0 1-3.76-1.486l-4.546-4.261a1.594 1.594 0 1 1 2.218-2.291l1.623 1.623V5.958a1.375 1.375 0 1 1 2.75 0v4.125-6.875a1.375 1.375 0 1 1 2.75 0" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h3 className="text-base font-medium text-gray-800">No spam</h3>
        </div>
        <p className="text-gray-500">
            We respect your inbox — only meaningful updates, special offers, and helpful travel tips. No clutter, just value.
        </p>
    </div>
    
</div> 
<form className="flex flex-col justify-center md:flex-row items-center gap-4 mt-4 md:mt-10 flex-wrap w-3/4">
            <input className="py-2 px-3 w-full outline-none focus:border-amber-700/60 transition min-w-40 max-w-100 border border-gray-500/30 rounded-md" type="email" placeholder="Enter you email" required/>
            <button className="bg-amber-500 hover:bg-amber-600 transition-all px-6 py-2 rounded text-white font-medium">Subscribe</button>
    </form>
    </section>
)
}
export default NewsLetter