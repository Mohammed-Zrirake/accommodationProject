"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api, { API_BASE_URL } from "@/lib/api";
import { Hostel } from "@/types";
import DormCard from "@/components/guest/DormCard";
import RoomCard from "@/components/guest/RoomCard";
import { MapPin, Users, Bed, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HostelDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get<Hostel>(`/api/hostel/${id}`)
      .then((res) => setHostel(res.data))
      .catch((err) => console.error("Error fetching hostel:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center text-gray-500">Loading hostel details...</div>;
  }

  if (!hostel) {
    return <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center font-bold text-gray-800">Hostel not found</div>;
  }

  const primaryPhoto = hostel.photos && hostel.photos.length > 0
    ? (hostel.photos[0].startsWith("http") ? hostel.photos[0] : `${API_BASE_URL}/images/${hostel.photos[0]}`)
    : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-12 space-y-12">
      <div>
        <Link href="/search?type=Hostel" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Hostels</span>
        </Link>
      </div>

      <div className="space-y-3">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full text-xs font-semibold border border-indigo-200">
          Youth & Social Hostel
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900">{hostel.name}</h1>
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{hostel.address?.street}, {hostel.address?.city}, {hostel.address?.country}</span>
        </p>
      </div>

      <div className="h-96 md:h-[480px] rounded-3xl overflow-hidden shadow-sm bg-gray-100">
        <img src={primaryPhoto} alt={hostel.name} className="w-full h-full object-cover" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 font-serif">Community & Vibes</h2>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{hostel.description}</p>
      </div>

      {/* Dorms Section */}
      <div className="border-t pt-10 space-y-6">
        <div className="flex items-center gap-2">
          <Bed className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Shared Dormitories</h2>
        </div>
        {hostel.dorms && hostel.dorms.length > 0 ? (
          <div className="space-y-6">
            {hostel.dorms.map((dorm) => (
              <DormCard key={dorm.id} dorm={dorm} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No dorm beds currently open for booking.</p>
        )}
      </div>

      {/* Private Rooms Section */}
      {hostel.privateRooms && hostel.privateRooms.length > 0 && (
        <div className="border-t pt-10 space-y-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Private Rooms</h2>
          </div>
          <div className="space-y-6">
            {hostel.privateRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
