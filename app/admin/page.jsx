"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken } from "../../functions/admin";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-pink-600 font-medium">
      Redirecting...
    </div>
  );
}
