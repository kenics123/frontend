"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import AdminShell from "../../../../components/AdminShell";
import {
  formatShowDate,
  useAdminRegistration,
} from "../../../../functions/admin";
import Loader from "../../../../components/Loader";

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-sm text-gray-900 whitespace-pre-wrap">
        {value || "—"}
      </p>
    </div>
  );
}

export default function AdminRegistrationDetailPage() {
  const params = useParams();
  const id = params?.id;
  const { data, isLoading, error } = useAdminRegistration(id);

  if (isLoading) {
    return (
      <AdminShell>
        <Loader text="Loading registration..." />
      </AdminShell>
    );
  }

  if (error || !data) {
    return (
      <AdminShell>
        <div className="space-y-4">
          <Link
            href="/admin/registrations"
            className="inline-flex items-center text-pink-600 text-sm"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to registrations
          </Link>
          <p className="text-red-600">
            {error?.message || "Registration not found"}
          </p>
        </div>
      </AdminShell>
    );
  }

  const paid = ["success", "successful"].includes(
    String(data.paymentStatus || "").toLowerCase(),
  );

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <Link
              href="/admin/registrations"
              className="inline-flex items-center text-pink-600 text-sm mb-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to registrations
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {data.firstName} {data.lastName}
            </h1>
            <p className="text-sm text-gray-500 capitalize">
              {data.categoryId?.name || data.category}
            </p>
          </div>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              paid
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {data.paymentStatus || "unpaid"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-pink-100 p-5 shadow-sm">
            <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden bg-pink-50 mb-4">
              {data.photos?.[0] ? (
                <Image
                  src={data.photos[0]}
                  alt={`${data.firstName} ${data.lastName}`}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(data.photos || []).slice(1).map((photo, index) => (
                <div
                  key={photo + index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-pink-50"
                >
                  <Image
                    src={photo}
                    alt={`Photo ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Email" value={data.email} />
              <Field label="Phone" value={data.phone} />
              <Field label="Date of Birth" value={data.dateOfBirth} />
              <Field label="Height" value={data.height} />
              <Field label="Weight" value={data.weight} />
              <Field
                label="Votes"
                value={String(data.score?.voteCount ?? 0)}
              />
              <Field label="Payment Ref" value={data.paymentRef} />
              <Field
                label="Registered"
                value={
                  data.createdAt
                    ? new Date(data.createdAt).toLocaleString()
                    : ""
                }
              />
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Contest"
                value={data.contest?.name}
              />
              <Field
                label="Show Date"
                value={formatShowDate(data.contest?.showDate)}
              />
              <Field
                label="Category"
                value={data.categoryId?.name || data.category}
              />
              <Field
                label="Category Price"
                value={
                  data.categoryId?.price != null
                    ? `₦${Number(data.categoryId.price).toLocaleString()}`
                    : ""
                }
              />
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm space-y-4">
              <Field label="Bio" value={data.bio} />
              <Field label="Experience" value={data.experience} />
              <Field label="Achievements" value={data.achievements} />
            </div>

            <div className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Emergency Contact"
                value={
                  data.emergencyContact
                    ? `${data.emergencyContact.name || ""} (${data.emergencyContact.relationship || ""}) — ${data.emergencyContact.phone || data.emergencyContact.number || ""}`
                    : ""
                }
              />
              <Field
                label="Social Media"
                value={
                  data.socialMedia
                    ? [
                        data.socialMedia.instagram &&
                          `IG: ${data.socialMedia.instagram}`,
                        data.socialMedia.facebook &&
                          `FB: ${data.socialMedia.facebook}`,
                        data.socialMedia.twitter &&
                          `X: ${data.socialMedia.twitter}`,
                        data.socialMedia.tiktok &&
                          `TT: ${data.socialMedia.tiktok}`,
                      ]
                        .filter(Boolean)
                        .join("\n")
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
