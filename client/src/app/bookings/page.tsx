"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  uuid: string;
  job_description?: string;
  date?: string;
  status: string;
}

export default function BookingListPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings"); // no auth header
        if (!res.ok) throw new Error("Failed to load bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4 mt-4">
        {bookings.map((booking) => (
          <Link
            key={booking.uuid}
            href={`/booking/${booking.uuid}`} // Next.js handles routing automatically
            className="block border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <p className="font-semibold">{booking.job_description}</p>
            <p className="text-sm text-gray-600">
              Date: {booking.date ? new Date(booking.date).toLocaleString() : "N/A"}
            </p>
            <p className="text-sm text-gray-600">Status: {booking.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
