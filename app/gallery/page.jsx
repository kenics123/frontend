"use client";

import { useState } from "react";
import Image from "next/image";
import { Images, X } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Loader from "../../components/Loader";
import { useGallery } from "../../functions/gallery";

export default function GalleryPage() {
  const { data: photos, isLoading } = useGallery();
  const [activePhoto, setActivePhoto] = useState(null);
  const list = photos || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <SiteHeader />

      <div className="bg-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-4">
            <Images className="w-7 h-7" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Gallery</h1>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto">
            Moments from Kenics Pageant — runway, rehearsals, and celebration.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        {isLoading ? (
          <Loader text="Loading gallery..." />
        ) : list.length === 0 ? (
          <div className="max-w-xl mx-auto text-center bg-white rounded-2xl border border-pink-100 p-10 shadow-sm">
            <p className="text-gray-600">
              No photos yet. Check back soon for gallery updates.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {list.map((photo) => (
              <button
                key={photo._id}
                type="button"
                onClick={() => setActivePhoto(photo)}
                className="block w-full break-inside-avoid rounded-xl overflow-hidden border border-pink-100 bg-white shadow-sm hover:shadow-md transition text-left"
              >
                <div className="relative w-full aspect-4/5 bg-pink-50">
                  <Image
                    src={photo.url}
                    alt={photo.caption || "Kenics gallery photo"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                {photo.caption ? (
                  <p className="p-3 text-sm text-gray-600">{photo.caption}</p>
                ) : null}
              </button>
            ))}
          </div>
        )}
      </main>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActivePhoto(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative w-full max-w-4xl max-h-[85vh] aspect-4/3"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePhoto.url}
              alt={activePhoto.caption || "Kenics gallery photo"}
              fill
              className="object-contain"
              unoptimized
            />
            {activePhoto.caption ? (
              <p className="absolute bottom-0 inset-x-0 text-center text-white bg-black/50 py-3 text-sm">
                {activePhoto.caption}
              </p>
            ) : null}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
