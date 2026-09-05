"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Booking } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Users, Building, AlertCircle, ArrowRight, CheckCircle, Clock } from "lucide-react";

export default function MyBookingsPage() {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    api
      .get<Booking[]>("/api/bookings/me")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Could not fetch user bookings:", err))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "confirmed" || s === "approved") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
          <CheckCircle className="w-3.5 h-3.5" />
          Confirmed
        </span>
      );
    }
    if (s === "cancelled") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
          <AlertCircle className="w-3.5 h-3.5" />
          Cancelled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
        <Clock className="w-3.5 h-3.5" />
        {status}
      </span>
    );
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 md:px-8 space-y-8">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold font-serif text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">Review your upcoming and past accommodation stays</p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-500">Loading your reservations...</div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {booking.unitType}
                  </span>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-700 pt-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>
                      {new Date(booking.checkInDate).toLocaleDateString()} —{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{booking.numberOfGuests} guests</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-3 md:pt-0">
                <div className="text-right">
                  <span className="text-xl font-bold text-gray-900">{booking.totalPrice} DH</span>
                  <p className="text-xs text-gray-500">Total Price</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-xl font-bold text-gray-800">No reservations yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            You don&apos;t have any booked trips. Discover wonderful destinations and reserve your next getaway!
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>Explore Accommodations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
