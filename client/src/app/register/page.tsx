"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Lock, Mail, User as UserIcon, Building2, UserCheck, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "owner" ? "owner" : "client";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "owner">(defaultRole);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register(email, password, username, role);
      toast.success("Account created successfully!");
      if (role === "owner") {
        router.push("/owner/properties");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0] || "Registration failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold font-serif text-blue-600">StayFinder</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create your account</h2>
          <p className="text-sm text-gray-500">Join thousands of guests and property owners worldwide</p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Role Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              I want to
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`p-3.5 rounded-2xl border text-left flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  role === "client"
                    ? "border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-500/20"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold">Book Stays</span>
                <span className="text-[10px] text-gray-500 text-center">Traveler / Guest</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("owner")}
                className={`p-3.5 rounded-2xl border text-left flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  role === "owner"
                    ? "border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-500/20"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Building2 className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold">List Properties</span>
                <span className="text-[10px] text-gray-500 text-center">Host / Owner</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name or Username
            </label>
            <div className="relative">
              <UserIcon className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Password (Min 6 characters)
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
          >
            {isLoading ? "Creating account..." : "Register Now"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-100 text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
