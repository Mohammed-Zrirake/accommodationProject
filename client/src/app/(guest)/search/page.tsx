"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Hotel } from "@/types";
import HotelCard from "@/components/guest/HotelCard";
import PropertyCard from "@/components/guest/PropertyCard";
import { Search, Filter, MapPin, Building, SlidersHorizontal } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cityParam = searchParams.get("city") || "";
  const typeParam = searchParams.get("type") || "";

  const [city, setCity] = useState(cityParam);
  const [selectedType, setSelectedType] = useState(typeParam);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [villas, setVillas] = useState<any[]>([]);
  const [riads, setRiads] = useState<any[]>([]);
  const [appartements, setAppartements] = useState<any[]>([]);
  const [hostels, setHostels] = useState<any[]>([]);
  const [cottages, setCottages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCity(cityParam);
    setSelectedType(typeParam);
  }, [cityParam, typeParam]);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [hRes, vRes, rRes, aRes, hoRes, cRes] = await Promise.allSettled([
          api.get<Hotel[]>("/api/hotel"),
          api.get<any[]>("/api/villa"),
          api.get<any[]>("/api/riad"),
          api.get<any[]>("/api/appartment"),
          api.get<any[]>("/api/hostel"),
          api.get<any[]>("/api/cottage"),
        ]);

        if (hRes.status === "fulfilled") setHotels(hRes.value.data);
        if (vRes.status === "fulfilled") setVillas(vRes.value.data);
        if (rRes.status === "fulfilled") setRiads(rRes.value.data);
        if (aRes.status === "fulfilled") setAppartements(aRes.value.data);
        if (hoRes.status === "fulfilled") setHostels(hoRes.value.data);
        if (cRes.status === "fulfilled") setCottages(cRes.value.data);
      } catch (err) {
        console.warn("Failed to fetch search results:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (selectedType) params.set("type", selectedType);
    router.push(`/search?${params.toString()}`);
  };

  // Aggregate and filter results
  const filteredResults = useMemo(() => {
    let list: Array<{ item: any; category: string }> = [];

    if (!selectedType || selectedType.toLowerCase() === "hotel") {
      hotels.forEach((h) => list.push({ item: h, category: "Hotel" }));
    }
    if (!selectedType || selectedType.toLowerCase() === "villa") {
      villas.forEach((v) => list.push({ item: v, category: "Villa" }));
    }
    if (!selectedType || selectedType.toLowerCase() === "riad") {
      riads.forEach((r) => list.push({ item: r, category: "Riad" }));
    }
    if (!selectedType || selectedType.toLowerCase() === "appartment" || selectedType.toLowerCase() === "apartment") {
      appartements.forEach((a) => list.push({ item: a, category: "Appartment" }));
    }
    if (!selectedType || selectedType.toLowerCase() === "hostel") {
      hostels.forEach((h) => list.push({ item: h, category: "Hostel" }));
    }
    if (!selectedType || selectedType.toLowerCase() === "cottage") {
      cottages.forEach((c) => list.push({ item: c, category: "Cottage" }));
    }

    if (city.trim()) {
      const q = city.trim().toLowerCase();
      list = list.filter(({ item }) => {
        const itemCity = item.address?.city?.toLowerCase() || "";
        const itemName = item.name?.toLowerCase() || "";
        return itemCity.includes(q) || itemName.includes(q);
      });
    }

    return list;
  }, [hotels, villas, riads, appartements, hostels, cottages, selectedType, city]);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-12 space-y-10">
      {/* Top Filter Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <form onSubmit={handleApplyFilter} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              City / Location
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="All Cities"
              className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              Property Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="Hotel">Hotel</option>
              <option value="Villa">Villa</option>
              <option value="Appartment">Apartment</option>
              <option value="Riad">Riad</option>
              <option value="Hostel">Hostel</option>
              <option value="Cottage">Cottage</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              Max Price: {maxPrice} DH
            </label>
            <input
              type="range"
              min="200"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-gray-200 rounded-lg mt-3"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-baseline justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">
            {city ? `Stays in ${city}` : "Available Accommodations"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Found {filteredResults.length} properties matching your criteria
          </p>
        </div>
      </div>

      {/* Results Grid */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResults.map(({ item, category }, i) =>
            category === "Hotel" ? (
              <HotelCard key={item.hotelId || i} hotel={item} />
            ) : (
              <PropertyCard key={item.id || item.hotelId || item.riadId || i} property={item} type={category} />
            )
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
          <Building className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-xl font-bold text-gray-800">No properties found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Try adjusting your search criteria, clearing the city filter, or selecting &quot;All Types&quot;.
          </p>
          <button
            onClick={() => {
              setCity("");
              setSelectedType("");
              router.push("/search");
            }}
            className="px-6 py-2.5 bg-blue-50 text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
