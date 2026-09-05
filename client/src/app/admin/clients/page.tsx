"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Phone, Calendar } from "lucide-react";

const clientDirectory = [
  { id: "CLI-101", name: "Sophie Martin", email: "sophie.m@example.com", phone: "+33 6 12 34 56 78", stays: 4, totalSpent: "14 850 DH", lastStay: "2026-08-15" },
  { id: "CLI-102", name: "Karim Alaoui", email: "karim.a@example.com", phone: "+212 6 61 22 33 44", stays: 7, totalSpent: "32 400 DH", lastStay: "2026-08-28" },
  { id: "CLI-103", name: "David Miller", email: "david.m@example.com", phone: "+44 7700 900077", stays: 1, totalSpent: "1 780 DH", lastStay: "2026-09-02" },
  { id: "CLI-104", name: "Fatima Zahra", email: "fz.elamrani@example.com", phone: "+212 6 62 88 99 00", stays: 3, totalSpent: "28 000 DH", lastStay: "2026-07-20" },
];

export default function AdminClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = clientDirectory.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-gray-900">Guest & Client Directory</h1>
        <p className="text-xs text-gray-500 mt-1">Guest profiles, visit frequencies, and cumulative revenue records</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name or email..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th className="py-3.5 px-6">Client</th>
              <th className="py-3.5 px-6">Contact Details</th>
              <th className="py-3.5 px-6">Total Stays</th>
              <th className="py-3.5 px-6">Total Spend</th>
              <th className="py-3.5 px-6">Last Visit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6 font-bold text-gray-900 text-sm">{c.name}</td>
                <td className="py-4 px-6 space-y-0.5">
                  <p className="flex items-center gap-1.5 text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>{c.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span>{c.phone}</span>
                  </p>
                </td>
                <td className="py-4 px-6">{c.stays} Bookings</td>
                <td className="py-4 px-6 font-bold text-gray-900">{c.totalSpent}</td>
                <td className="py-4 px-6 text-gray-500">{c.lastStay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
