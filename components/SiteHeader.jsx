"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/models", label: "Models" },
  { href: "/voting", label: "Voting" },
  { href: "/gallery", label: "Gallery" },
  { href: "/winners", label: "Winners" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-pink-600">
            KENICS
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/register"
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300 inline-block text-sm font-medium"
            >
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-pink-600 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-pink-50">
            <nav className="flex flex-col space-y-3 pt-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-medium px-2 py-1 ${
                    isActive(link.href) ? "text-pink-600" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="bg-pink-600 text-white text-center px-4 py-2 rounded-full font-medium"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
