"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, ArrowLeft, Home, Phone } from "lucide-react";
import Link from "next/link";

export default function PaymentComplete() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    // Simulate API call to verify payment status
    const verifyPayment = async () => {
      try {
        // In a real app, you would verify the payment with your backend
        // const response = await fetch(`/api/verify-payment?${searchParams.toString()}`);
        // const data = await response.json();

        // For demo purposes, we'll simulate a response
        setTimeout(() => {
          const isSuccess =
            searchParams.get("status") === "successful" || Math.random() > 0.3;

          setTransaction({
            id:
              searchParams.get("tx_ref") ||
              `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            amount: searchParams.get("amount") || "2,000.00",
            date: new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            name: searchParams.get("name") || "Contestant Registration",
          });

          setStatus(isSuccess ? "success" : "failed");
        }, 1500);
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [searchParams]);

  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verifying Your Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment details...
          </p>
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
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your payment. Your registration is now complete and
            you&apos;re officially in the competition!
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-700 mb-4">
              Transaction Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-medium">{transaction?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-medium">₦{transaction?.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Time</span>
                <span className="font-medium">{transaction?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completed
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
              href="/models"
              className="px-6 py-3 border border-pink-200 text-pink-600 font-medium rounded-lg hover:bg-pink-50 transition-colors text-center flex items-center justify-center gap-2"
            >
              View Contestants
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
          We couldn&apos;t process your payment. Please check your payment
          details and try again.
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
            {transaction?.id && (
              <div className="flex justify-between">
                <span className="text-gray-500">Reference</span>
                <span className="font-mono text-sm">{transaction.id}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
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
            <p className="text-sm text-pink-500">Contest Registration</p>
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
