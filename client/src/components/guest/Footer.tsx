import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <span className="text-2xl font-bold tracking-tight font-serif text-white">
            StayFinder
          </span>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover and book unique hotels, apartments, luxury villas, authentic riads, and cozy cottages around the globe.
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Featured Destinations</Link></li>
            <li><Link href="/search" className="hover:text-white transition-colors">All Accommodations</Link></li>
            <li><Link href="/search?type=Hotel" className="hover:text-white transition-colors">Hotels</Link></li>
            <li><Link href="/search?type=Villa" className="hover:text-white transition-colors">Villas & Riads</Link></li>
            <li><Link href="/search?type=Hostel" className="hover:text-white transition-colors">Hostels</Link></li>
          </ul>
        </div>

        {/* Host / Owner */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">For Hosts</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/register?role=owner" className="hover:text-white transition-colors">List Your Property</Link></li>
            <li><Link href="/owner/properties" className="hover:text-white transition-colors">Host Dashboard</Link></li>
            <li><Link href="/owner/properties/add" className="hover:text-white transition-colors">Add Accommodation</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">Partner Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact Us</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Marrakech & Worldwide</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+212 600 000 000</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>support@stayfinder.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} StayFinder, Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-gray-400">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-400">Terms of Service</Link>
          <Link href="#" className="hover:text-gray-400">Security</Link>
        </div>
      </div>
    </footer>
  );
}
