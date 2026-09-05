"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, Building2, Calendar } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, role, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    if (pathname !== "/") {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/search" },
    { name: "About", path: "/#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-12 lg:px-20 transition-all duration-300 z-50 ${
        isScrolled
          ? "bg-white/95 shadow-sm text-gray-800 backdrop-blur-md py-3.5"
          : "bg-transparent text-white py-5"
      }`}
    >
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className={`text-2xl font-bold tracking-tight font-serif ${isScrolled ? "text-blue-600" : "text-white"}`}>
          StayFinder
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`transition-colors hover:opacity-80 ${
              isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white/90 hover:text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}

        {isAuthenticated && (
          <Link
            href="/my-bookings"
            className={`flex items-center gap-1.5 transition-colors ${
              isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white/90 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>My Bookings</span>
          </Link>
        )}

        {(role === "owner" || role === "admin") && (
          <Link
            href="/owner/properties"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Owner Portal</span>
          </Link>
        )}

        {role === "admin" && (
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin Ops</span>
          </Link>
        )}
      </div>

      {/* Desktop Auth Right */}
      <div className="hidden md:flex items-center gap-3">
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                isScrolled
                  ? "border-gray-300 text-gray-800 hover:bg-gray-50"
                  : "border-white/40 text-white hover:bg-white/10"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                {user.username.charAt(0)}
              </div>
              <span>{user.username}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 text-gray-800 z-50 text-sm">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <Link
                  href="/my-bookings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                >
                  <Calendar className="w-4 h-4" />
                  <span>My Bookings</span>
                </Link>
                {(role === "owner" || role === "admin") && (
                  <Link
                    href="/owner/properties"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Owner Portal</span>
                  </Link>
                )}
                {role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-white/80"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden p-2 rounded-lg ${isScrolled ? "text-gray-800" : "text-white"}`}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 py-6 px-6 flex flex-col gap-4 text-gray-800 md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium py-1"
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                href="/my-bookings"
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium py-1 text-blue-600"
              >
                My Bookings
              </Link>
              {(role === "owner" || role === "admin") && (
                <Link
                  href="/owner/properties"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium py-1 text-blue-700"
                >
                  Owner Portal
                </Link>
              )}
              {role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium py-1 text-purple-700"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-2 text-red-600 text-base font-medium py-2 border-t border-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-gray-300 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-blue-600 text-white font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
