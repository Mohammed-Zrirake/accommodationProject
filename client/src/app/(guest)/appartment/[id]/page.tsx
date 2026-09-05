"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api, { API_BASE_URL } from "@/lib/api";
import BookingCard from "@/components/guest/BookingCard";
import { MapPin, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AppartmentDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [apt, setApt] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/api/appartment/${id}`)
      .then((res) => setApt(res.data))
      .catch((err) => console.error("Error fetching apartment:", err))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center text-gray-500">Loading apartment details...</div>;
  }

  if (!apt) {
    return <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center font-bold text-gray-800">Apartment not found</div>;
  }

  const primaryPhoto = apt.photos && apt.photos.length > 0
    ? (apt.photos[0].startsWith("http") ? apt.photos[0] : `${API_BASE_URL}/images/${apt.photos[0]}`)
    : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-12 space-y-8">
      <div>
        <Link href="/search?type=Appartment" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Apartments</span>
        </Link>
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
          Modern Apartment
        </span>
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900">{apt.name}</h1>
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{apt.address?.street}, {apt.address?.city}, {apt.address?.country}</span>
        </p>
      </div>

      <div className="h-96 md:h-[480px] rounded-3xl overflow-hidden shadow-sm bg-gray-100">
        <img src={primaryPhoto} alt={apt.name} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-serif mb-3">About this space</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{apt.description}</p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 font-serif">Included Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Elevator Access", "High-speed Wi-Fi", "Fully Equipped Kitchen", "Washing Machine", "Air Conditioning", "Balcony"].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <BookingCard
            unitId={apt.id}
            unitType="accommodation"
            basePrice={apt.basePricePerNight}
            capacity={apt.capacity}
          />
        </div>
      </div>
    </div>
  );
}
