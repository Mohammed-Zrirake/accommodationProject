import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { assets, facilityIcons } from "../assets/assets";
import StarRating from "../components/StarRating";
import NavBar from "../components/NavBar";
import BookingCard from "../components/BookingCard"; // Added import
import { HiLocationMarker, HiOutlineStar } from "react-icons/hi";
import Footer from "../components/Footer";

// Helper for image URLs
const getImageUrl = (imageName) => `https://localhost:7263/images/${imageName}`;

// Simple loading and error components
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-4 text-xl">Loading Dorm Details...</p>
    </div>
);

const ErrorDisplay = ({ message }) => (
    <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p className="text-2xl font-semibold">Oops! Something went wrong.</p>
        <p>{message || "Could not load Dorm details."}</p>
    </div>
);

const DormDetails = () => {
    const { id } = useParams();
    const [dorm, setDorm] = useState(null);
    const [hostel, setHostel] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Booking success handler (placeholder)
    const ActionOnBookingSuccess = () => {
        // pass
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://localhost:7263/api/dorms/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch dorm data (status: ${res.status})`);
                }
                return res.json();
            })
            .then(dormData => {
                setDorm(dormData);
                if (dormData.photos && dormData.photos.length > 0) {
                    setMainImage(getImageUrl(dormData.photos[0]));
                } else {
                    setMainImage(assets.placeholderImage || 'https://via.placeholder.com/800x600?text=No+Image');
                }
                return fetch(`https://localhost:7263/api/hostel/${dormData.hostelId}`);
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch hostel data (status: ${res.status})`);
                }
                return res.json();
            })
            .then(hostelData => {
                setHostel(hostelData);
                setLoading(false);
            })
            .catch(err => {
                console.error("There was a problem with the fetch operation:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

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

    if (!dorm || !hostel) {
        return (
            <>
                <NavBar />
                <ErrorDisplay message="Dorm or Hostel data is not available." />
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 bg-white/75 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 leading-tight">
                            {dorm.name}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 font-inter mt-1">
                            Part of <span className="font-semibold text-primary">{hostel.name}</span>
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                            {dorm.averageRating > 0 && (
                                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <HiOutlineStar
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.round(dorm.averageRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="font-medium text-gray-700">
                                        {dorm.averageRating.toFixed(1)} / 5
                                    </p>
                                </div>
                            )}
                            <div className="flex items-center gap-2 font-bold text-purple-950/95">
                                <HiLocationMarker className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm md:text-base">
                                    {hostel.address.street}, {hostel.address.city},
                                    {hostel.address.stateOrProvince && ` ${hostel.address.stateOrProvince},`}
                                    {hostel.address.postalCode && ` ${hostel.address.postalCode},`}
                                    {hostel.address.country}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        <div className="w-full h-72 md:h-96">
                            <img
                                src={mainImage}
                                alt="Main dorm view"
                                className="w-full h-full rounded-lg shadow-lg object-cover"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error'; }}
                            />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                            {dorm.photos.slice(0, 4).map((photoName, index) => (
                                <img
                                    key={index}
                                    src={getImageUrl(photoName)}
                                    alt={`dorm view ${index + 1}`}
                                    className={`w-full h-24 md:h-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity
                                        ${mainImage === getImageUrl(photoName) ? 'ring-2 ring-offset-amber-500 ring-offset-2' : 'shadow-md'}`}
                                    onClick={() => handleThumbnailClick(photoName)}
                                    onError={(e) => { e.target.style.display='none'; }}
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                            {dorm.photos.slice(4).map((photoName, index) => (
                                <img
                                    key={index}
                                    src={getImageUrl(photoName)}
                                    alt={`dorm view ${index + 1}`}
                                    className={`w-full h-24 md:h-full object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity
                                        ${mainImage === getImageUrl(photoName) ? 'ring-2 ring-offset-amber-500 ring-offset-2' : 'shadow-md'}`}
                                    onClick={() => handleThumbnailClick(photoName)}
                                    onError={(e) => { e.target.style.display='none'; }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Main Content Area: Details & Booking */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column: Dorm Details */}
                        <div className="lg:w-2/3 space-y-8">
                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-3">About this dorm</h2>
                                <p className="text-gray-700 font-inter leading-relaxed whitespace-pre-line">
                                    {dorm.description}
                                </p>
                            </div>

                            {/* Amenities */}
                            {dorm.amenities && dorm.amenities.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-playfair font-semibold text-gray-800 mb-4">What this place offers</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                                        {dorm.amenities.map((amenity) => (
                                            <div key={amenity.amenityId} className="flex items-center gap-2">
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
                                {dorm.rules && (
                                    <div>
                                        <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-2">House Rules</h3>
                                        <p className="text-gray-700 font-inter bg-gray-100 p-3 rounded-md">{dorm.rules}</p>
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-2">Capacity</h3>
                                    <p className="text-gray-700 font-inter bg-gray-100 p-3 rounded-md">Sleeps up to {dorm.capacity} guests.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Booking Card (replaces old form) */}
                        <div className="lg:w-1/3">
                            <BookingCard 
                                  accommondationId={dorm.id} 
                                  unitType="dorm"
                                capacity={dorm.capacity} 
                                basePrice={dorm.basePricePerNight} 
                                onBookingSuccess={ActionOnBookingSuccess} 
                            />
                        </div>
                    </div>

                    {/* Hosted by Section */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h2 className="text-2xl font-playfair xl:text-3xl font-semibold text-gray-800 mb-4">
                            Hosted by <span className="font-medium text-purple-900">{hostel.name}</span>
                        </h2>
                        <div className="flex items-center gap-4">
                            <img
                                src={hostel.photos && hostel.photos.length > 0 ? getImageUrl(hostel.photos[0]) : 'https://via.placeholder.com/100?text=Host'}
                                alt={`Host: ${hostel.name}`}
                                className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover shadow-md"
                            />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{hostel.name}</p>
                                {hostel.starRating > 0 && (
                                    <div className="flex items-center gap-1 -mt-1.5">
                                        <StarRating rating={hostel.starRating} small />
                                        <p className="text-xs text-gray-600 mt-4">({hostel.starRating}-star property)</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button className="mt-6 px-6 py-2.5 rounded-md text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
                            Contact Host
                        </button>
                        {hostel.description && (
                            <div className="mt-6">
                                <h3 className="text-xl font-playfair xl:text-2xl font-semibold text-gray-800 mb-2">About the hostel</h3>
                                <p className="text-gray-700 font-inter leading-relaxed whitespace-pre-line text-sm xl:text-base">
                                    {hostel.description.split('\n\n')[0]}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DormDetails;
