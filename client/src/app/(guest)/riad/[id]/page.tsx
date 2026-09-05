"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api, { API_BASE_URL } from "@/lib/api";
import { Riad } from "@/types";
import RoomCard from "@/components/guest/RoomCard";
import { MapPin, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RiadDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [riad, setRiad] = useState<Riad | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get<Riad>(`/api/riad/${id}`)
      .then((res) => setRiad(res.data))
      .catch((err) => console.error("Error fetching riad:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center text-gray-500">Loading riad details...</div>;
  }

  if (!riad) {
    return <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center font-bold text-gray-800">Riad not found</div>;
  }

  const primaryPhoto = riad.photos && riad.photos.length > 0
    ? (riad.photos[0].startsWith("http") ? riad.photos[0] : `${API_BASE_URL}/images/${riad.photos[0]}`)
    : "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-12 space-y-12">
      <div>
        <Link href="/search?type=Riad" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Riads</span>
        </Link>
      </div>

      <div className="space-y-3">
        <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-semibold border border-amber-200">
          Authentic Traditional Riad
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900">{riad.name}</h1>
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{riad.address?.street}, {riad.address?.city}, {riad.address?.country}</span>
        </p>
      </div>

      <div className="h-96 md:h-[480px] rounded-3xl overflow-hidden shadow-sm bg-gray-100">
        <img src={primaryPhoto} alt={riad.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Experience Moroccan Hospitality</h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{riad.description}</p>

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 font-serif">Riad Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Central Courtyard Fountain", "Rooftop Panoramic Terrace", "Fresh Mint Tea on Arrival", "Traditional Moroccan Breakfast", "Hammam / Spa Access", "Free Wi-Fi"].map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Available Riad Rooms */}
      <div className="border-t pt-12 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Available Suites & Rooms</h2>
        {riad.rooms && riad.rooms.length > 0 ? (
          <div className="space-y-6">
            {riad.rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No suites currently available for this Riad.</p>
        )}
      </div>
    </div>
  );
}
