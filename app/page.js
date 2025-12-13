"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Kenics Pageant - Celebrating Beauty, Grace & Excellence</title>
        <meta
          name="description"
          content="Kenics Pageant - Where beauty meets purpose. Join us in celebrating confidence, intelligence, and empowerment."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/50 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-pink-600">
                KENICS
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-200 hover:text-pink-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/models"
                className="text-gray-200 hover:text-pink-600 font-medium"
              >
                Models
              </Link>
              <Link
                href="/voting"
                className="text-gray-200 hover:text-pink-600 font-medium"
              >
                Voting
              </Link>
              <Link
                href="/winners"
                className="text-gray-200 hover:text-pink-600 font-medium"
              >
                Winners
              </Link>
              <Link
                href="/contact"
                className="text-gray-200 hover:text-pink-600 font-medium"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden md:block">
              <Link
                href="/register"
                className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300 inline-block"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-gray-200 hover:text-pink-600 font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/models"
                  className="text-gray-200 hover:text-pink-600 font-medium"
                >
                  Models
                </Link>
                <Link
                  href="/voting"
                  className="text-gray-200 hover:text-pink-600 font-medium"
                >
                  Voting
                </Link>
                <Link
                  href="/winners"
                  className="text-gray-200 hover:text-pink-600 font-medium"
                >
                  Winners
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-200 hover:text-pink-600 font-medium"
                >
                  Contact
                </Link>
                <Link href="/register" className="block w-full">
                  <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-300 w-full mt-2">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
        style={{ minHeight: "600px" }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-pink-100 flex items-center justify-center">
              <p className="text-pink-800 text-lg">
                If you see this, the image didn&rsquo;t load
              </p>
            </div>

            {/* Try direct public path */}
            <Image src="/images/img1.jpg" alt="Kenics Pageant" fill priority />

            <div
              className="absolute inset-0 bg-black/40 bg-linear-to-t from-black/80 to-transparent"
              style={{ zIndex: 2 }}
            ></div>
          </div>
        </div>
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            KENICS PAGEANT 2025
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Celebrating Beauty, Grace, and Empowerment
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg font-medium transition duration-300 w-full sm:w-auto">
                Apply Now
              </button>
            </Link>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                About Kenics Pageant
              </h2>
              <p className="text-gray-600 mb-6">
                Kenics Pageant is more than just a beauty competition; it&apos;s
                a platform for women to showcase their talents, intelligence,
                and commitment to making a difference in their communities.
              </p>
              <p className="text-gray-600 mb-8">
                Since our inception, we&apos;ve been dedicated to empowering
                women to be confident, compassionate leaders who inspire others
                through their actions and achievements.
              </p>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/img2.jpg"
                  alt="About Kenics Pageant"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Categories
            </h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Baby Kenics",
                description: "Ages 0-12, children are the future.",
                icon: "👶",
              },
              {
                title: "Miss Kenics",
                description:
                  "Ages 18-25, celebrating beauty, intelligence, and leadership.",
                icon: "👑",
              },
              {
                title: "Teen Kenics",
                description:
                  "Ages 13-17, empowering the next generation of leaders.",
                icon: "🌟",
              },
              {
                title: "Mrs. Kenics",
                description:
                  "For married women, celebrating grace, wisdom, and family values.",
                icon: "💍",
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Grand Finale Countdown
          </h2>
          <div className="flex justify-center space-x-2 sm:space-x-6">
            {[
              { value: "45", label: "Days" },
              { value: "12", label: "Hours" },
              { value: "30", label: "Minutes" },
              { value: "45", label: "Seconds" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 rounded-lg p-4 sm:p-6 w-20 sm:w-28"
              >
                <div className="text-2xl sm:text-4xl font-bold">
                  {item.value}
                </div>
                <div className="text-sm sm:text-base opacity-80">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-10 bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium transition duration-300">
            Get Your Tickets
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Queens Say
            </h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Kenics Pageant changed my life. It gave me the confidence to pursue my dreams and make a difference in my community.",
                name: "Sarah Johnson",
                title: "Miss Kenics 2023",
              },
              {
                quote:
                  "The sisterhood and support I found at Kenics is something I'll cherish forever. It's more than a pageant; it's a family.",
                name: "Emily Rodriguez",
                title: "Teen Kenics 2023",
              },
              {
                quote:
                  "As Mrs. Kenics, I've had incredible opportunities to advocate for causes close to my heart. This platform is truly empowering.",
                name: "Michelle Chen",
                title: "Mrs. Kenics 2023",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="text-yellow-400 text-2xl mb-4">&apos;</div>
                <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                <div className="font-semibold text-gray-800">
                  {testimonial.name}
                </div>
                <div className="text-pink-600 text-sm">{testimonial.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of confident women who have transformed their lives
            through Kenics Pageant.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium transition duration-300 w-full sm:w-auto">
                Apply Now
              </button>
            </Link>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-full text-lg font-medium transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KENICS</h3>
              <p className="text-gray-400">
                Celebrating beauty, grace, and empowerment since 2010.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/voting"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Voting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/winners"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Past Winners
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white transition"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  123 Pageant Ave, New York, NY
                </li>
                <li className="flex items-center text-gray-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@kenicspageant.com
                </li>
                <li className="flex items-center text-gray-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +1 (555) 123-4567
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "youtube"].map(
                  (social) => (
                    <a
                      key={social}
                      href={`#`}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <span className="sr-only">
                        {social.charAt(0).toUpperCase() + social.slice(1)}
                      </span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )
                )}
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-400">
                  Subscribe to our newsletter
                </p>
                <div className="mt-2 flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 w-full rounded-l text-gray-900 focus:outline-none"
                  />
                  <button className="bg-pink-600 hover:bg-pink-700 px-4 rounded-r">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Kenics Pageant. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
