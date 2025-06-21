import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import StarRating from "../components/StarRating";

import { 
  HiLocationMarker, 
  HiHome, 
  HiOutlineHome, 
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineChat,
  HiOutlineStar
} from "react-icons/hi";

const ApartmentDetails = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get image URL
  const getImageUrl = (imageName) => `https://localhost:7263/images/${imageName}`;

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await fetch(`https://localhost:7263/api/appartment/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch apartment (status: ${response.status})`);
        }
        const data = await response.json();
        setApartment(data);
        
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

    fetchApartment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading apartment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 p-4">
        <HiOutlineStar className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-xl font-semibold text-center">Error loading apartment</p>
        <p className="text-center mt-2">{error}</p>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <HiOutlineHome className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl font-semibold">Apartment not found</p>
      </div>
    );
  }

  // Apartment features to display
  const apartmentFeatures = [
    { 
      icon: <HiHome className="w-6 h-6" />, 
      title: "Bedrooms", 
      value: apartment.numberOfBedrooms 
    },
    { 
      icon: <HiOutlineUserGroup className="w-6 h-6" />, 
      title: "Bathrooms", 
      value: apartment.numberOfBathrooms 
    },
    { 
      icon: <HiOutlineUser className="w-6 h-6" />, 
      title: "Capacity", 
      value: `${apartment.capacity} guests` 
    },
    { 
      icon: <HiOutlineHome className="w-6 h-6" />, 
      title: "Floor", 
      value: apartment.floorNumber 
    },
  ];

  return (
    <>
      <NavBar />
      
      <div className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500/95">
            {apartment.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {apartment.averageRating > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={apartment.averageRating} />
                <p className="font-medium text-gray-700">
                  {apartment.averageRating.toFixed(1)}/5
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-purple-900/75 font-bold">
              <HiLocationMarker className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm md:text-base">
                {apartment.address.street}, {apartment.address.city}, 
                {apartment.address.postalCode && ` ${apartment.address.postalCode},`} 
                {apartment.address.country}
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="lg:w-1/2">
            <img 
              src={mainImage} 
              alt="Main apartment view" 
              className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 lg:w-1/2">
            {apartment.photos.slice(1, 5).map((photo, index) => (
              <img
                key={index}
                src={getImageUrl(photo)}
                alt={`Apartment view ${index + 1}`}
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
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {apartment.photos.length > 4? (apartment.photos.slice(5).map((photo, index) => (
              <img
                key={index}
                src={getImageUrl(photo)}
                alt={`Apartment view ${index + 1}`}
                className={`w-full h-40 md:h-48 object-cover rounded-lg cursor-pointer transition-all ${
                  mainImage === getImageUrl(photo) 
                    ? 'ring-4 ring-blue-500' 
                    : 'hover:opacity-90'
                }`}
                onClick={() => setMainImage(getImageUrl(photo))}
              />
            ))):null}
          </div>

        {/* Details and Booking Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Details */}
          <div className="lg:w-2/3">
            {/* Pricing and Features */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Apartment Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {apartmentFeatures.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="text-blue-600 mb-2">{feature.icon}</div>
                    <p className="font-medium text-gray-900">{feature.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{feature.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {apartment.description}
              </p>
            </div>
                {apartment?.amenities?.length > 0 && (
  <div className="border-t border-gray-200 pt-6 mt-6">
    <h3 className="text-2xl font-semibold mb-4 font-playfair">What this place offers</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
      {apartment.amenities.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            />
          </svg>
          <p>{typeof item === 'string' ? item : item?.name ?? 'Unnamed Amenity'}</p>
        </div>
      ))}
    </div>
  </div>
)}

            {/* Rules */}
            {apartment.rules && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">House Rules</h2>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-700">{apartment.rules}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow-xl rounded-xl p-6 sticky top-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {apartment.basePricePerNight} DH
                  </p>
                  <p className="text-gray-600">per night</p>
                </div>
                {apartment.averageRating > 0 && (
                  <div className="flex items-center gap-1">
                    <HiOutlineStar className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-medium">{apartment.averageRating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              
              <form className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className=" font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <HiOutlineCalendar className="w-5 h-5 text-gray-500" />
                      Check In
                    </label>
                    <input 
                      type="date" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className=" font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <HiOutlineCalendar className="w-5 h-5 text-gray-500" />
                      Check Out
                    </label>
                    <input 
                      type="date" 
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className=" font-medium text-gray-800 mb-2 flex items-center gap-2">
                      <HiOutlineUser className="w-5 h-5 text-gray-500" />
                      Guests
                    </label>
                    <input 
                      type="number" 
                      min="1"
                      max={apartment.capacity}
                      defaultValue="1"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Max capacity: {apartment.capacity} guests
                    </p>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition duration-300 flex items-center justify-center gap-2 mt-2"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Host Information */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex gap-6 items-start">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
              <HiOutlineHome className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Hosted by {apartment.providerName || "Property Manager"}
              </h3>
              <button className="mt-4 px-6 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2">
                <HiOutlineChat className="w-5 h-5" />
                Contact Host
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApartmentDetails;