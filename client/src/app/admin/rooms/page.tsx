"use client";

import React, { useState } from "react";
import { Hotel, CheckCircle, Clock, AlertTriangle, Search, Plus } from "lucide-react";

const initialRooms = [
  { id: "101", type: "Standard Double", beds: "1 Queen Bed", capacity: 2, price: 890, status: "available" },
  { id: "102", type: "Deluxe Ocean View", beds: "1 King Bed", capacity: 2, price: 1290, status: "occupied" },
  { id: "103", type: "Standard Twin", beds: "2 Single Beds", capacity: 2, price: 990, status: "cleaning" },
  { id: "104", type: "Junior Suite", beds: "1 King + Sofa", capacity: 3, price: 1790, status: "maintenance" },
  { id: "201", type: "Executive Suite", beds: "1 King Bed", capacity: 2, price: 2100, status: "occupied" },
  { id: "202", type: "Deluxe Suite", beds: "1 King Bed", capacity: 2, price: 1450, status: "available" },
  { id: "203", type: "Standard Single", beds: "1 Single Bed", capacity: 1, price: 650, status: "available" },
];

export default function AdminRoomsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState(initialRooms);

  const filtered = rooms.filter((r) => {
    const matchesFilter = filter === "all" || r.status === filter;
    const matchesSearch = r.id.includes(searchTerm) || r.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setRooms(rooms.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-gray-900">Room Status & Inventory</h1>
          <p className="text-xs text-gray-500 mt-1">Live room availability, housekeeping, and maintenance state</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["all", "available", "occupied", "cleaning", "maintenance"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === st
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search room..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th className="py-3.5 px-6">Room Number</th>
              <th className="py-3.5 px-6">Type & Beds</th>
              <th className="py-3.5 px-6">Capacity</th>
              <th className="py-3.5 px-6">Nightly Price</th>
              <th className="py-3.5 px-6">Current Status</th>
              <th className="py-3.5 px-6 text-right">Quick Status Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6 font-bold text-gray-900 text-sm">Room {r.id}</td>
                <td className="py-4 px-6">
                  <p className="font-semibold text-gray-800">{r.type}</p>
                  <p className="text-[11px] text-gray-400">{r.beds}</p>
                </td>
                <td className="py-4 px-6">{r.capacity} Guests</td>
                <td className="py-4 px-6 font-bold text-gray-900">{r.price} DH</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                      r.status === "available"
                        ? "bg-green-100 text-green-800"
                        : r.status === "occupied"
                        ? "bg-blue-100 text-blue-800"
                        : r.status === "cleaning"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white focus:ring-1 focus:ring-purple-600 focus:outline-none cursor-pointer"
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
