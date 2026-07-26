"use client";

import { useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { Toaster, toast } from "sonner";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { useSubmitContact } from "../../functions/contact";

const OFFICIAL_EMAIL = "info@kenicspageant.online";
const WHATSAPP_NUMBER = "+2348026190053";
const WHATSAPP_LINK = "https://wa.me/2348026190053";

const initialForm = {
  name: "",
  email: "",
  whatsapp: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const { trigger, isMutating } = useSubmitContact();
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const whatsapp = form.whatsapp.trim();
    const message = form.message.trim();

    if (!name || !message) {
      toast.error("Please fill in your name and message.");
      return;
    }

    if (!email && !whatsapp) {
      toast.error("Provide either your email or WhatsApp number.");
      return;
    }

    try {
      await trigger({
        name,
        email: email || undefined,
        whatsapp: whatsapp || undefined,
        subject: form.subject.trim() || undefined,
        message,
      });
      setForm(initialForm);
      toast.success("Thanks for reaching out! We'll get back to you soon.");
    } catch (error) {
      toast.error(error?.message || "Could not send message. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white flex flex-col">
      <Toaster position="top-center" richColors />
      <SiteHeader />

      <div className="bg-pink-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-lg text-pink-100 max-w-2xl mx-auto">
            Questions about registration, voting, or sponsorship? We&apos;d love
            to hear from you.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-50">
              <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="text-pink-600 text-sm hover:underline break-all"
              >
                {OFFICIAL_EMAIL}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-50">
              <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 text-sm hover:underline"
              >
                {WHATSAPP_NUMBER}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-50">
              <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="text-pink-600 text-sm hover:underline"
              >
                {WHATSAPP_NUMBER}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-pink-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Send a Message
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Fill out the form and our team will respond as soon as possible.
              Provide either your email or WhatsApp number.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="+234..."
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 -mt-2">
                At least one of email or WhatsApp is required.
              </p>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-y"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isMutating}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-medium disabled:opacity-60 transition"
              >
                <Send className="w-4 h-4" />
                {isMutating ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
