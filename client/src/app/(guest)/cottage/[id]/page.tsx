"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api, { API_BASE_URL } from "@/lib/api";
import BookingCard from "@/components/guest/BookingCard";
import { MapPin, Flame, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CottageDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [cottage, setCottage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/api/cottage/${id}`)
      .then((res) => setCottage(res.data))
      .catch((err) => console.error("Error fetching cottage:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center text-gray-500">Loading cottage details...</div>;
  }

  if (!cottage) {
    return <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center font-bold text-gray-800">Cottage not found</div>;
  }

  const primaryPhoto = cottage.photos && cottage.photos.length > 0
    ? (cottage.photos[0].startsWith("http") ? cottage.photos[0] : `${API_BASE_URL}/images/${cottage.photos[0]}`)
    : "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-12 space-y-8">
      <div>
        <Link href="/search?type=Cottage" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cottages</span>
        </Link>
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-semibold border border-amber-200">
          Cozy Country Cottage
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900">{cottage.name}</h1>
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{cottage.address?.street}, {cottage.address?.city}, {cottage.address?.country}</span>
        </p>
      </div>

      <div className="h-96 md:h-[480px] rounded-3xl overflow-hidden shadow-sm bg-gray-100">
        <img src={primaryPhoto} alt={cottage.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-serif mb-3">About this cottage</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{cottage.description}</p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 font-serif">Cottage Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Wood Fireplace", "Mountain / Forest Views", "Kitchenette", "Outdoor Firepit & Seating", "Hiking Trails Access", "Pet Friendly"].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <BookingCard
            unitId={cottage.id}
            unitType="accommodation"
            basePrice={cottage.basePricePerNight}
            capacity={cottage.capacity}
          />
        </div>
      </div>
    </div>
  );
}
