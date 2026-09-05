"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api, { API_BASE_URL } from "@/lib/api";
import { Hotel } from "@/types";
import RoomCard from "@/components/guest/RoomCard";
import { MapPin, Star, Wifi, Coffee, Sparkles, CheckCircle2 } from "lucide-react";

export default function HotelDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get<Hotel>(`/api/hotel/${id}`)
      .then((res) => setHotel(res.data))
      .catch((err) => console.error("Error fetching hotel:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500">Loading hotel details...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Hotel not found</h2>
      </div>
    );
  }

  const primaryPhoto = hotel.photos && hotel.photos.length > 0
    ? (hotel.photos[0].startsWith("http") ? hotel.photos[0] : `${API_BASE_URL}/images/${hotel.photos[0]}`)
    : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {hotel.starRating > 0 && (
            <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {hotel.starRating} Star Luxury
            </span>
          )}
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
            Verified Hotel
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900">{hotel.name}</h1>

        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{hotel.address?.street}, {hotel.address?.city}, {hotel.address?.country}</span>
        </p>
      </div>

      {/* Main Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden shadow-sm h-96 md:h-[480px]">
        <div className="md:col-span-2 h-full bg-gray-100 overflow-hidden">
          <img src={primaryPhoto} alt={hotel.name} className="w-full h-full object-cover" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-4 h-full">
          <div className="bg-gray-100 overflow-hidden">
            <img
              src={hotel.photos?.[1] ? (hotel.photos[1].startsWith("http") ? hotel.photos[1] : `${API_BASE_URL}/images/${hotel.photos[1]}`) : "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600"}
              alt="Hotel room preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-gray-100 overflow-hidden">
            <img
              src={hotel.photos?.[2] ? (hotel.photos[2].startsWith("http") ? hotel.photos[2] : `${API_BASE_URL}/images/${hotel.photos[2]}`) : "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600"}
              alt="Hotel amenities"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* About & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-serif mb-3">About this accommodation</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{hotel.description}</p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 font-serif">What this place offers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["High-speed Free Wi-Fi", "Air Conditioning", "24/7 Front Desk", "Swimming Pool", "Complimentary Breakfast", "Room Service"].map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Highlights Card */}
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4 h-fit">
          <h3 className="font-bold text-gray-900">Hotel Highlights</h3>
          <ul className="space-y-3 text-xs text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Prime location in {hotel.address?.city}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Dedicated hotel concierge and daily housekeeping</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Flexible cancellation options</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Available Rooms Section */}
      <div className="border-t pt-12 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Available Rooms</h2>
          <p className="text-sm text-gray-500 mt-1">Select a room to see exact dates and complete your reservation</p>
        </div>

        {hotel.rooms && hotel.rooms.length > 0 ? (
          <div className="space-y-6">
            {hotel.rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white border border-gray-200 rounded-2xl text-center space-y-3">
            <p className="text-gray-500 text-sm">No rooms are currently configured for this hotel.</p>
          </div>
        )}
      </div>
    </div>
  );
}
