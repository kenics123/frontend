"use client";

import Link from "next/link";
import { Award, Crown, Sparkles } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { useActiveContest } from "../../functions/contest";

export default function WinnersPage() {
  const { data: activeContest } = useActiveContest();
  const categories = activeContest?.categories || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <SiteHeader />

      <div className="bg-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-4">
            <Crown className="w-7 h-7" />
          </div>
          <p className="text-pink-100 text-sm mb-2">
            {activeContest?.name || "Kenics Pageant"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Queens</h1>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto">
            Celebrating the winners who embody beauty, grace, and purpose.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 flex-1">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Season coming soon
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Winners will be announced after the grand finale
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This year&apos;s crowns are still up for grabs. Follow the
            leaderboard, support your favourites, and check back here once the
            judges and votes decide our queens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
          {(categories.length
            ? categories.map((category) => ({
                id: category._id,
                title: category.name,
                description: category.description || "Winner to be announced",
              }))
            : [
                {
                  id: "tba",
                  title: "No active contest categories",
                  description: "Activate a contest to see winner categories here.",
                },
              ]
          ).map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-pink-50 flex items-center justify-center">
                <Award className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{category.description}</p>
              <p className="text-pink-600 font-medium text-sm">Winner TBA</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/voting"
            className="px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-medium text-center"
          >
            View Leaderboard
          </Link>
          <Link
            href="/models"
            className="px-8 py-3 bg-white text-pink-700 border border-pink-200 rounded-full hover:bg-pink-50 font-medium text-center"
          >
            Meet the Contestants
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
