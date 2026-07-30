import { useEffect, useMemo, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5073";

export default function BookingCard({ accommondationId: unitId, unitType = "accommodation", basePrice, capacity, currency = "DH", onBookingSuccess }) {
  const { getToken } = useAuth();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const today = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);
  const unavailable = useMemo(() => new Set(unavailableDates), [unavailableDates]);
  const dateKey = date => date.toISOString().slice(0, 10);

  useEffect(() => {
    if (!unitId) return;
    fetch(`${API_URL}/api/availability/${unitType}/${unitId}/unavailable-dates`)
      .then(response => response.ok ? response.json() : Promise.reject(new Error("Could not load availability.")))
      .then(setUnavailableDates)
      .catch(error => setError(error.message));
  }, [unitId, unitType]);

  const hasUnavailableDateBetween = () => {
    if (!checkInDate || !checkOutDate) return false;
    for (let date = new Date(checkInDate); date < checkOutDate; date.setDate(date.getDate() + 1))
      if (unavailable.has(dateKey(date))) return true;
    return false;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");
    if (!user) return openSignIn({ redirectUrl: window.location.href });
    if (hasUnavailableDateBetween()) return setError("Your selected stay includes an unavailable date.");
    setIsLoading(true);
    try {
      const template = import.meta.env.VITE_CLERK_JWT_TEMPLATE;
      const token = await getToken(template ? { template } : undefined);
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ unitId, unitType, checkInDate: dateKey(checkInDate), checkOutDate: dateKey(checkOutDate), numberOfGuests: guests })
      });
      if (!response.ok) throw new Error((await response.text()) || "Booking request failed.");
      const booking = await response.json();
      onBookingSuccess?.(booking);
      setUnavailableDates(previous => [...previous, ...Array.from({ length: Math.round((checkOutDate - checkInDate) / 86400000) }, (_, i) => dateKey(new Date(checkInDate.getTime() + i * 86400000)))]);
      setCheckInDate(null); setCheckOutDate(null);
    } catch (exception) { setError(exception.message); }
    finally { setIsLoading(false); }
  };

  return <div className="bg-white p-6 rounded-xl shadow-xl sticky top-28">
    <p className="text-2xl font-semibold text-gray-800 mb-4"><span className="font-playfair">{basePrice} {currency}</span><span className="text-base font-normal text-gray-600"> / night</span></p>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700">Check In</label><DatePicker selected={checkInDate} onChange={setCheckInDate} dateFormat="dd-MM-yyyy" minDate={today} maxDate={checkOutDate ? new Date(checkOutDate.getTime() - 86400000) : undefined} filterDate={date => !unavailable.has(dateKey(date))} placeholderText="Select check-in" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required isClearable /></div>
      <div><label className="block text-sm font-medium text-gray-700">Check Out</label><DatePicker selected={checkOutDate} onChange={setCheckOutDate} dateFormat="dd-MM-yyyy" minDate={checkInDate ? new Date(checkInDate.getTime() + 86400000) : today} filterDate={date => !unavailable.has(dateKey(date))} placeholderText="Select check-out" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required isClearable /></div>
      <div><label className="block text-sm font-medium text-gray-700">Guests</label><input type="number" value={guests} onChange={event => setGuests(Number(event.target.value))} min="1" max={capacity} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required /></div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary-dull text-white font-semibold py-3 px-4 rounded-lg shadow-md disabled:opacity-50">{isLoading ? "Processing..." : "Request to Book"}</button>
    </form><p className="text-xs text-gray-500 mt-4 text-center">You won't be charged yet</p>
  </div>;
}
