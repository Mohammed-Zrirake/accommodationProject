import React from "react";
import Link from "next/link";
import { Hotel } from "@/types";
import { MapPin, Star } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const imageUrl = hotel.photos && hotel.photos.length > 0
    ? (hotel.photos[0].startsWith("http") ? hotel.photos[0] : `${API_BASE_URL}/images/${hotel.photos[0]}`)
    : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600";

  return (
    <Link
      href={`/hotel/${hotel.hotelId}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hotel.starRating > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-amber-700 flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{hotel.starRating} Stars</span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{hotel.address?.city}, {hotel.address?.country}</span>
          </p>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {hotel.description}
        </p>

        <div className="border-t pt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{hotel.rooms?.length || 0} Room types available</span>
          <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
