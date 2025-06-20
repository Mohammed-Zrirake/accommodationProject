/*import { useParams } from "react-router-dom"
import { use, useEffect, useState } from "react"
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets"
import StarRating from "../components/StarRating"
import NavBar from "../components/NavBar"

const RoomDetails=()=>{
    const {id}=useParams()
    const [room,setRoom]=useState(null)
    const [hotel,setHotel]=useState(null)
    const [mainImage,setMailImage]=useState(null)

    useEffect(()=>{
        fetch("https://localhost:7263/api/room/"+id).then(res=>{if(!res.ok){
            throw new Error("Failed to fetch room data")}
        return res.json();
        }).then((data)=>{setRoom(data)}).catch(error =>{console.error(error)});
        if(room){
            setRoom(room);
            fetch(`https://localhost:7263/api/hotel/${room.hotelId}`).then(res=>{if(!res.ok){
                throw new Error("Failed to fetch hotel data")
            } return res.json();}).then(data=>{setHotel(data)}).catch(error=>
                {console.error("There was a problem with the fetch operation:", error)});
            if(room.photos && room.photos.length>0){
                setMailImage(room.photos[0])
            }
            else{
                setMailImage(null)
            }
        }
        else{
            setRoom(null);
            setMailImage(null);
        }
        room && setMailImage(room.photos[0])
    },[])
    if(room)
    {return (
<>
    
    <NavBar />    
    
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32 ">
         <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-playfair">{hotel.name} 
                <span className="font-inter text-sm" >({room.name}) </span> </h1>
        </div>
        <div className="flex items-center gap-2">
            <p className="mt-4 font-serif text-gray-700">{`${room.AverageRating}/5`}</p>
            <StarRating rating={room.AverageRating} />
            
        </div>
     
        <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location icon" />
        <p>{hotel.address.street} , {hotel.address.city}</p>
        </div>
      
        <div className="flex flex-col lg:flex-row mt-6 gap-6 ">
            <div className="lg:w-1/2 w-full">
                <img src={mainImage} alt="Room image" className="w-full rounded-xl shadow-lg object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                {room?.photos.length>1 && room.photos.map((image,index)=>{
                    return(
                        <img onClick={()=>{setMailImage(image)}}
                        key={index} src={image} alt="Room image" className={`w-full rounded-xl shadow-md 
                            object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`} />
                    )
                    
                })}
            </div>
        </div>
       
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-playfair">
                    Experience Luxury Like Never Before
                </h1>
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                    {
                        room.amenities.map((item,index)=>{
                            return (
                                <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                                    
                                    <p className="text-xs">
                                    {item}
                                    </p>
                                </div>
                                
                            )
                        })
                    }
                </div>
            </div>
          
            <p className="text-2xl font-medium">{room.BasePricePerNight * 10} DH /night</p>
        </div>
        
        <form className="flex flex-col md:flex-row items-start md:items-center justify-between 
        bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
            <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 
            md:gap-10 text-gray-500">
                <div className="flex flex-col ">
                    <label htmlFor="checkInDate" className="font-medium text-gray-800">Check In </label>
                    <input type="date" id="checkInDate" placeholder="check In" 
                    className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="checkOutDate" className="font-medium text-gray-800">Check Out </label>
                    <input type="date" id="checkOutDate" placeholder="check Out" 
                    className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="guests" className="font-medium text-gray-800">Guests </label>
                    <input type="number" id="guests" placeholder="check Out" 
                    className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
                </div>
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-dull active:scale-95 
            transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25
            py-3 md:py-4 text-base cursor-pointer" >Book Now</button>
        </form>
        <div className="mt-25 space-y-4">
            {
                roomCommonData.map((spec,index)=>(
                    <div key={index} className="flex items-start gap-2" >
                        <img src={spec.icon} alt={`${spec.title} icon`} className="w-6.5" />
                        <div>
                            <p className="text-base">{spec.title}</p>
                            <p className="text-gray-500">{spec.description} </p>
                        </div>    
                    </div>    
                ))
            }
        </div>
        <div className="max-w-6xl border-y border-gray-300 my-15 py-10 text-gray-500">
            <p>Guests will be allocated on the ground floor according to availability.
                You get a comfortable Two bedroom apartment has a true city feeling. The 
                price quoted is for two guests, at the guests slot please mark the number of 
                guests to get the exact price for groups. The Guests will be allocated ground 
                floor according to availability. You get the comfortable two bedroom 
                apartment has a true city feeling.
            </p>
        </div>
        
        <div className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
                <img src={room.photos[0]} alt="Host" className="h-14 w-14 md:h-18 rounded-full" />
                <div>
                    <p>Hosted by {hotel.Provider.username}</p>
                    <div className="flex gap-2">
                        <p className="mt-4 font-serif text-gray-700">{`${hotel.AverageRating}/5`}</p>
                        <StarRating rating={hotel.AverageRating} />
                        
                    </div>
                    
                </div>
            </div>
            <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary 
            hover:bg-blue-400 transition-all cursor-pointer">Contact Now</button>
        </div>
    </div>
</>        
    )}
}
export default RoomDetails
*/
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { assets, facilityIcons } from "../assets/assets"; // Assuming roomCommonData is not essential or will be replaced
import StarRating from "../components/StarRating";
import NavBar from "../components/NavBar";

