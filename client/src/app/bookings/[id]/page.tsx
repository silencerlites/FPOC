"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  uuid: string;
  generated_job_id?: string;
  job_description?: string;
  status: string;
  date?: string;
  job_address?: string;
}

interface Attachment {
  uuid: number | string;
  filename: string;
  fileurl: string;
}

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load booking");

        const data = await res.json();

        // Backend returns booking fields + attachments array
        setBooking({
          uuid: data.uuid,
          generated_job_id: data.generated_job_id,
          job_description: data.job_description,
          status: data.status,
          date: data.date,
          job_address: data.job_address,
        });

        setAttachments(data.attachments || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading booking details...
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600 p-6">
        <p className="mb-4">Error loading booking: {error}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <button
          className="text-blue-500 text-sm mb-4"
          onClick={() => router.back()}
        >
          ← Back to Bookings
        </button>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Booking Details
        </h1>

        <div className="space-y-2 text-gray-700 mb-6">
          <p><strong>Job ID:</strong> {booking.generated_job_id}</p>
          <p><strong>Description:</strong> {booking.job_description}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          {booking.date && (
            <p>
              <strong>Date:</strong>{" "}
              {new Date(booking.date).toLocaleString()}
            </p>
          )}
          {booking.job_address && (
            <p><strong>Address:</strong> {booking.job_address}</p>
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Attachments
        </h2>

        {attachments.length === 0 ? (
          <p className="text-gray-500">No attachments found.</p>
        ) : (
          <ul className="space-y-2">
            {attachments.map((file) => (
              <li
                key={file.uuid}
                className="flex justify-between bg-gray-50 p-3 rounded-md border"
              >
                <span>{file.filename}</span>
                <a
                  href={file.fileurl}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
