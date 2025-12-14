"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { getAge } from "../../../functions/modifiyer";
import {
  Heart,
  Share2,
  Instagram,
  Facebook,
  Twitter,
  Calendar,
  Phone,
  Mail,
  Ruler,
  Weight,
  Award,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import Loader from "../../../components/Loader";

const categoryLabels = {
  baby: "Baby Kenics",
  teen: "Teen Kenics",
  miss: "Miss Kenics",
  mrs: "Mrs. Kenics",
};

// Vote packages with pricing
const votePackages = [
  { votes: 1, price: 1000, perVote: 1000, popular: false },
  { votes: 5, price: 4500, perVote: 900, popular: false },
  { votes: 10, price: 9000, perVote: 900, popular: true },
  { votes: 20, price: 17000, perVote: 850, popular: false },
  { votes: 50, price: 40000, perVote: 800, popular: false },
  { votes: 100, price: 75000, perVote: 750, popular: false },
];

export default function ModelDetailPage() {
  const params = useParams();
  const modelId = params?.id;

  const { data: model, error, isLoading } = useSWR(`/registration/${modelId}`);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [selectedVotePackage, setSelectedVotePackage] = useState(null);
  console.log(model);
  // Parse JSON strings if they exist
  const socialMedia = model?.socialMedia
    ? typeof model.socialMedia === "string"
      ? JSON.parse(model.socialMedia)
      : model.socialMedia
    : {};

  const emergencyContact = model?.emergencyContact
    ? typeof model.emergencyContact === "string"
      ? JSON.parse(model.emergencyContact)
      : model.emergencyContact
    : {};

  if (isLoading) {
    return <Loader text="Loading model details..." />;
  }

  if (error || !model) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Model Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error?.message || "The model you're looking for doesn't exist."}
          </p>
          <Link
            href="/models"
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Models
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${model.firstName} ${model.lastName} - Kenics Pageant`,
          text: `Check out ${model.firstName} ${model.lastName} on Kenics Pageant!`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % (model.photos?.length || 1));
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex(
      (prev) =>
        (prev - 1 + (model.photos?.length || 1)) % (model.photos?.length || 1)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/models"
            className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Models
          </Link>
        </div>
      </div>

      {/* Hero Section with Main Photo */}
      <div className="relative bg-linear-to-br from-pink-600 to-purple-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Photo Gallery */}
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                {model.photos && model.photos.length > 0 ? (
                  <>
                    <Image
                      src={model.photos[selectedPhotoIndex]}
                      alt={`${model.firstName} ${model.lastName}`}
                      fill
                      className="object-cover cursor-pointer"
                      onClick={() => setIsPhotoModalOpen(true)}
                      priority
                    />
                    {model.photos.length > 1 && (
                      <>
                        <button
                          onClick={prevPhoto}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextPhoto}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {model.photos.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedPhotoIndex(index)}
                              className={`h-2 rounded-full transition-all ${
                                index === selectedPhotoIndex
                                  ? "w-8 bg-white"
                                  : "w-2 bg-white/50 hover:bg-white/75"
                              }`}
                              aria-label={`Go to photo ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User className="w-32 h-32 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {model.photos && model.photos.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {model.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPhotoIndex(index)}
                      className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedPhotoIndex
                          ? "border-pink-500 ring-2 ring-pink-200"
                          : "border-transparent hover:border-pink-300"
                      }`}
                    >
                      <Image
                        src={photo}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Model Info */}
            <div className="text-white space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  {categoryLabels[model.category] || model.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                  {model.firstName} {model.lastName}
                </h1>
                <div className="flex items-center gap-6 text-white/90">
                  {model.dateOfBirth && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{getAge(model.dateOfBirth)} years old</span>
                    </div>
                  )}
                  {model.score?.voteCount !== undefined && (
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 fill-current" />
                      <span>{model.score.voteCount} votes</span>
                    </div>
                  )}
                </div>
              </div>

              {model.bio && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">About</h2>
                  <p className="text-white/90 leading-relaxed">{model.bio}</p>
                </div>
              )}

              {/* Physical Attributes */}
              {(model.height || model.weight) && (
                <div className="grid grid-cols-2 gap-4">
                  {model.height && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Ruler className="w-5 h-5" />
                        <span className="text-sm text-white/80">Height</span>
                      </div>
                      <p className="text-2xl font-bold">{model.height} cm</p>
                    </div>
                  )}
                  {model.weight && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Weight className="w-5 h-5" />
                        <span className="text-sm text-white/80">Weight</span>
                      </div>
                      <p className="text-2xl font-bold">{model.weight} kg</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all text-white font-medium"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button
                  onClick={() => setIsVoteModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-pink-600 rounded-lg hover:bg-pink-50 transition-all font-medium"
                >
                  <Heart className="w-5 h-5" />
                  Vote Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience Section */}
            {model.experience && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-pink-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Modeling/Pageant Experience
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {model.experience}
                </p>
              </div>
            )}

            {/* Achievements Section */}
            {model.achievements && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-6 h-6 text-pink-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Achievements & Awards
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {model.achievements}
                </p>
              </div>
            )}

            {/* Social Media Section */}
            {(socialMedia.instagram ||
              socialMedia.facebook ||
              socialMedia.twitter ||
              socialMedia.tiktok) && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Connect on Social Media
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${socialMedia.instagram.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg text-white hover:shadow-lg transition-all group"
                    >
                      <Instagram className="w-6 h-6" />
                      <span className="text-sm font-medium">Instagram</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {socialMedia.facebook && (
                    <a
                      href={`https://facebook.com/${socialMedia.facebook.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 bg-blue-600 rounded-lg text-white hover:shadow-lg transition-all group"
                    >
                      <Facebook className="w-6 h-6" />
                      <span className="text-sm font-medium">Facebook</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {socialMedia.twitter && (
                    <a
                      href={`https://twitter.com/${socialMedia.twitter.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 bg-sky-500 rounded-lg text-white hover:shadow-lg transition-all group"
                    >
                      <Twitter className="w-6 h-6" />
                      <span className="text-sm font-medium">Twitter</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {socialMedia.tiktok && (
                    <a
                      href={`https://tiktok.com/@${socialMedia.tiktok.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 bg-black rounded-lg text-white hover:shadow-lg transition-all group"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                      <span className="text-sm font-medium">TikTok</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Videos Section */}
            {model.videos && model.videos.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Videos
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {model.videos.map((video, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <video
                        src={video}
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Card */}
            <div className="bg-linear-to-br from-pink-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 mx-auto mb-3 fill-current" />
                <h3 className="text-2xl font-bold mb-2">Vote Now</h3>
                <p className="text-white/90 text-sm">
                  Show your support for {model.firstName}!
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">
                    {model.score?.voteCount || 0}
                  </p>
                  <p className="text-white/80 text-sm">Total Votes</p>
                </div>
              </div>
              <button
                onClick={() => setIsVoteModalOpen(true)}
                className="w-full py-3 bg-white text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
              >
                Cast Your Vote
              </button>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-pink-600" />
                Contact Information
              </h3>
              <div className="space-y-3">
                {model.email && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a
                      href={`mailto:${model.email}`}
                      className="hover:text-pink-600 transition-colors break-all"
                    >
                      {model.email}
                    </a>
                  </div>
                )}
                {model.phone && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a
                      href={`tel:${model.phone}`}
                      className="hover:text-pink-600 transition-colors"
                    >
                      {model.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Contact */}
            {emergencyContact.name && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-600" />
                  Emergency Contact
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {emergencyContact.name}
                  </p>
                  {emergencyContact.relationship && (
                    <p>
                      <span className="font-medium">Relationship:</span>{" "}
                      {emergencyContact.relationship}
                    </p>
                  )}
                  {(emergencyContact.phone || emergencyContact.number) && (
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {emergencyContact.phone || emergencyContact.number}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {isPhotoModalOpen && model.photos > 0 && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <button
            onClick={() => setIsPhotoModalOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-7xl w-full h-full flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={model.photos[selectedPhotoIndex]}
                alt={`${model.firstName} ${model.lastName} - Photo ${
                  selectedPhotoIndex + 1
                }`}
                fill
                className="object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
              aria-label="Next photo"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Vote Modal */}
      {isVoteModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setIsVoteModalOpen(false);
            setSelectedVotePackage(null);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-r from-pink-600 to-purple-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    Vote for {model.firstName}
                  </h2>
                  <p className="text-white/90 text-sm">
                    Choose a vote package to show your support
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsVoteModalOpen(false);
                    setSelectedVotePackage(null);
                  }}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Current Vote Count */}
              <div className="bg-linear-to-br from-pink-50 to-purple-50 rounded-xl p-4 mb-6 text-center">
                <p className="text-sm text-gray-600 mb-1">Current Votes</p>
                <p className="text-3xl font-bold text-pink-600">
                  {model.score?.voteCount || 0}
                </p>
              </div>

              {/* Vote Packages */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Vote Package
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {votePackages.map((pkg, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVotePackage(pkg)}
                      className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                        selectedVotePackage?.votes === pkg.votes
                          ? "border-pink-500 bg-pink-50 shadow-lg scale-105"
                          : "border-gray-200 hover:border-pink-300 hover:shadow-md bg-white"
                      } ${pkg.popular ? "ring-2 ring-pink-200" : ""}`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-pink-600 text-white text-xs font-semibold rounded-full">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            {pkg.votes} {pkg.votes === 1 ? "Vote" : "Votes"}
                          </p>
                          {pkg.votes > 1 && (
                            <p className="text-xs text-gray-500 mt-1">
                              ₦{pkg.perVote.toLocaleString()} per vote
                            </p>
                          )}
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedVotePackage?.votes === pkg.votes
                              ? "border-pink-500 bg-pink-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedVotePackage?.votes === pkg.votes && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-pink-600">
                          ₦{pkg.price.toLocaleString()}
                        </span>
                      </div>
                      {pkg.votes > 1 && (
                        <p className="text-xs text-green-600 mt-2 font-medium">
                          Save ₦
                          {(pkg.votes * 1000 - pkg.price).toLocaleString()}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Vote Input */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter custom number of votes
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter number of votes"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    onChange={(e) => {
                      const votes = parseInt(e.target.value);
                      if (votes > 0) {
                        const price = votes * 1000;
                        setSelectedVotePackage({
                          votes,
                          price,
                          perVote: 1000,
                          popular: false,
                        });
                      } else {
                        setSelectedVotePackage(null);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Selected Package Summary */}
              {selectedVotePackage && (
                <div className="bg-linear-to-br from-pink-50 to-purple-50 rounded-xl p-5 mb-6 border-2 border-pink-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Order Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>{selectedVotePackage.votes} Votes</span>
                      <span className="font-medium">
                        ₦{selectedVotePackage.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-pink-200 pt-2 flex justify-between items-center">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-pink-600">
                        ₦{selectedVotePackage.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsVoteModalOpen(false);
                    setSelectedVotePackage(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!selectedVotePackage) {
                      toast.error("Please select a vote package");
                      return;
                    }
                    // TODO: Integrate with payment API
                    toast.success("Voting has not started yet");
                    // Here you would typically redirect to payment gateway
                    // window.location.href = `/payment?votes=${selectedVotePackage.votes}&modelId=${modelId}&amount=${selectedVotePackage.price}`;
                  }}
                  disabled={!selectedVotePackage}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-pink-600 to-purple-700 text-white rounded-lg hover:from-pink-700 hover:to-purple-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
