import React from "react";
import Link from "next/link";
import { Dorm } from "@/types";
import { Users, Bed } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

interface DormCardProps {
  dorm: Dorm;
}

export default function DormCard({ dorm }: DormCardProps) {
  const imageUrl = dorm.photos && dorm.photos.length > 0
    ? (dorm.photos[0].startsWith("http") ? dorm.photos[0] : `${API_BASE_URL}/images/${dorm.photos[0]}`)
    : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600";

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
      <div className="md:w-64 h-48 md:h-auto shrink-0 relative bg-gray-100">
        <img src={imageUrl} alt={dorm.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-indigo-600" />
              <h4 className="text-lg font-bold text-gray-900">{dorm.name}</h4>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-indigo-600">{dorm.basePricePerNight} DH</span>
              <span className="text-xs text-gray-500"> / bed</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span>Shared Dormitory: {dorm.capacity} beds</span>
          </p>
          <p className="text-xs text-gray-600 mt-2 line-clamp-2">{dorm.description}</p>
        </div>

        <div className="border-t pt-3 flex justify-end">
          <Link
            href={`/dorm/${dorm.id}`}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Reserve Bed
          </Link>
        </div>
      </div>
    </div>
  );
}
