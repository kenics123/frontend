"use client";

import { useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { Trash2, Upload } from "lucide-react";
import AdminShell from "../../../components/AdminShell";
import Loader from "../../../components/Loader";
import {
  deleteGalleryPhoto,
  useGallery,
  useUploadGallery,
} from "../../../functions/gallery";

export default function AdminGalleryPage() {
  const { data: photos, isLoading, mutate } = useGallery();
  const { trigger: uploadPhotos, isMutating } = useUploadGallery();
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!files.length) {
      toast.error("Select at least one photo");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    if (caption.trim()) {
      formData.append("caption", caption.trim());
    }

    try {
      await uploadPhotos(formData);
      toast.success(
        files.length > 1 ? "Photos uploaded" : "Photo uploaded",
      );
      setFiles([]);
      setCaption("");
      e.target.reset?.();
      await mutate();
    } catch (error) {
      toast.error(error?.message || "Could not upload photos");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo from the gallery?")) return;
    setDeletingId(id);
    try {
      await deleteGalleryPhoto(id);
      toast.success("Photo deleted");
      await mutate();
    } catch (error) {
      toast.error(error?.message || "Could not delete photo");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <AdminShell>
      <Toaster position="top-center" richColors />
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload photos to show on the public gallery page.
          </p>
        </div>

        <section className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Upload Photos
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
            />
            <input
              type="text"
              placeholder="Caption (optional — applied to this upload batch)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg"
            />
            {files.length > 0 && (
              <p className="text-sm text-gray-500">
                {files.length} file{files.length === 1 ? "" : "s"} selected
              </p>
            )}
            <button
              type="submit"
              disabled={isMutating || !files.length}
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 disabled:opacity-60"
            >
              <Upload className="w-4 h-4" />
              {isMutating ? "Uploading..." : "Upload to Gallery"}
            </button>
          </form>
        </section>

        <section className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Published Photos</h2>
            <span className="text-sm text-gray-500">
              {(photos || []).length} photo{(photos || []).length === 1 ? "" : "s"}
            </span>
          </div>

          {isLoading ? (
            <Loader text="Loading gallery..." />
          ) : !(photos || []).length ? (
            <p className="text-sm text-gray-500">No gallery photos yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(photos || []).map((photo) => (
                <div
                  key={photo._id}
                  className="rounded-xl border border-pink-100 overflow-hidden bg-pink-50"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={photo.url}
                      alt={photo.caption || "Gallery photo"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-3 space-y-2">
                    <p className="text-xs text-gray-600 line-clamp-2 min-h-8">
                      {photo.caption || "No caption"}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(photo._id)}
                      disabled={deletingId === photo._id}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 className="w-3 h-3" />
                      {deletingId === photo._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
