"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, Crown, Sparkles } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import Loader from "../../components/Loader";
import { useWinners } from "../../functions/vote";

export default function WinnersPage() {
  const { data, isLoading } = useWinners();
  const winners = data?.winners || [];
  const votingOpen = Boolean(data?.votingOpen);
  const contestName = data?.contest?.name || "Kenics Pageant";
  const fromLatestInactive = Boolean(data?.fromLatestInactive);

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <SiteHeader />

      <div className="bg-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-4">
            <Crown className="w-7 h-7" />
          </div>
          <p className="text-pink-100 text-sm mb-2">{contestName}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Queens</h1>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto">
            {fromLatestInactive
              ? `Winners of ${contestName}`
              : votingOpen
                ? "Current leaders by public votes. Final winners are confirmed when voting stops."
                : `Celebrating the winners of ${contestName}.`}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 flex-1">
        {isLoading ? (
          <Loader text="Loading winners..." />
        ) : (
          <>
            <div className="max-w-2xl mx-auto text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                {fromLatestInactive
                  ? `Winners of ${contestName}`
                  : votingOpen
                    ? "Voting in progress"
                    : `Winners of ${contestName}`}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {fromLatestInactive
                  ? `Meet the winners of ${contestName}`
                  : votingOpen
                    ? "Leaders while voting is open"
                    : `Winners of ${contestName}`}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {fromLatestInactive
                  ? `There is no active contest right now. Showing winners from the latest contest: ${contestName}.`
                  : votingOpen
                    ? "When an admin stops voting, the model with the most votes in each category is confirmed as the winner."
                    : `These are the contestants with the highest votes in each category for ${contestName}.`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
              {winners.length === 0 && (
                <div className="sm:col-span-2 bg-white rounded-2xl border border-pink-100 p-8 text-center text-gray-500">
                  No contest winners to display yet.
                </div>
              )}

              {winners.map((entry) => {
                const contestant = entry.contestant;
                const photo = contestant?.photos?.[0];
                const label = entry.isWinner
                  ? `Winner of ${contestName}`
                  : entry.isLeading
                    ? "Leading"
                    : "Winner TBA";

                return (
                  <div
                    key={entry.categoryId}
                    className="bg-white rounded-2xl border border-pink-100 p-6 shadow-sm text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-pink-50 flex items-center justify-center overflow-hidden">
                      {photo ? (
                        <Image
                          src={photo}
                          alt={contestant?.firstName || entry.category}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Award className="w-7 h-7 text-pink-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {entry.category}
                    </h3>
                    {contestant ? (
                      <>
                        <p className="text-pink-600 font-semibold mb-1">
                          {contestant.firstName} {contestant.lastName}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          {entry.voteCount} votes
                        </p>
                        <p className="text-pink-600 font-medium text-sm mb-4">
                          {label}
                        </p>
                        <Link
                          href={`/models/${contestant._id}`}
                          className="text-sm text-gray-700 underline hover:text-pink-600"
                        >
                          View profile
                        </Link>
                      </>
                    ) : (
                      <p className="text-pink-600 font-medium text-sm">
                        Winner TBA
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

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
