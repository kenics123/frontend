"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminShell from "../../../components/AdminShell";
import {
  formatShowDate,
  useAdminRegistrations,
  useContests,
} from "../../../functions/admin";
import Loader from "../../../components/Loader";

export default function AdminRegistrationsPage() {
  const { data: contests, isLoading: contestsLoading } = useContests(true);
  const [contestId, setContestId] = useState("");
  const { data: registrations, isLoading } = useAdminRegistrations(contestId);

  useEffect(() => {
    if (!contestId && contests?.length) {
      const active = contests.find((c) => c.isActive);
      setContestId((active || contests[0])._id);
    }
  }, [contests, contestId]);

  const selectedContest = useMemo(
    () => (contests || []).find((c) => c._id === contestId),
    [contests, contestId],
  );

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              People&apos;s Registration
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Contestant registrations filtered by contest.
            </p>
          </div>

          <div className="w-full md:w-72">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by contest
            </label>
            <select
              value={contestId}
              onChange={(e) => setContestId(e.target.value)}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg bg-white"
              disabled={contestsLoading}
            >
              {(contests || []).map((contest) => (
                <option key={contest._id} value={contest._id}>
                  {contest.name}
                  {contest.isActive ? " (Active)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedContest && (
          <div className="bg-pink-50 border border-pink-100 rounded-xl px-4 py-3 text-sm text-pink-800">
            Showing registrations for <strong>{selectedContest.name}</strong> —
            show date {formatShowDate(selectedContest.showDate)}
          </div>
        )}

        {isLoading || contestsLoading ? (
          <Loader text="Loading registrations..." />
        ) : (
          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Contestant</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Payment</th>
                    <th className="px-4 py-3 font-medium">Votes</th>
                    <th className="px-4 py-3 font-medium">Registered</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(registrations || []).map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-gray-100 hover:bg-pink-50/40"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/registrations/${item._id}`}
                          className="flex items-center gap-3 hover:opacity-90"
                        >
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-pink-100 shrink-0">
                            {item.photos?.[0] ? (
                              <Image
                                src={item.photos[0]}
                                alt={`${item.firstName} ${item.lastName}`}
                                fill
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.firstName} {item.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.dateOfBirth || "—"}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3 capitalize text-gray-700">
                        {item.category}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-gray-800">{item.email}</p>
                        <p className="text-xs text-gray-500">{item.phone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            ["success", "successful"].includes(
                              String(item.paymentStatus || "").toLowerCase(),
                            )
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {item.paymentStatus || "unpaid"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {item.score?.voteCount ?? 0}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/registrations/${item._id}`}
                          className="text-sm text-pink-600 hover:underline font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!registrations?.length && (
              <p className="p-6 text-sm text-gray-500">
                No registrations for this contest yet.
              </p>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
