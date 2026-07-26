"use client";

import Link from "next/link";
import AdminShell from "../../../components/AdminShell";
import {
  formatShowDate,
  useAdminStats,
} from "../../../functions/admin";
import Loader from "../../../components/Loader";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, error } = useAdminStats(true);

  if (isLoading) {
    return (
      <AdminShell>
        <Loader text="Loading dashboard..." />
      </AdminShell>
    );
  }

  if (error) {
    return (
      <AdminShell>
        <p className="text-red-600">
          {error?.message || "Could not load dashboard stats"}
        </p>
      </AdminShell>
    );
  }

  const cards = [
    {
      label: "Total Contests",
      value: stats?.totalContests ?? 0,
      href: "/admin/contests",
    },
    {
      label: "Total Registrations",
      value: stats?.totalRegistrations ?? 0,
      href: "/admin/registrations",
    },
    {
      label: "Paid Registrations",
      value: stats?.paidRegistrations ?? 0,
      href: "/admin/registrations",
    },
    {
      label: "Unpaid Registrations",
      value: stats?.unpaidRegistrations ?? 0,
      href: "/admin/registrations",
    },
    {
      label: "Active Contest Entries",
      value: stats?.activeContestRegistrations ?? 0,
      href: "/admin/registrations",
    },
    {
      label: "Unread Messages",
      value: stats?.unreadContacts ?? 0,
      href: "/admin/contact",
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of contests, registrations, and contact messages.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Active Contest
          </h2>
          {stats?.activeContest ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xl font-bold text-pink-600">
                  {stats.activeContest.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Show date: {formatShowDate(stats.activeContest.showDate)}
                </p>
              </div>
              <Link
                href="/admin/contests"
                className="text-sm px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 text-center"
              >
                Manage Contest
              </Link>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No active contest. Create and activate one from Contests.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl border border-pink-100 p-5 shadow-sm hover:border-pink-300 transition"
            >
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {card.value}
              </p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/contests"
              className="px-4 py-2 rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700"
            >
              Contests
            </Link>
            <Link
              href="/admin/registrations"
              className="px-4 py-2 rounded-full border border-pink-200 text-pink-700 text-sm hover:bg-pink-50"
            >
              View Registrations
            </Link>
            <Link
              href="/admin/contact"
              className="px-4 py-2 rounded-full border border-pink-200 text-pink-700 text-sm hover:bg-pink-50"
            >
              Contact Messages ({stats?.totalContacts ?? 0})
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
