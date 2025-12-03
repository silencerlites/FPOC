"use client";

import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      });

      const data = await res.json();

      // Save token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));


      if (!res.ok) {
        setError(data.error || "Authentication failed.");
        return;
      }

      // Save user session (example)
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to bookings
      window.location.href = "/bookings";
    } catch (err) {
      setError("Unable to connect to server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md shadow-md rounded-xl p-8">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-gray-950">
          Login
        </h1>
        <p className="text-gray-500 text-center text-sm mb-6">
          Log in to view your bookings and messages.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="m@example.com"
              className="w-full mt-1 text-gray-950 border border-gray-300 rounded-lg px-3 py-2 
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              name="phone"
              type="tel"
              placeholder="1234567890"
              className="w-full mt-1 text-gray-950 border border-gray-300 rounded-lg px-3 py-2 
                         focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg 
                       hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}
      </div>
    </div>
  );
}
