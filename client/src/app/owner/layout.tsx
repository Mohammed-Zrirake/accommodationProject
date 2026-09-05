"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Building2, PlusCircle, Home, LogOut, ArrowLeft, User } from "lucide-react";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "My Properties", href: "/owner/properties", icon: Building2 },
    { name: "Add Property", href: "/owner/properties/add", icon: PlusCircle },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="h-20 flex items-center px-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold font-serif text-blue-600">StayFinder</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                Host
              </span>
            </Link>
          </div>

          <div className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Switch to Guest View</span>
          </Link>

          <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500">
            <div className="flex items-center gap-2 truncate">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {user?.username?.charAt(0) || "U"}
              </div>
              <span className="truncate">{user?.username}</span>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-lg text-blue-600">
            StayFinder Host
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/owner/properties" className="text-xs text-gray-600 font-medium">
              Properties
            </Link>
            <Link href="/owner/properties/add" className="text-xs text-blue-600 font-medium">
              + Add
            </Link>
            <Link href="/" className="text-xs text-gray-500">
              Home
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
