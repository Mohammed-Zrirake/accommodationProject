"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Hotel } from "@/types";
import HotelCard from "@/components/guest/HotelCard";
import PropertyCard from "@/components/guest/PropertyCard";
import { Search, MapPin, Calendar, Users, Building, Home, Shield, Sparkles, Award } from "lucide-react";

const propertyCategories = [
  { name: "All", type: "" },
  { name: "Hotels", type: "Hotel" },
  { name: "Villas", type: "Villa" },
  { name: "Apartments", type: "Appartment" },
  { name: "Riads", type: "Riad" },
  { name: "Hostels", type: "Hostel" },
  { name: "Cottages", type: "Cottage" },
];

export default function HomePage() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [villas, setVillas] = useState<any[]>([]);
  const [riads, setRiads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelsRes, villasRes, riadsRes] = await Promise.allSettled([
          api.get<Hotel[]>("/api/hotel"),
          api.get<any[]>("/api/villa"),
          api.get<any[]>("/api/riad"),
        ]);

        if (hotelsRes.status === "fulfilled") setHotels(hotelsRes.value.data);
        if (villasRes.status === "fulfilled") setVillas(villasRes.value.data);
        if (riadsRes.status === "fulfilled") setRiads(riadsRes.value.data);
      } catch (err) {
        console.warn("Could not fetch properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (selectedType) params.set("type", selectedType);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gray-900 text-white px-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40 scale-105 animate-pulse transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 pt-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Discover extraordinary stays worldwide
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight leading-tight">
            Find your sanctuary, <br />
            <span className="italic font-normal text-blue-400">wherever you wander</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
            From historic boutique riads to coastal villas and modern urban hotels, experience authentic hospitality.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="bg-white text-gray-800 p-3 md:p-4 rounded-3xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-3 items-center border border-gray-100"
          >
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Destination
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Where are you going? (e.g. Marrakech)"
                  className="w-full text-sm font-medium focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="w-full md:w-48 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <Building className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full text-sm font-medium focus:outline-none bg-transparent cursor-pointer"
                >
                  {propertyCategories.map((c) => (
                    <option key={c.name} value={c.type}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* Categories Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Explore by Category</h2>
            <p className="text-sm text-gray-500 mt-1">Select an accommodation style tailored to your journey</p>
          </div>
          <Link href="/search" className="text-sm font-semibold text-blue-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
          {propertyCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                setSelectedType(category.type);
                router.push(category.type ? `/search?type=${category.type}` : "/search");
              }}
              className="px-6 py-3 rounded-full text-sm font-medium border border-gray-200 bg-white hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Premier Hotels & Resorts</h2>
          <p className="text-sm text-gray-500 mt-1">Handpicked luxury stays with unmatched comfort</p>
        </div>

        {hotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.slice(0, 6).map((hotel) => (
              <HotelCard key={hotel.hotelId} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fallback mock cards if database is freshly initialized */}
            <HotelCard
              hotel={{
                hotelId: "demo-1",
                name: "Royal Mansour Palace",
                description: "An oasis of elegance and Moroccan craftsmanship nestled in the heart of the Medina.",
                address: { street: "Rue Abou Abbas", city: "Marrakech", country: "Morocco" },
                photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600"],
                starRating: 5,
                rooms: [],
              }}
            />
            <HotelCard
              hotel={{
                hotelId: "demo-2",
                name: "La Mamounia Luxury Resort",
                description: "Historic luxury hotel surrounded by century-old gardens and world-class spa facilities.",
                address: { street: "Avenue Bab Jdid", city: "Marrakech", country: "Morocco" },
                photos: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600"],
                starRating: 5,
                rooms: [],
              }}
            />
            <HotelCard
              hotel={{
                hotelId: "demo-3",
                name: "Oceanfront Oasis Bay",
                description: "Panoramic Atlantic ocean views, rooftop infinity pool, and fresh seaside dining.",
                address: { street: "Boulevard de la Corniche", city: "Casablanca", country: "Morocco" },
                photos: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600"],
                starRating: 4,
                rooms: [],
              }}
            />
          </div>
        )}
      </section>

      {/* Riads & Villas Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">Authentic Riads & Private Villas</h2>
              <p className="text-sm text-gray-500 mt-1">Exclusive detached properties with private courtyards and pools</p>
            </div>
            <Link href="/search?type=Riad" className="text-sm font-semibold text-blue-600 hover:underline">
              Browse Riads →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {riads.length > 0 ? (
              riads.slice(0, 3).map((r) => <PropertyCard key={r.riadId} property={r} type="Riad" />)
            ) : (
              <>
                <PropertyCard
                  property={{
                    id: "demo-riad-1",
                    name: "Riad Dar Anika",
                    description: "Traditional Moroccan architecture featuring a serene courtyard fountain and rooftop sun terrace.",
                    photos: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=600"],
                    address: { city: "Marrakech", country: "Morocco" },
                    basePricePerNight: 1200,
                    capacity: 8,
                  }}
                  type="Riad"
                />
                <PropertyCard
                  property={{
                    id: "demo-villa-1",
                    name: "Villa Palmeraie Serenity",
                    description: "Secluded private villa with lush palm gardens, private heated pool, and full butler service.",
                    photos: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600"],
                    address: { city: "Marrakech", country: "Morocco" },
                    basePricePerNight: 3500,
                    capacity: 12,
                  }}
                  type="Villa"
                />
                <PropertyCard
                  property={{
                    id: "demo-cottage-1",
                    name: "Atlas Mountain Stone Cottage",
                    description: "Cozy stone retreat with fireplace, sweeping panoramic mountain views, and guided hiking trails.",
                    photos: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600"],
                    address: { city: "Imlil", country: "Morocco" },
                    basePricePerNight: 850,
                    capacity: 4,
                  }}
                  type="Cottage"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Secure & Verified Stays</h3>
          <p className="text-sm text-gray-500">Every host and property listing is thoroughly vetted for safety and quality.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Best Rate Guarantee</h3>
          <p className="text-sm text-gray-500">Direct booking with owners ensures zero hidden middleman markups.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Instant Confirmation</h3>
          <p className="text-sm text-gray-500">Real-time calendar availability so you can reserve your getaway with confidence.</p>
        </div>
      </section>
    </div>
  );
}
