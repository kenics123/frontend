"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Search, X, ChevronLeft } from "lucide-react";
import useSWR from "swr";
import { getAge } from "../../functions/modifiyer";
import { useActiveContest } from "../../functions/contest";
import Loader from "../../components/Loader";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export default function ModelsPage() {
  const { data, error, isLoading } = useSWR("/registration");
  const { data: activeContest, isLoading: contestLoading } = useActiveContest();

  const categories = useMemo(() => {
    const list = activeContest?.categories || [];
    return list.map((c) => ({ id: c.slug, label: c.name }));
  }, [activeContest]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const effectiveCategory = selectedCategory || categories[0]?.id || "";

  const filteredModels = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((model) => {
      const matchesCategory = !effectiveCategory
        ? true
        : model.category === effectiveCategory;
      const fullName = `${model.firstName} ${model.lastName}`.toLowerCase();
      const matchesSearch = !searchQuery.trim()
        ? true
        : fullName.includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, effectiveCategory, searchQuery]);

  if (isLoading || contestLoading) return <Loader text="Loading models..." />;

  if (!activeContest) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Active Contest
            </h2>
            <p className="text-gray-600 mb-6">
              Contestants will appear here once an admin activates a contest.
            </p>
            <Link href="/" className="text-pink-600 font-medium hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Models Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error?.message ||
              "unable to load any model at the moment, try again later."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <SiteHeader />
      <div className="bg-pink-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-pink-100 text-sm mb-2">{activeContest.name}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Talented Models
          </h1>
          <p className="text-lg md:text-xl text-pink-100 max-w-3xl mx-auto">
            Discover contestants registered for the active Kenics contest
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-pink-400" />
            </div>
            <input
              type="text"
              placeholder="Search models by name..."
              className="block w-full pl-10 pr-3 py-3 border border-pink-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  effectiveCategory === category.id
                    ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30"
                    : "bg-white text-pink-700 hover:bg-pink-50 border border-pink-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredModels.map((model) => (
            <div
              key={model._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-80">
                <Image
                  src={model.photos[0]}
                  alt={model.firstName + " " + model.lastName}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {model.firstName + " " + model.lastName}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-white">
                          ({model.score?.voteCount || 0}) votes
                        </span>
                      </div>
                    </div>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full capitalize">
                    {model.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {getAge(model.dateOfBirth)} years
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {model.bio}
                </p>

                <Link
                  href={`/models/${model._id}`}
                  className="block text-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No models found
            </h3>
            <p className="text-gray-500">
              Try another category, or check back after more contestants
              register.
            </p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
