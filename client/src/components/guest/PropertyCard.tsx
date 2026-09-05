import React from "react";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface PropertyCardProps {
  property: {
    id?: string;
    hotelId?: string;
    hostelId?: string;
    riadId?: string;
    name: string;
    description: string;
    photos?: string[];
    basePricePerNight?: number;
    capacity?: number;
    address?: { city?: string; country?: string };
    type?: string;
  };
  type: string;
}

export default function PropertyCard({ property, type }: PropertyCardProps) {
  const id = property.id || property.hotelId || property.hostelId || property.riadId;
  const linkHref = `/${type.toLowerCase()}/${id}`;

  const imageUrl = property.photos && property.photos.length > 0
    ? (property.photos[0].startsWith("http") ? property.photos[0] : `${API_BASE_URL}/images/${property.photos[0]}`)
    : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600";

  return (
    <Link
      href={linkHref}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-800 capitalize shadow-sm">
          {type}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {property.name}
          </h3>
          {property.address && (
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{property.address.city}, {property.address.country}</span>
            </p>
          )}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
          {property.description}
        </p>

        <div className="border-t pt-3 flex items-center justify-between">
          {property.basePricePerNight ? (
            <div>
              <span className="text-base font-bold text-gray-900">{property.basePricePerNight} DH</span>
              <span className="text-xs text-gray-500"> / night</span>
            </div>
          ) : (
            <span className="text-xs text-gray-500">Multiple units</span>
          )}

          {property.capacity && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5" />
              <span>{property.capacity} guests</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
