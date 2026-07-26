"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

const faqs = [
  {
    question: "How do I register for Kenics Pageant?",
    answer:
      "Go to the Register page, choose an open category for the active contest, fill in your details, upload your photos, accept the terms, and complete payment. Your registration is confirmed after a successful payment.",
  },
  {
    question: "How much does registration cost?",
    answer:
      "Registration fees differ by category. The exact amount is shown on the registration form when you select a category for the active contest.",
  },
  {
    question: "When can people vote for contestants?",
    answer:
      "Public voting opens only when Kenics enables voting for the active contest. Once it is open, anyone can vote for a contestant from their profile page by selecting the number of votes and paying online.",
  },
  {
    question: "How much does a vote cost?",
    answer:
      "Each category has its own voting price. Your total is the number of votes you choose multiplied by that category’s price per vote. The amount is calculated before you are redirected to payment.",
  },
  {
    question: "I paid but my votes or registration status has not updated.",
    answer:
      "Payments are confirmed through Flutterwave. Please wait a short while for the webhook to update your status. If nothing changes after several minutes, contact us with your payment reference and email used at checkout.",
  },
  {
    question: "Can I register for more than one category?",
    answer:
      "You register under one category for a given contest. If you already completed a paid registration for that contest, you cannot register again with the same email for the same contest.",
  },
  {
    question: "Where can I see winners and the leaderboard?",
    answer:
      "The Voting page shows the live leaderboard by category. The Winners page highlights top contestants by votes, including winners from the latest contest when no contest is currently active.",
  },
  {
    question: "How do I contact Kenics support?",
    answer:
      "Use the Contact Us page to send a message, or reach us by email at info@kenicspageant.online or WhatsApp at +2348026190053.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <SiteHeader />

      <div className="bg-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-4">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto">
            Answers about registration, voting, payments, and how Kenics Pageant
            works.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <div
                key={item.question}
                className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-pink-600 shrink-0 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-pink-50 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto mt-10 text-center bg-white rounded-2xl border border-pink-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Still have a question?
          </h2>
          <p className="text-gray-600 mb-6">
            Send us a message and we&apos;ll get back to you as soon as we can.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-medium"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
