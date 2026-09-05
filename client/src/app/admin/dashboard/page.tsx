"use client";

import React from "react";
import { Hotel, CalendarCheck, Users, DollarSign, TrendingUp, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const occupancyData = [
  { month: "Jan", rate: 65 },
  { month: "Feb", rate: 70 },
  { month: "Mar", rate: 78 },
  { month: "Apr", rate: 82 },
  { month: "May", rate: 88 },
  { month: "Jun", rate: 94 },
  { month: "Jul", rate: 98 },
  { month: "Aug", rate: 95 },
  { month: "Sep", rate: 84 },
];

const revenueData = [
  { day: "Mon", revenue: 2400 },
  { day: "Tue", revenue: 3200 },
  { day: "Wed", revenue: 2800 },
  { day: "Thu", revenue: 3900 },
  { day: "Fri", revenue: 4800 },
  { day: "Sat", revenue: 5400 },
  { day: "Sun", revenue: 4200 },
];

const latestReservations = [
  { id: "RES-8042", client: "Sophie Martin", room: "102 Deluxe", checkIn: "2026-09-05", checkOut: "2026-09-08", price: "3 870 DH", status: "Confirmed" },
  { id: "RES-8041", client: "Karim Alaoui", room: "204 Junior Suite", checkIn: "2026-09-06", checkOut: "2026-09-10", price: "7 160 DH", status: "Confirmed" },
  { id: "RES-8040", client: "David Miller", room: "101 Standard", checkIn: "2026-09-07", checkOut: "2026-09-09", price: "1 780 DH", status: "Pending" },
  { id: "RES-8039", client: "Fatima Zahra", room: "301 Ocean Penthouse", checkIn: "2026-09-08", checkOut: "2026-09-12", price: "14 000 DH", status: "Confirmed" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">Operations Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Live hotel performance metrics, revenue trends, and upcoming arrivals</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Occupied Rooms</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Hotel className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">42 / 54</p>
          <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>78% Occupancy Rate (+5% vs last week)</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Today&apos;s Bookings</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">8 New</p>
          <p className="text-xs text-green-600 font-semibold">+2 vs daily average</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Active Clients</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">86 Guests</p>
          <p className="text-xs text-gray-500">24 arriving today</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Daily Revenue</span>
            <div className="p-2 rounded-xl bg-green-50 text-green-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">34 500 DH</p>
          <p className="text-xs text-green-600 font-semibold">+12% vs last Friday</p>
        </div>
      </div>

      {/* Recharts Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Occupancy Trend */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Monthly Occupancy Rate (%)</h3>
            <p className="text-xs text-gray-500">Trailing seasonal trends</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#9ca3af" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#9ca3af" domain={[50, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOccupancy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Weekly Revenue (DH)</h3>
            <p className="text-xs text-gray-500">Gross reservation sales this week</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="#9ca3af" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Room Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-green-50 border border-green-200">
          <div className="flex items-center gap-2 text-green-700 text-xs font-bold uppercase">
            <CheckCircle className="w-4 h-4" />
            <span>Available</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-2">12 Rooms</p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase">
            <Hotel className="w-4 h-4" />
            <span>Occupied</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-2">42 Rooms</p>
        </div>

        <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-200">
          <div className="flex items-center gap-2 text-yellow-700 text-xs font-bold uppercase">
            <Clock className="w-4 h-4" />
            <span>Cleaning</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900 mt-2">6 Rooms</p>
        </div>

        <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>Maintenance</span>
          </div>
          <p className="text-2xl font-bold text-red-900 mt-2">2 Rooms</p>
        </div>
      </div>

      {/* Latest Reservations Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Latest Bookings</h3>
            <p className="text-xs text-gray-500">Real-time check-ins and reservations</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-6">Reference</th>
                <th className="py-3 px-6">Client Name</th>
                <th className="py-3 px-6">Room Unit</th>
                <th className="py-3 px-6">Dates</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {latestReservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono text-gray-500">{res.id}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{res.client}</td>
                  <td className="py-4 px-6">{res.room}</td>
                  <td className="py-4 px-6">{res.checkIn} → {res.checkOut}</td>
                  <td className="py-4 px-6 font-bold text-gray-900">{res.price}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      res.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {res.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
