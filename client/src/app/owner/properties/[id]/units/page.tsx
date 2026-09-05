"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import { Bed, Users, Plus, Trash2, ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";

export default function ManageUnitsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const propertyId = params.id as string;
  const propertyType = searchParams.get("type") || "Hotel";

  const [activeTab, setActiveTab] = useState<"room" | "dorm">("room");
  const [existingRooms, setExistingRooms] = useState<any[]>([]);
  const [existingDorms, setExistingDorms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [unitName, setUnitName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [capacity, setCapacity] = useState("2");
  const [photos, setPhotos] = useState<File[]>([]);

  const fetchUnits = async () => {
    try {
      if (propertyType.toLowerCase() === "hotel") {
        const res = await api.get(`/api/hotel/${propertyId}`);
        setExistingRooms(res.data?.rooms || []);
      } else if (propertyType.toLowerCase() === "riad") {
        const res = await api.get(`/api/riad/${propertyId}`);
        setExistingRooms(res.data?.rooms || []);
      } else if (propertyType.toLowerCase() === "hostel") {
        const res = await api.get(`/api/hostel/${propertyId}`);
        setExistingRooms(res.data?.privateRooms || []);
        setExistingDorms(res.data?.dorms || []);
      }
    } catch (err) {
      console.warn("Could not fetch property units:", err);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchUnits();
    }
  }, [propertyId, propertyType]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleAddUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("Name", unitName);
      data.append("Description", description);
      data.append("BasePricePerNight", basePrice);
      data.append("Capacity", capacity);

      photos.forEach((f) => data.append("Photos", f));

      if (activeTab === "room") {
        if (propertyType.toLowerCase() === "hotel") data.append("HotelId", propertyId);
        else if (propertyType.toLowerCase() === "riad") data.append("RiadId", propertyId);
        else if (propertyType.toLowerCase() === "hostel") data.append("HostelId", propertyId);

        await api.post("/api/room", data, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Room added successfully!");
      } else {
        data.append("HostelId", propertyId);
        await api.post("/api/dorm", data, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Dormitory added successfully!");
      }

      setUnitName("");
      setDescription("");
      setBasePrice("");
      setPhotos([]);
      fetchUnits();
    } catch (err: any) {
      toast.error("Failed to add unit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isHostel = propertyType.toLowerCase() === "hostel";

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <Link
          href="/owner/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Properties</span>
        </Link>
        <h1 className="text-3xl font-bold font-serif text-gray-900">
          Manage Units & Rooms for {propertyType}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Add rooms, set individual nightly pricing, and configure guest capacities
        </p>
      </div>

      {/* Tabs if Hostel */}
      {isHostel && (
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("room")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "room"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            Private Rooms
          </button>
          <button
            onClick={() => setActiveTab("dorm")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "dorm"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            Shared Dormitories
          </button>
        </div>
      )}

      {/* Add Unit Form */}
      <form onSubmit={handleAddUnit} className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900 font-serif">
          Add New {activeTab === "room" ? "Room" : "Dormitory"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              {activeTab === "room" ? "Room Name / Number" : "Dorm Name (e.g. 6-Bed Mixed Dorm)"}
            </label>
            <input
              type="text"
              required
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              placeholder="e.g. Deluxe Suite 201"
              className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Base Price / Night (DH)
            </label>
            <input
              type="number"
              required
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              placeholder="e.g. 450"
              className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Capacity ({activeTab === "room" ? "Max Guests" : "Number of Beds"})
            </label>
            <input
              type="number"
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              min="1"
              className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bed type, view, balcony, etc."
              className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Photos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center relative bg-gray-50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-xs text-gray-500">Click to upload photos for this unit</p>
          </div>

          {photos.length > 0 && (
            <p className="text-xs text-green-600 mt-1">{photos.length} photo(s) selected</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Saving..." : `Add ${activeTab === "room" ? "Room" : "Dorm"}`}
        </button>
      </form>

      {/* Existing Units List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 font-serif">
          Configured Units ({existingRooms.length + existingDorms.length})
        </h2>

        {existingRooms.length === 0 && existingDorms.length === 0 ? (
          <p className="text-sm text-gray-500">No rooms added yet. Use the form above to add your first room.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {existingRooms.map((room) => (
              <div key={room.id} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex justify-between items-center">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">Room</span>
                  <h4 className="font-bold text-gray-900 mt-1">{room.name}</h4>
                  <p className="text-xs text-gray-500">{room.basePricePerNight} DH / night · {room.capacity} guests</p>
                </div>
              </div>
            ))}

            {existingDorms.map((dorm) => (
              <div key={dorm.id} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex justify-between items-center">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">Dormitory</span>
                  <h4 className="font-bold text-gray-900 mt-1">{dorm.name}</h4>
                  <p className="text-xs text-gray-500">{dorm.basePricePerNight} DH / bed · {dorm.capacity} beds</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
