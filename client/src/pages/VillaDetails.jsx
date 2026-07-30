import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import StarRating from "../components/StarRating";
import BookingCard from "../components/BookingCard"; // Added import
import Footer from "../components/Footer";
import {
  HiLocationMarker,
  HiHome,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineChat,
  HiOutlineStar,
  HiOutlineExclamationCircle, // For error state
  HiExclamationCircle
} from "react-icons/hi";

// New icons that might be relevant for a villa
import { FaSwimmingPool } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";

const VillaDetails = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking success handler (placeholder)
  const ActionOnBookingSuccess = () => {
    // pass
  };

  // Helper function to get image URL
  const getImageUrl = (imageName) => `https://localhost:7263/images/${imageName}`;

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const response = await fetch(`https://localhost:7263/api/villa/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch villa (status: ${response.status})`);
        }
        const data = await response.json();
        setVilla(data);

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

    fetchVilla();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading villa details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 p-4 bg-red-50">
        <HiOutlineExclamationCircle className="w-16 h-16 text-red-400 mb-4" />
        <p className="text-xl font-semibold text-center text-red-600">Error loading villa</p>
        <p className="text-center mt-2 text-red-500">{error}</p>
      </div>
    );
  }

  if (!villa) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <HiOutlineHome className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl font-semibold">Villa not found</p>
      </div>
    );
  }

  // Villa features to display
  const villaFeatures = [
    {
      icon: <IoBedOutline className="w-6 h-6" />,
      title: "Bedrooms",
      value: villa.numberOfBedrooms
    },
    {
      icon: <GiBathtub className="w-6 h-6" />,
      title: "Bathrooms",
      value: villa.numberOfBathrooms
    },
    {
      icon: <HiOutlineUserGroup className="w-6 h-6" />,
      title: "Capacity",
      value: `${villa.capacity} guests`
    },
    {
      icon: <FaSwimmingPool className="w-6 h-6" />,
      title: "Feature",
      value: "Pool with a view"
    }
  ];

  return (
    <>
      <NavBar />

      <div className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500/95">
            {villa.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-3">
            {villa.averageRating > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={villa.averageRating} />
                <p className="font-medium text-gray-700">
                  {villa.averageRating.toFixed(1)}/5
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-purple-900/75 font-bold">
              <HiLocationMarker className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm md:text-base">
                {villa.address.street}, {villa.address.city},
                {villa.address.postalCode && ` ${villa.address.postalCode},`}
                {villa.address.country}
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="lg:w-1/2">
            <img
              src={mainImage}
              alt={`${villa.name} main view`}
              className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:w-1/2">
            {villa.photos.slice(0, 4).map((photo, index) => (
              <img
                key={index}
                src={getImageUrl(photo)}
                alt={`${villa.name} view ${index + 1}`}
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

        {/* Additional images if more than 5 */}
        {villa.photos.length > 5 && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
            {villa.photos.slice(5).map((photo, index) => (
              <img
                key={index}
                src={getImageUrl(photo)}
                alt={`Villa view ${index + 6}`}
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
                Villa Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {villaFeatures.map((feature, index) => (
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
                {villa.description}
              </p>
            </div>

            {/* Amenities */}
            {villa?.amenities?.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-2xl font-semibold mb-4">What this place offers</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                  {villa.amenities.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <HiOutlineStar className="h-5 w-5 text-green-500" />
                      <p>{typeof item === 'string' ? item : item?.name ?? 'Unnamed Amenity'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules */}
            {villa.rules && (
              <div className="mb-10 pt-6 mt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Villa Rules</h2>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-700">{villa.rules}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card (replaces the old form) */}
          <div className="lg:w-1/3">
            <BookingCard
                accommondationId={villa.id}
                unitType="accommodation"
              capacity={villa.capacity}
              basePrice={villa.basePricePerNight}
              onBookingSuccess={ActionOnBookingSuccess}
            />
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
                Hosted by {villa.providerName || "Villa Manager"}
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

export default VillaDetails;
