"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api, { API_BASE_URL } from "@/lib/api";
import { Room } from "@/types";
import BookingCard from "@/components/guest/BookingCard";
import { Users, Wifi, Tv, Coffee, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RoomDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [room, setRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get<Room>(`/api/room/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error("Error fetching room:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500">Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Room not found</h2>
      </div>
    );
  }

  const primaryPhoto = room.photos && room.photos.length > 0
    ? (room.photos[0].startsWith("http") ? room.photos[0] : `${API_BASE_URL}/images/${room.photos[0]}`)
    : "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href={room.hotelId ? `/hotel/${room.hotelId}` : "/search"}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Hotel / Listings</span>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900">{room.name}</h1>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span>Accommodates up to {room.capacity} guests</span>
        </p>
      </div>

      {/* Main Image Banner */}
      <div className="h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-sm bg-gray-100">
        <img src={primaryPhoto} alt={room.name} className="w-full h-full object-cover" />
      </div>

      {/* Content & Booking Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-serif mb-3">Room Overview</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{room.description}</p>
          </div>

          {room.rules && (
            <div className="border-t pt-6 space-y-2">
              <h3 className="text-base font-bold text-gray-900">House Rules</h3>
              <p className="text-sm text-gray-600">{room.rules}</p>
            </div>
          )}

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900">Amenities & Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {(room.amenities && room.amenities.length > 0 ? room.amenities : [
                { name: "High-Speed Wi-Fi" },
                { name: "Private En-Suite Bathroom" },
                { name: "Air Conditioning" },
                { name: "Smart TV with Streaming" },
              ]).map((a: any, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Booking Card Widget */}
        <div className="lg:col-span-1">
          <BookingCard
            unitId={room.id}
            unitType="room"
            basePrice={room.basePricePerNight}
            capacity={room.capacity}
          />
        </div>
      </div>
    </div>
  );
}
