"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api, { API_BASE_URL } from "@/lib/api";
import { PlusCircle, Building2, Trash2, Bed, MapPin, Eye, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface OwnerProperty {
  id?: string;
  hotelId?: string;
  hostelId?: string;
  riadId?: string;
  name: string;
  description: string;
  type: string;
  address?: { city?: string; country?: string; street?: string };
  photos?: string[];
  basePricePerNight?: number;
  capacity?: number;
  rooms?: any[];
  dorms?: any[];
}

export default function OwnerPropertiesPage() {
  const [properties, setProperties] = useState<OwnerProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const [hotels, villas, riads, apts, hostels, cottages] = await Promise.allSettled([
        api.get<any[]>("/api/hotel"),
        api.get<any[]>("/api/villa"),
        api.get<any[]>("/api/riad"),
        api.get<any[]>("/api/appartment"),
        api.get<any[]>("/api/hostel"),
        api.get<any[]>("/api/cottage"),
      ]);

      const all: OwnerProperty[] = [];
      if (hotels.status === "fulfilled") hotels.value.data.forEach((h) => all.push({ ...h, type: "Hotel" }));
      if (villas.status === "fulfilled") villas.value.data.forEach((v) => all.push({ ...v, type: "Villa" }));
      if (riads.status === "fulfilled") riads.value.data.forEach((r) => all.push({ ...r, type: "Riad" }));
      if (apts.status === "fulfilled") apts.value.data.forEach((a) => all.push({ ...a, type: "Appartment" }));
      if (hostels.status === "fulfilled") hostels.value.data.forEach((h) => all.push({ ...h, type: "Hostel" }));
      if (cottages.status === "fulfilled") cottages.value.data.forEach((c) => all.push({ ...c, type: "Cottage" }));

      setProperties(all);
    } catch (err) {
      console.error("Could not fetch owner properties:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string, type: string) => {
    if (!confirm("Are you sure you want to delete this property listing?")) return;
    try {
      await api.delete(`/api/${type.toLowerCase()}/${id}`);
      toast.success("Property deleted successfully.");
      fetchProperties();
    } catch (err) {
      toast.error("Failed to delete property.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900">My Properties</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your accommodation listings, room configurations, and availability
          </p>
        </div>
        <Link
          href="/owner/properties/add"
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-500">Loading your property listings...</div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {properties.map((prop, i) => {
            const propId = prop.hotelId || prop.hostelId || prop.riadId || prop.id || "";
            const isContainer = ["Hotel", "Hostel", "Riad"].includes(prop.type);
            const imageUrl = prop.photos && prop.photos.length > 0
              ? (prop.photos[0].startsWith("http") ? prop.photos[0] : `${API_BASE_URL}/images/${prop.photos[0]}`)
              : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400";

            return (
              <div
                key={propId || i}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={imageUrl}
                    alt={prop.name}
                    className="w-24 h-24 rounded-xl object-cover bg-gray-100 shrink-0"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {prop.type}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                        Active
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{prop.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{prop.address?.city}, {prop.address?.country}</span>
                    </p>
                    {isContainer ? (
                      <p className="text-xs text-gray-600">
                        {(prop.rooms?.length || 0) + (prop.dorms?.length || 0)} Units Configured
                      </p>
                    ) : (
                      <p className="text-xs font-medium text-gray-800">
                        {prop.basePricePerNight} DH / night · Up to {prop.capacity} guests
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                  {isContainer && (
                    <Link
                      href={`/owner/properties/${propId}/units?type=${prop.type}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-colors"
                    >
                      <Bed className="w-3.5 h-3.5" />
                      <span>Manage Units</span>
                    </Link>
                  )}

                  <Link
                    href={`/${prop.type.toLowerCase()}/${propId}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Listing</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(propId, prop.type)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-xl font-bold text-gray-800">No properties listed yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Begin by adding your first accommodation. You can configure individual rooms or detached villas.
          </p>
          <Link
            href="/owner/properties/add"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Property Now</span>
          </Link>
        </div>
      )}
    </div>
  );
}
