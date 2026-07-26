"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Loader from "../../components/Loader";
import { useGallery } from "../../functions/gallery";

export default function GalleryPage() {
  const { data: photos, isLoading } = useGallery();
  const [activePhoto, setActivePhoto] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const list = photos || [];

  useEffect(() => {
    if (list.length <= 1) return undefined;

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % list.length);
        setFade(true);
      }, 350);
    }, 4500);

    return () => clearInterval(timer);
  }, [list.length]);

  const goToSlide = (nextIndex) => {
    if (!list.length) return;
    setFade(false);
    setTimeout(() => {
      setSlideIndex((nextIndex + list.length) % list.length);
      setFade(true);
    }, 250);
  };

  const current = list[slideIndex];

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

      <main className="container mx-auto px-4 py-12 flex-1 space-y-12">
        {isLoading ? (
          <Loader text="Loading gallery..." />
        ) : list.length === 0 ? (
          <div className="max-w-xl mx-auto text-center bg-white rounded-2xl border border-pink-100 p-10 shadow-sm">
            <p className="text-gray-600">
              No photos yet. Check back soon for gallery updates.
            </p>
          </div>
        ) : (
          <>
            {/* Fade carousel */}
            <section className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-pink-100 shadow-lg bg-black">
              <div className="relative aspect-16/9 md:aspect-21/9">
                {current && (
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      fade ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={current.url}
                      alt={current.caption || "Kenics gallery highlight"}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      unoptimized
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    {current.caption ? (
                      <p className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base font-medium drop-shadow">
                        {current.caption}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>

              {list.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goToSlide(slideIndex - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-pink-700 hover:bg-white shadow"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(slideIndex + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-pink-700 hover:bg-white shadow"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                    {list.map((photo, index) => (
                      <button
                        key={photo._id}
                        type="button"
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          index === slideIndex
                            ? "w-6 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>

            {/* Photo grid */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                All Photos
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {list.map((photo, index) => (
                  <button
                    key={photo._id}
                    type="button"
                    onClick={() => {
                      setActivePhoto(photo);
                      setSlideIndex(index);
                    }}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-pink-100 bg-pink-50 shadow-sm hover:shadow-md transition"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption || "Kenics gallery photo"}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized
                    />
                    {photo.caption ? (
                      <span className="absolute inset-x-0 bottom-0 bg-black/55 text-white text-xs p-2 line-clamp-2 text-left">
                        {photo.caption}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </section>
          </>
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
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              const index = list.findIndex((p) => p._id === activePhoto._id);
              const prev = list[(index - 1 + list.length) % list.length];
              setActivePhoto(prev);
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              const index = list.findIndex((p) => p._id === activePhoto._id);
              const next = list[(index + 1) % list.length];
              setActivePhoto(next);
            }}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
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
