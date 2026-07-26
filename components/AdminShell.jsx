"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Trophy,
  Users,
  X,
} from "lucide-react";
import {
  clearAdminSession,
  getAdminToken,
  getStoredAdmin,
} from "../functions/admin";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contests", label: "Contests", icon: Trophy },
  { href: "/admin/registrations", label: "Registrations", icon: Users },
  { href: "/admin/contact", label: "Contact Us", icon: Mail },
];

export default function AdminShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setAdmin(getStoredAdmin());
    setReady(true);
  }, [router]);

  const logout = () => {
    clearAdminSession();
    router.replace("/admin/login");
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-pink-600 font-medium">
        Loading admin...
      </div>
    );
  }

  const Nav = (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
              active
                ? "bg-pink-600 text-white"
                : "text-gray-700 hover:bg-pink-50 hover:text-pink-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-pink-100">
        <div className="px-5 py-5 border-b border-pink-50">
          <Link href="/" className="text-xl font-bold text-pink-600">
            KENICS
          </Link>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        <div className="flex-1 p-4">{Nav}</div>
        <div className="p-4 border-t border-pink-50">
          <p className="text-sm text-gray-700 font-medium truncate mb-3">
            {admin?.name || admin?.email}
          </p>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-pink-100 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 text-pink-600"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-pink-600">KENICS Admin</span>
          </div>
          <CalendarDays className="w-4 h-4 text-pink-400" />
        </header>

        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu overlay"
            />
            <aside className="relative w-72 max-w-[85%] h-full bg-white p-4 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-pink-600">KENICS</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {Nav}
              <button
                type="button"
                onClick={logout}
                className="mt-auto flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </aside>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
