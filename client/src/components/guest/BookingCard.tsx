"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api, { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";
import { Calendar, Users } from "lucide-react";

interface BookingCardProps {
  unitId: string;
  unitType?: "accommodation" | "room" | "dorm";
  basePrice: number;
  capacity: number;
  currency?: string;
  onBookingSuccess?: (booking: any) => void;
}

export default function BookingCard({
  unitId,
  unitType = "accommodation",
  basePrice,
  capacity,
  currency = "DH",
  onBookingSuccess,
}: BookingCardProps) {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const unavailable = useMemo(() => new Set(unavailableDates), [unavailableDates]);
  const dateKey = (date: Date) => date.toISOString().slice(0, 10);

  useEffect(() => {
    if (!unitId) return;
    api
      .get<string[]>(`/api/availability/${unitType}/${unitId}/unavailable-dates`)
      .then((res) => setUnavailableDates(res.data))
      .catch((err) => {
        console.warn("Could not load unavailable dates:", err);
      });
  }, [unitId, unitType]);

  const numberOfNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    return Math.max(0, Math.round(diffTime / (1000 * 60 * 60 * 24)));
  }, [checkInDate, checkOutDate]);

  const totalPrice = useMemo(() => {
    return numberOfNights * basePrice;
  }, [numberOfNights, basePrice]);

  const hasUnavailableDateBetween = () => {
    if (!checkInDate || !checkOutDate) return false;
    for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
      if (unavailable.has(dateKey(d))) return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isAuthenticated) {
      toast.info("Please sign in to make a booking.");
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    if (hasUnavailableDateBetween()) {
      setError("Your selected stay includes an unavailable date.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/api/bookings", {
        unitId,
        unitType,
        checkInDate: dateKey(checkInDate),
        checkOutDate: dateKey(checkOutDate),
        numberOfGuests: guests,
      });

      toast.success("Booking confirmed successfully!");
      onBookingSuccess?.(response.data);

      // Mark dates as unavailable locally
      const bookedDays = Array.from({ length: numberOfNights }, (_, i) =>
        dateKey(new Date(checkInDate.getTime() + i * 86400000))
      );
      setUnavailableDates((prev) => [...prev, ...bookedDays]);
      setCheckInDate(null);
      setCheckOutDate(null);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || err.message || "Booking request failed.";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
      toast.error("Booking failed. Please try different dates.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-28 space-y-5">
      <div className="flex items-baseline justify-between border-b pb-4">
        <div>
          <span className="text-3xl font-bold font-serif text-gray-900">
            {basePrice} {currency}
          </span>
          <span className="text-sm font-normal text-gray-500"> / night</span>
        </div>
        <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
          Available
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              Check In
            </label>
            <DatePicker
              selected={checkInDate}
              onChange={(d: Date | null) => setCheckInDate(d)}
              dateFormat="dd-MM-yyyy"
              minDate={today}
              maxDate={checkOutDate ? new Date(checkOutDate.getTime() - 86400000) : undefined}
              filterDate={(d: Date) => !unavailable.has(dateKey(d))}
              placeholderText="Select date"
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              isClearable
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              Check Out
            </label>
            <DatePicker
              selected={checkOutDate}
              onChange={(d: Date | null) => setCheckOutDate(d)}
              dateFormat="dd-MM-yyyy"
              minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : today}
              filterDate={(d: Date) => !unavailable.has(dateKey(d))}
              placeholderText="Select date"
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              isClearable
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            Guests (Max {capacity})
          </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, Math.min(capacity, Number(e.target.value))))}
            min="1"
            max={capacity}
            className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {numberOfNights > 0 && (
          <div className="bg-gray-50 p-3.5 rounded-xl space-y-2 border border-gray-100 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{basePrice} {currency} × {numberOfNights} nights</span>
              <span>{totalPrice} {currency}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>{totalPrice} {currency}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer text-sm"
        >
          {isLoading ? "Confirming Booking..." : isAuthenticated ? "Reserve Now" : "Sign In to Book"}
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center">Instant confirmation with your host</p>
    </div>
  );
}
