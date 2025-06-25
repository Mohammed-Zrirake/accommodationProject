import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar"; 
import StarRating from "../components/StarRating"; 
import Footer from "../components/Footer"; 
import { 
  HiLocationMarker, 
  
  HiOutlineHome, 
  HiOutlineUserGroup,

  HiOutlineChat,
  HiOutlineStar,
  HiOutlineExclamationCircle // For error state
} from "react-icons/hi";

import { HiExclamationCircle } from "react-icons/hi"; 
import { GiBathtub } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";


const CottageDetails = () => {
  const { id } = useParams();
  const [cottage, setCottage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get image URL (ensure this matches your server setup)
  const getImageUrl = (imageName) => `https://localhost:7263/images/${imageName}`;

  useEffect(() => {
    const fetchcottage = async () => {
      try {
        // --- ADAPTED: Fetch from the cottage API endpoint ---
        const response = await fetch(`https://localhost:7263/api/cottage/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch cottage (status: ${response.status})`);
        }
        const data = await response.json();
        setCottage(data);
        
        if (data.photos && data.photos.length > 0) {
          setMainImage(getImageUrl(data.photos[0]));
        }
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchcottage();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading cottage details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 p-4 bg-red-50">
        <HiOutlineExclamationCircle className="w-16 h-16 text-red-400 mb-4" />
        <p className="text-xl font-semibold text-center text-red-600">Error loading cottage</p>
        <p className="text-center mt-2 text-red-500">{error}</p>
      </div>
    );
  }

  if (!cottage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <HiOutlineHome className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl font-semibold">cottage not found</p>
      </div>
    );
  }

  // --- ADAPTED: cottage features to display ---
  // Removed 'floorNumber' and used cottage-specific icons
  const cottageFeatures = [
    { 
      icon: <IoBedOutline className="w-6 h-6" />, 
      title: "Bedrooms", 
      value: cottage.numberOfBedrooms 
    },
    { 
      icon: <GiBathtub className="w-6 h-6" />, 
      title: "Bathrooms", 
      value: cottage.numberOfBathrooms 
    },
    { 
      icon: <HiOutlineUserGroup className="w-6 h-6" />, 
      title: "Capacity", 
      value: `${cottage.capacity} guests` 
    }
  ];

  return (
    <>
      <NavBar />
      
      <div className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500/95">
            {cottage.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {/* This part will be hidden as `averageRating` is not in the cottage object */}
            {cottage.averageRating > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={cottage.averageRating} />
                <p className="font-medium text-gray-700">
                  {cottage.averageRating.toFixed(1)}/5
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-purple-900/75 font-bold">
              <HiLocationMarker className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm md:text-base">
                {cottage.address.street}, {cottage.address.city}, 
                {cottage.address.postalCode && ` ${cottage.address.postalCode},`} 
                {cottage.address.country}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="lg:w-1/2">
            <img 
              src={mainImage} 
              alt={`${cottage.name} main view`} 
              className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:w-1/2">
            {cottage.photos.slice(0, 4).map((photo, index) => (
              <img
                key={index}
                src={getImageUrl(photo)}
                alt={`${cottage.name} view ${index + 1}`}
                className={`w-full h-40 md:h-48 object-cover rounded-lg cursor-pointer transition-all ${
                  mainImage === getImageUrl(photo) 
                    ? 'ring-4 ring-blue-500' 
                    : 'hover:opacity-90'
                }`}
                onClick={() => setMainImage(getImageUrl(photo))}
              />
            ))}
          </div>
        </div>
        {/* Image Gallery */}
        

        {/* --- ADAPTED: Optional additional image grid --- */}
        {cottage.photos.length > 5 && (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
                {cottage.photos.slice(5).map((photo, index) => (
                    <img
                        key={index}
                        src={getImageUrl(photo)}
                        alt={`cottage view ${index + 6}`}
                        className="w-full h-40 object-cover rounded-lg cursor-pointer transition-all hover:opacity-90"
                        onClick={() => setMainImage(getImageUrl(photo))}
                    />
                ))}
            </div>
        )}

        {/* Details and Booking Section */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Details */}
          <div className="lg:w-2/3">
            {/* Features */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                cottage Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cottageFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100 text-center"
                  >
                    <div className="text-blue-600 mb-2">{feature.icon}</div>
                    <p className="font-semibold text-gray-900">{feature.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{feature.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {cottage.description}
              </p>
            </div>
            
            {/* Amenities Section - Will not render as amenities array is empty */}
            {cottage?.amenities?.length > 0 && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-2xl font-semibold mb-4">What this place offers</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                    {cottage.amenities.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <HiOutlineStar className="h-5 w-5 text-green-500" />
                            <p>{typeof item === 'string' ? item : item?.name ?? 'Unnamed Amenity'}</p>
                        </div>
                    ))}
                    </div>
                </div>
            )}

            {/* Rules Section - Will not render as rules is null */}
            {cottage.rules && (
              <div className="mb-10 pt-6 mt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">House Rules</h2>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-700">{cottage.rules}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow-xl rounded-xl p-6 sticky top-24">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {cottage.basePricePerNight} DH
                  </p>
                  <p className="text-gray-600">per night</p>
                </div>
                {cottage.averageRating > 0 && (
                  <div className="flex items-center gap-1">
                    <HiOutlineStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{cottage.averageRating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                      Check In
                    </label>
                    <input 
                      type="date" 
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                      Check Out
                    </label>
                    <input 
                      type="date" 
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                    <label className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                      Guests
                    </label>
                    <input 
                      type="number" 
                      min="1"
                      max={cottage.capacity}
                      defaultValue="1"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max capacity: {cottage.capacity} guests
                    </p>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition duration-300 flex items-center justify-center gap-2 mt-2"
                >
                  Book Now
                </button>
                <div className="flex items-center gap-1 text-gray-500">
                  <HiExclamationCircle className="w-4 h-4"/>
                <p className="text-xs  ">
                      You will not be charged yet.
                    </p>
                    </div>
              </form>
            </div>
          </div>
        </div>

        {/* Host Information */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex gap-6 items-start">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
              <HiOutlineHome className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {/* --- ADAPTED: Changed fallback to "cottage Manager" --- */}
                Hosted by {cottage.providerName || "cottage Manager"}
              </h3>
              
              <button className="mt-4 px-6 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2">
                <HiOutlineChat className="w-5 h-5" />
                Contact Host
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CottageDetails;