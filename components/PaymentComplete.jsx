"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Home,
  Phone,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { globalFetcher } from "../functions/fetcher";

function isFailedRedirectStatus(status) {
  return ["failed", "cancelled", "canceled", "error"].includes(
    String(status || "")
      .trim()
      .toLowerCase(),
  );
}

export default function PaymentComplete() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("confirming");
  const [transaction, setTransaction] = useState(null);
  const [isVotePayment, setIsVotePayment] = useState(false);

  useEffect(() => {
    const txRef =
      searchParams.get("tx_ref") ||
      searchParams.get("txRef") ||
      searchParams.get("reference") ||
      "";
    const redirectStatus = searchParams.get("status") || "";
    const voteHint =
      String(txRef).startsWith("vote_") ||
      String(searchParams.get("type") || "")
        .toLowerCase()
        .includes("vote");

    setIsVotePayment(voteHint);
    setTransaction({
      id: txRef || "—",
      amount: null,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: voteHint ? "Vote payment" : "Registration payment",
    });

    if (!txRef) {
      setStatus(isFailedRedirectStatus(redirectStatus) ? "failed" : "confirming");
      return;
    }

    if (isFailedRedirectStatus(redirectStatus)) {
      setStatus("failed");
      return;
    }

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 12;

    const poll = async () => {
      attempts += 1;
      try {
        const result = await globalFetcher(
          `/payment/status?tx_ref=${encodeURIComponent(txRef)}`,
        );

        if (cancelled) return;

        if (result?.type === "Vote") {
          setIsVotePayment(true);
          setTransaction((prev) => ({
            ...prev,
            type: "Vote payment",
            amount: result.amount ?? prev?.amount,
          }));
        } else if (result?.type === "Registration") {
          setIsVotePayment(false);
          setTransaction((prev) => ({
            ...prev,
            type: "Registration payment",
            amount: result.amount ?? prev?.amount,
          }));
        }

        if (result?.confirmed) {
          setStatus("success");
          return true;
        }

        if (
          result?.paymentStatus &&
          isFailedRedirectStatus(result.paymentStatus)
        ) {
          setStatus("failed");
          return true;
        }
      } catch {
        // Keep confirming while webhook may still be processing.
      }

      if (attempts >= maxAttempts) {
        if (!cancelled) setStatus("confirming");
        return true;
      }
      return false;
    };

    let timer;
    const run = async () => {
      const done = await poll();
      if (!done && !cancelled) {
        timer = setTimeout(run, 2500);
      }
    };

    run();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [searchParams]);

  const renderContent = () => {
    if (status === "confirming") {
      return (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-pink-600" />
          </div>
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Confirming Your Payment
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;re verifying with our payment provider. This usually takes a
            few seconds — please wait.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Do not close this page. Your payment is only complete after
            confirmation.
          </p>

          {transaction?.id && transaction.id !== "—" && (
            <div className="bg-white rounded-xl border border-pink-100 p-4 text-left mb-6">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Reference</span>
                <span className="font-mono break-all text-right">
                  {transaction.id}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 border border-pink-200 text-pink-700 font-medium rounded-lg hover:bg-pink-50 transition-colors text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      );
    }

    if (status === "success") {
      return (
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Confirmed
          </h1>
          <p className="text-gray-600 mb-8">
            {isVotePayment
              ? "Thank you for voting! Your votes have been received and will appear on the leaderboard shortly."
              : "Thank you for your payment. Your registration is now complete and you're officially in the competition!"}
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-700 mb-4">
              Transaction Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Type</span>
                <span className="font-medium">{transaction?.type}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-medium break-all text-right">
                  {transaction?.id}
                </span>
              </div>
              {transaction?.amount != null && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium">₦{transaction.amount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Time</span>
                <span className="font-medium">{transaction?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmed
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors text-center flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href={isVotePayment ? "/voting" : "/models"}
              className="px-6 py-3 border border-pink-200 text-pink-600 font-medium rounded-lg hover:bg-pink-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              {isVotePayment ? "View Leaderboard" : "View Contestants"}
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-pink-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-8">
          {isVotePayment
            ? "We couldn't process your vote payment. Please try again."
            : "We couldn't process your payment. Please check your payment details and try again."}
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-700 mb-4">
            Transaction Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Failed
              </span>
            </div>
            {transaction?.id && transaction.id !== "—" && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Reference</span>
                <span className="font-mono text-sm break-all text-right">
                  {transaction.id}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-pink-200 text-pink-700 font-medium rounded-lg hover:bg-pink-50 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Try Again
          </button>
          <Link
            href="/contact"
            className="px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors text-center flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Contact Support
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">
      <main className="grow flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-pink-600 mb-2">
              KENICS
            </Link>
            <p className="text-sm text-pink-500">
              {isVotePayment ? "Vote Payment" : "Contest Registration"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-pink-100">
            {renderContent()}
          </div>

          <div className="mt-8 text-center text-sm text-pink-600">
            <p>
              Having trouble?{" "}
              <Link
                href="/contact"
                className="font-medium hover:text-pink-700 hover:underline"
              >
                Contact our support team
              </Link>
            </p>
            <p className="mt-2 text-pink-500">
              © {new Date().getFullYear()} KENICS. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