// Helper for image URLs
const getImageUrl = (imageName) => `https://localhost:7263/images/${imageName}`;

// Simple loading and error components (can be more sophisticated)
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-4 text-xl">Loading Room Details...</p>
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p className="text-2xl font-semibold">Oops! Something went wrong.</p>
        <p>{message || "Could not load room details."}</p>
    </div>
);


const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://localhost:7263/api/room/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch room data (status: ${res.status})`);
                }
                return res.json();
            })
            .then(roomData => {
                setRoom(roomData);
                if (roomData.photos && roomData.photos.length > 0) {
                    setMainImage(getImageUrl(roomData.photos[0]));
                } else {
                    setMainImage(assets.placeholderImage || 'https://via.placeholder.com/800x600?text=No+Image'); // Fallback
                }
                // Now fetch hotel data
                return fetch(`https://localhost:7263/api/hotel/${roomData.hotelId}`);
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch hotel data (status: ${res.status})`);
                }
                return res.json();
            })
            .then(hotelData => {
                setHotel(hotelData);
                setLoading(false);
            })
            .catch(err => {
                console.error("There was a problem with the fetch operation:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]); // Re-fetch if id changes

    const handleThumbnailClick = (imageName) => {
        setMainImage(getImageUrl(imageName));
    };

    if (loading) {
        return (
            <>
                <NavBar />
                <LoadingSpinner />
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar />
                <ErrorDisplay message={error} />
            </>
        );
    }

    if (!room || !hotel) {
        // This case should ideally be covered by loading/error states
        return (
            <>
                <NavBar />
                <ErrorDisplay message="Room or Hotel data is not available." />
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8"> {/* Increased bottom margin for more breathing room */}
    <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 leading-tight"> {/* Slightly darker text, tighter leading */}
        {room.name}
    </h1>
    <p className="text-lg md:text-xl text-gray-700 font-inter mt-1"> {/* Slightly larger, more distinct from title */}
        Part of <span className="font-semibold text-primary">{hotel.name}</span> {/* Using 'Part of' or 'In' can feel more integrated, highlight hotel name */}
    </p>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-3"> {/* flex-wrap for responsiveness, increased gap, increased top margin */}
        {room.averageRating > 0 && (
            <div className="flex items-center gap-1.5"> {/* Group stars and text rating */}
                <StarRating rating={room.averageRating} small /> {/* Consider a 'small' prop for StarRating if available */}
                <span className="font-medium text-gray-800">{`${room.averageRating.toFixed(1)}`}</span>
                <span className="text-gray-500">/ 5</span>
                {/* Optional: Add review count here if available: <span className="ml-1 text-gray-500">(123 reviews)</span> */}
            </div>
        )}

        {/* More subtle separator if both rating and location are present */}
        {room.averageRating > 0 && (
            <span className="text-gray-300 hidden sm:inline">•</span> 
        )}

        <div className="flex items-center gap-1.5 group"> {/* Added 'group' for group-hover */}
    <img
        src={assets.locationIcon}
        alt=""
        className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors duration-150 flex-shrink-0"
        aria-hidden="true"
    />
    <a
        href={`https://maps.google.com/?q=${encodeURIComponent(hotel.address.street + ", " + hotel.address.city + ", " + hotel.address.country)}`}
        target="_blank"
        
        className="text-sm text-purple-900 font-bold group-hover:text-primary hover:underline transition-colors duration-150"
    >
        {hotel.address.street}, {hotel.address.city} , 
        {hotel.address.postalCode?hotel.address.postalCode:null}, {hotel.address.country}
    </a>
</div>
    </div>
</div>
                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        <div className="w-full h-72 md:h-96">
                            <img
                                src={mainImage}
                                alt="Main room view"
                                className="w-full h-full rounded-lg shadow-lg object-cover"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error'; }} // Fallback for broken image
                            />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                            {room.photos.slice(0, 4).map((photoName, index) => ( // Show up to 4 thumbnails
                                <img
                                    key={index}
                                    src={getImageUrl(photoName)}
                                    alt={`Room view ${index + 1}`}
                                    className={`w-full h-24 md:h-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity
                                        ${mainImage === getImageUrl(photoName) ? 'ring-2 ring-offset-amber-500 ring-offset-2' : 'shadow-md'}`}
                                    onClick={() => handleThumbnailClick(photoName)}
                                    onError={(e) => { e.target.style.display='none'; }} // Hide broken thumbnails
                                />
                            ))}
                            {/* Optionally, an overlay to show all photos */}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                            {room.photos.slice(4).map((photoName, index) => ( // Show up to 4 thumbnails
                                <img
                                    key={index}
                                    src={getImageUrl(photoName)}
                                    alt={`Room view ${index + 1}`}
                                    className={`w-full h-24 md:h-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity
                                        ${mainImage === getImageUrl(photoName) ? 'ring-2 ring-offset-amber-500 ring-offset-2' : 'shadow-md'}`}
                                    onClick={() => handleThumbnailClick(photoName)}
                                    onError={(e) => { e.target.style.display='none'; }} // Hide broken thumbnails
                                />
                            ))}
                            {/* Optionally, an overlay to show all photos */}
                        </div>
                    </div>

                    {/* Main Content Area: Details & Booking */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column: Room Details */}
                        <div className="lg:w-2/3 space-y-8">
                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-3">About this room</h2>
                                <p className="text-gray-700 font-inter leading-relaxed whitespace-pre-line">
                                    {room.description}
                                </p>
                            </div>

                            {/* Amenities */}
                            {room.amenities && room.amenities.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-4">What this place offers</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                                        {room.amenities.map((amenity) => (
                                            <div key={amenity.amenityId} className="flex items-center gap-2">
                                                {/* You can map amenity.name to facilityIcons here if you have them */}
                                                {/* Example: <img src={facilityIcons[amenity.name.toLowerCase().replace(' ', '')]} alt="" className="w-5 h-5 text-primary" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700 font-inter">{amenity.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rules & Capacity */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {room.rules && (
                                    <div>
                                        <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-2">House Rules</h3>
                                        <p className="text-gray-700 font-inter bg-gray-100 p-3 rounded-md">{room.rules}</p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-2">Capacity</h3>
                                    <p className="text-gray-700 font-inter bg-gray-100 p-3 rounded-md">Sleeps up to {room.capacity} guests.</p>
                                </div>
                            </div>

                            {/* Consider adding roomCommonData here if relevant, or other API-driven details */}

                        </div>

                        {/* Right Column: Booking Card */}
                        <div className="lg:w-1/3">
                            <div className="bg-white p-6 rounded-xl shadow-xl sticky top-28">
                                <p className="text-2xl font-semibold text-gray-800 mb-1">
                                    <span className="font-playfair">{room.basePricePerNight} DH</span>
                                    <span className="text-base font-normal text-gray-600"> / night</span>
                                </p>
                                {/* Add review count if available */}
                                {/* <p className="text-sm text-gray-500 mb-4">Based on {room.reviews.length} reviews</p> */}

                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700">Check In</label>
                                        <input type="date" id="checkInDate" name="checkInDate"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                                    </div>
                                    <div>
                                        <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700">Check Out</label>
                                        <input type="date" id="checkOutDate" name="checkOutDate"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                                    </div>
                                    <div>
                                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
                                        <input type="number" id="guests" name="guests" defaultValue="1" min="1" max={room.capacity}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                                    </div>
                                    <button type="submit" className="w-full bg-primary hover:bg-primary-dull text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors duration-150 ease-in-out active:scale-95">
                                        Request to Book
                                    </button>
                                </form>
                                <p className="text-xs text-gray-500 mt-4 text-center">You won't be charged yet</p>
                            </div>
                        </div>
                    </div>

                    {/* Hosted by Section - Refined */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-playfair xl:text-3xl font-semibold text-gray-800 mb-4">Hosted by <span className="font-medium text-purple-900">{hotel.name}</span></h2>
                        <div className="flex items-center gap-4">
                            <img
                                src={hotel.photos && hotel.photos.length > 0 ? getImageUrl(hotel.photos[0]) : 'https://via.placeholder.com/100?text=Host'}
                                alt={`Host: ${hotel.name}`}
                                className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover shadow-md"
                            />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{hotel.name}</p>
                                {hotel.starRating > 0 && (
                                     <div className="flex items-center gap-1 -mt-1.5">
                                        <StarRating rating={hotel.starRating} small />
                                        <p className="text-xs text-gray-600 mt-4">({hotel.starRating}-star property)</p>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                        { <button className="mt-6 px-6 py-2.5 rounded-md text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
                            Contact Host
                        </button> }
                         {/* Description of Hotel (if you want to show it here) */}
                        {hotel.description && (
                            <div className="mt-6">
                                <h3 className="text-xl font-playfair xl:text-2xl font-semibold text-gray-800 mb-2">About the Hotel</h3>
                                <p className="text-gray-700 font-inter leading-relaxed whitespace-pre-line text-sm xl:text-base">
                                    {hotel.description.split('\n\n')[0]} {/* Show first paragraph or summary */}
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default RoomDetails;