"use client";

import React, { useState } from "react";
import { Search, CalendarCheck, CheckCircle2, XCircle, Clock } from "lucide-react";

const allReservations = [
  { id: "RES-8042", client: "Sophie Martin", email: "sophie.m@example.com", room: "Room 102 (Deluxe)", checkIn: "2026-09-05", checkOut: "2026-09-08", amount: "3 870 DH", status: "confirmed" },
  { id: "RES-8041", client: "Karim Alaoui", email: "karim.a@example.com", room: "Room 204 (Suite)", checkIn: "2026-09-06", checkOut: "2026-09-10", amount: "7 160 DH", status: "confirmed" },
  { id: "RES-8040", client: "David Miller", email: "david.m@example.com", room: "Room 101 (Standard)", checkIn: "2026-09-07", checkOut: "2026-09-09", amount: "1 780 DH", status: "pending" },
  { id: "RES-8039", client: "Fatima Zahra", email: "fz.elamrani@example.com", room: "Penthouse Suite", checkIn: "2026-09-08", checkOut: "2026-09-12", amount: "14 000 DH", status: "confirmed" },
  { id: "RES-8038", client: "Jean Dupont", email: "jean.dupont@example.com", room: "Room 105 (Standard)", checkIn: "2026-09-01", checkOut: "2026-09-03", amount: "1 780 DH", status: "cancelled" },
];

export default function AdminReservationsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = allReservations.filter((res) => {
    const matchFilter = filter === "all" || res.status === filter;
    const matchSearch = res.client.toLowerCase().includes(search.toLowerCase()) || res.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-gray-900">Reservations Directory</h1>
        <p className="text-xs text-gray-500 mt-1">Manage guest bookings, confirmations, and cancellation records</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          {["all", "confirmed", "pending", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === st ? "bg-purple-600 text-white shadow-xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reservation or client..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th className="py-3.5 px-6">ID</th>
              <th className="py-3.5 px-6">Guest Info</th>
              <th className="py-3.5 px-6">Booked Room</th>
              <th className="py-3.5 px-6">Dates</th>
              <th className="py-3.5 px-6">Total Amount</th>
              <th className="py-3.5 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
            {filtered.map((res) => (
              <tr key={res.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6 font-mono text-gray-500">{res.id}</td>
                <td className="py-4 px-6">
                  <p className="font-bold text-gray-900">{res.client}</p>
                  <p className="text-[11px] text-gray-400">{res.email}</p>
                </td>
                <td className="py-4 px-6">{res.room}</td>
                <td className="py-4 px-6">{res.checkIn} → {res.checkOut}</td>
                <td className="py-4 px-6 font-bold text-gray-900">{res.amount}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                      res.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : res.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {res.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
