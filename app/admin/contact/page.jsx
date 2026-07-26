"use client";

import { Toaster, toast } from "sonner";
import AdminShell from "../../../components/AdminShell";
import {
  markContactRead,
  useContactMessages,
} from "../../../functions/admin";
import Loader from "../../../components/Loader";

export default function AdminContactPage() {
  const { data: contactMessages, isLoading, mutate } = useContactMessages(true);

  const handleMarkRead = async (id) => {
    try {
      await markContactRead(id);
      await mutate();
    } catch (error) {
      toast.error(error?.message || "Could not update message");
    }
  };

  return (
    <AdminShell>
      <Toaster position="top-center" richColors />
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
            <p className="text-sm text-gray-500 mt-1">
              Messages submitted from the public contact form.
            </p>
          </div>
          <span className="text-sm text-gray-500">
            {(contactMessages || []).filter((m) => !m.isRead).length} unread
          </span>
        </div>

        {isLoading ? (
          <Loader text="Loading messages..." />
        ) : (
          <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm space-y-3">
            {(contactMessages || []).map((msg) => (
              <div
                key={msg._id}
                className={`rounded-xl border p-4 ${
                  msg.isRead
                    ? "border-gray-200 bg-white"
                    : "border-pink-200 bg-pink-50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900">{msg.name}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-pink-600 hover:underline"
                    >
                      {msg.email}
                    </a>
                    {msg.subject && (
                      <p className="text-sm font-medium text-gray-800 mt-2">
                        {msg.subject}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>
                  {!msg.isRead && (
                    <button
                      type="button"
                      onClick={() => handleMarkRead(msg._id)}
                      className="shrink-0 text-sm px-3 py-1.5 rounded-full border border-pink-300 text-pink-700 hover:bg-pink-100"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            ))}
            {!contactMessages?.length && (
              <p className="text-sm text-gray-500">No contact messages yet.</p>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
