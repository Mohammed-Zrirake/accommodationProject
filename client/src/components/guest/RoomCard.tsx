import React from "react";
import Link from "next/link";
import { Room } from "@/types";
import { Users, Wifi, Coffee, Tv } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const imageUrl = room.photos && room.photos.length > 0
    ? (room.photos[0].startsWith("http") ? room.photos[0] : `${API_BASE_URL}/images/${room.photos[0]}`)
    : "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600";

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
      <div className="md:w-64 h-48 md:h-auto shrink-0 relative bg-gray-100">
        <img src={imageUrl} alt={room.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold text-gray-900">{room.name}</h4>
            <div className="text-right">
              <span className="text-xl font-bold text-blue-600">{room.basePricePerNight} DH</span>
              <span className="text-xs text-gray-500"> / night</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span>Capacity: {room.capacity} guests</span>
          </p>
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{room.description}</p>
        </div>

        {room.amenities && room.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 4).map((amenity, i) => (
              <span key={i} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
                {amenity.name}
              </span>
            ))}
          </div>
        )}

        <div className="border-t pt-3 flex justify-end">
          <Link
            href={`/room/${room.id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Select Room & Book
          </Link>
        </div>
      </div>
    </div>
  );
}
