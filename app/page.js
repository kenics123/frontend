"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { formatNaira, useActiveContest } from "../functions/contest";
import SiteFooter from "../components/SiteFooter";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    ended: false,
  });
  const { data: activeContest } = useActiveContest();
  const contestName = activeContest?.name?.trim() || "";

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

  useEffect(() => {
    const showDate = activeContest?.showDate;
    if (!showDate) {
      setCountdown({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        ended: false,
      });
      return;
    }

    const target = new Date(showDate).getTime();
    if (Number.isNaN(target)) return;

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setCountdown({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          ended: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        ended: false,
      });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [activeContest?.showDate]);

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
                href="/gallery"
                className="text-gray-200 hover:text-pink-600 font-medium"
              >
                Gallery
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
            <div className="md:hidden mt-4 pb-4 bg-black/50 backdrop-blur-md">
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
                  href="/gallery"
                  className="text-gray-200 hover:text-pink-600 font-medium"
                >
                  Gallery
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
            {contestName || "KENICS PAGEANT"}
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
              {contestName ? `${contestName} Categories` : "Our Categories"}
            </h2>
            <div className="w-20 h-1 bg-pink-600 mx-auto"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {activeContest?.categories?.length > 0 ? (
              activeContest.categories.map((category) => (
                <div
                  key={category._id || category.slug || category.name}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full max-w-sm text-center"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {category.description ||
                      `Registration fee: ${formatNaira(category.price)}`}
                  </p>
                  {category.price != null && (
                    <p className="text-pink-600 font-semibold">
                      {formatNaira(category.price)}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {contestName
                    ? "No categories yet"
                    : "No active contest"}
                </h3>
                <p className="text-gray-600">
                  {contestName
                    ? "Contest categories will be listed here shortly. Please check back soon."
                    : "Contest categories will be announced when registration opens. Please check back soon."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Grand Finale Countdown
          </h2>
          <p className="text-pink-100 mb-8">
            {activeContest?.showDate
              ? countdown.ended
                ? "The show date has arrived!"
                : `Counting down to ${contestName || "the main show"}`
              : "Activate a contest with a show date to start the countdown"}
          </p>
          <div className="flex justify-center space-x-2 sm:space-x-6">
            {[
              { value: countdown.days, label: "Days" },
              { value: countdown.hours, label: "Hours" },
              { value: countdown.minutes, label: "Minutes" },
              { value: countdown.seconds, label: "Seconds" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/20 rounded-lg p-4 sm:p-6 w-20 sm:w-28"
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
          <Link
            href="/register"
            className="inline-block mt-10 bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-medium transition duration-300"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Kenics Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              From application to the grand finale — here&apos;s how contestants
              and supporters join the journey.
            </p>
            <div className="w-20 h-1 bg-pink-600 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Register",
                description:
                  "Choose your category, complete your profile, and secure your spot with the registration fee.",
                href: "/register",
                cta: "Apply now",
              },
              {
                step: "02",
                title: "Get Votes",
                description:
                  "Share your profile with friends and family. Supporters can vote online once voting opens.",
                href: "/models",
                cta: "Meet contestants",
              },
              {
                step: "03",
                title: "Shine",
                description:
                  "Compete, climb the leaderboard, and celebrate the winners crowned for each category.",
                href: "/voting",
                cta: "View leaderboard",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-gray-50 p-8 rounded-xl text-center border border-pink-50 hover:border-pink-200 transition"
              >
                <div className="text-pink-600 font-bold text-sm tracking-widest mb-3">
                  STEP {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="inline-block text-pink-600 font-medium hover:text-pink-700"
                >
                  {item.cta} →
                </Link>
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

      <SiteFooter />
    </div>
  );
};

export default Home;
