"use client";

import React, { useState } from "react";
import { DollarSign, Search, CheckCircle, Clock, AlertCircle } from "lucide-react";

const paymentsData = [
  { id: "PAY-9041", reservationId: "RES-8042", client: "Sophie Martin", amount: "3 870 DH", method: "Visa •••• 4242", date: "2026-09-03", status: "completed" },
  { id: "PAY-9040", reservationId: "RES-8041", client: "Karim Alaoui", amount: "7 160 DH", method: "Mastercard •••• 8821", date: "2026-09-02", status: "completed" },
  { id: "PAY-9039", reservationId: "RES-8040", client: "David Miller", amount: "1 780 DH", method: "Pay At Hotel", date: "2026-09-02", status: "pending" },
  { id: "PAY-9038", reservationId: "RES-8038", client: "Jean Dupont", amount: "1 780 DH", method: "Visa •••• 1199", date: "2026-08-30", status: "refunded" },
];

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = paymentsData.filter((p) => filter === "all" || p.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-gray-900">Financial Ledger & Payments</h1>
        <p className="text-xs text-gray-500 mt-1">Transaction audit logs, receipts, and refund histories</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex gap-2">
        {["all", "completed", "pending", "refunded"].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
              filter === st ? "bg-purple-600 text-white shadow-xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th className="py-3.5 px-6">Transaction ID</th>
              <th className="py-3.5 px-6">Reservation</th>
              <th className="py-3.5 px-6">Guest</th>
              <th className="py-3.5 px-6">Amount</th>
              <th className="py-3.5 px-6">Method</th>
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6 font-mono text-gray-500">{p.id}</td>
                <td className="py-4 px-6 font-mono text-purple-600 font-semibold">{p.reservationId}</td>
                <td className="py-4 px-6 font-bold text-gray-900">{p.client}</td>
                <td className="py-4 px-6 font-bold text-gray-900">{p.amount}</td>
                <td className="py-4 px-6 text-gray-600">{p.method}</td>
                <td className="py-4 px-6 text-gray-400">{p.date}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                      p.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : p.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
