"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { Crown, Medal, Star, Trophy, ChevronLeft } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Loader from "../../components/Loader";
import { useActiveContest } from "../../functions/contest";

function rankStyle(rank) {
  if (rank === 1) {
    return {
      badge: "bg-yellow-400 text-yellow-950",
      ring: "ring-2 ring-yellow-400",
      icon: <Crown className="w-5 h-5 text-yellow-500" />,
    };
  }
  if (rank === 2) {
    return {
      badge: "bg-gray-300 text-gray-800",
      ring: "ring-2 ring-gray-300",
      icon: <Medal className="w-5 h-5 text-gray-400" />,
    };
  }
  if (rank === 3) {
    return {
      badge: "bg-amber-700 text-amber-50",
      ring: "ring-2 ring-amber-600",
      icon: <Medal className="w-5 h-5 text-amber-700" />,
    };
  }
  return {
    badge: "bg-pink-100 text-pink-700",
    ring: "",
    icon: <Trophy className="w-4 h-4 text-pink-500" />,
  };
}

export default function VotingPage() {
  const { data, error, isLoading } = useSWR("/registration");
  const { data: activeContest, isLoading: contestLoading } = useActiveContest();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const list = (activeContest?.categories || []).map((c) => ({
      id: c.slug,
      label: c.name,
    }));
    return [{ id: "all", label: "All Categories" }, ...list];
  }, [activeContest]);

  const leaderboard = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const filtered =
      selectedCategory === "all"
        ? data
        : data.filter((model) => model.category === selectedCategory);

    return [...filtered].sort(
      (a, b) => (b.score?.voteCount || 0) - (a.score?.voteCount || 0),
    );
  }, [data, selectedCategory]);

  if (isLoading || contestLoading)
    return <Loader text="Loading leaderboard..." />;

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
              The leaderboard will open when a contest is active.
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unable to load leaderboard
          </h2>
          <p className="text-gray-600 mb-6">
            {error?.message || "Please try again later."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <SiteHeader />

      <div className="bg-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-4">
            <Trophy className="w-7 h-7" />
          </div>
          <p className="text-pink-100 text-sm mb-2">{activeContest.name}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Contest Leaderboard
          </h1>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto">
            See who&apos;s leading the race. Support your favourite contestant
            and help them climb the ranks.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30"
                  : "bg-white text-pink-700 hover:bg-pink-50 border border-pink-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-12 h-12 text-pink-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No contestants yet
            </h3>
            <p className="text-gray-500 mb-6">
              Check back soon or browse models once registrations open.
            </p>
            <Link
              href="/models"
              className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700"
            >
              View Models
            </Link>
          </div>
        ) : (
          <>
            {topThree.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                {topThree.map((model, index) => {
                  const rank = index + 1;
                  const style = rankStyle(rank);
                  const votes = model.score?.voteCount || 0;

                  return (
                    <Link
                      key={model._id}
                      href={`/models/${model._id}`}
                      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${style.ring} ${
                        rank === 1
                          ? "md:-mt-4 md:order-2"
                          : rank === 2
                            ? "md:order-1"
                            : "md:order-3"
                      }`}
                    >
                      <div className="relative h-64">
                        <Image
                          src={model.photos?.[0] || "/images/img1.jpg"}
                          alt={`${model.firstName} ${model.lastName}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${style.badge}`}
                          >
                            #{rank}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 text-center">
                        <div className="flex justify-center mb-2">{style.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {model.firstName} {model.lastName}
                        </h3>
                        <p className="text-sm text-pink-600 capitalize mt-1">
                          {model.category}
                        </p>
                        <div className="flex items-center justify-center mt-3 text-gray-700">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">{votes}</span>
                          <span className="text-gray-500 ml-1 text-sm">
                            votes
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {rest.length > 0 && (
              <div className="max-w-3xl mx-auto space-y-3">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Full Rankings
                </h2>
                {rest.map((model, index) => {
                  const rank = index + 4;
                  const votes = model.score?.voteCount || 0;

                  return (
                    <Link
                      key={model._id}
                      href={`/models/${model._id}`}
                      className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm hover:shadow-md border border-pink-50 transition"
                    >
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-700 font-bold text-sm shrink-0">
                        {rank}
                      </span>
                      <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-pink-50">
                        <Image
                          src={model.photos?.[0] || "/images/img1.jpg"}
                          alt={`${model.firstName} ${model.lastName}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {model.firstName} {model.lastName}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          {model.category}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-pink-600">{votes}</p>
                        <p className="text-xs text-gray-500">votes</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href="/models"
                className="inline-block px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-medium"
              >
                Vote for a Contestant
              </Link>
            </div>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
