"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import {
  getAdminToken,
  saveAdminSession,
  useAdminLogin,
} from "../../../functions/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const { trigger, isMutating } = useAdminLogin();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (getAdminToken()) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await trigger(form);
      saveAdminSession(result.accessToken, result.admin);
      toast.success("Welcome back");
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error(error?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex items-center justify-center px-4">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-pink-100 p-8">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-pink-600">
            KENICS
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage contests and categories
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="admin@kenicspageant.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isMutating}
            className="w-full py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 disabled:opacity-60"
          >
            {isMutating ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
