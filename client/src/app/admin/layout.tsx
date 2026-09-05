"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Hotel,
  CalendarCheck,
  Users,
  DollarSign,
  Home,
  LogOut,
  Bell,
  Menu,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Hotel, label: "Rooms & Status", href: "/admin/rooms" },
    { icon: CalendarCheck, label: "Reservations", href: "/admin/reservations" },
    { icon: Users, label: "Clients", href: "/admin/clients" },
    { icon: DollarSign, label: "Payments", href: "/admin/payments" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold font-serif text-white tracking-tight">StayFinder</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-purple-600 text-white rounded-full">
                Admin
              </span>
            </Link>
          </div>

          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white font-semibold shadow-xs"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Switch to Guest View</span>
          </Link>

          <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-400">
            <span className="truncate">{user?.email || "admin@accommodation.com"}</span>
            <button
              onClick={logout}
              title="Sign out"
              className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-gray-800">Hotel Operations Management</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span>API Live</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
