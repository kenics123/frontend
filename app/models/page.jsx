"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import pic1 from "../../public/pic1.jpg";
import pic2 from "../../public/pic2.jpg";
import pic3 from "../../public/pic3.jpg";
import { Heart, Grid, Star, ChevronRight, Search } from "lucide-react";

// Mock data - replace with actual API call
const models = [
  {
    id: "10",
    name: "Alex Johnson",
    age: 25,
    category: "mrs",
    rating: 4.8,
    votes: 1243,
    bio: "Professional model with 5+ years in high fashion and commercial modeling. Specializes in editorial and runway.",
    imageUrl: pic1,
    featured: true,
  },
  {
    id: "1",
    name: "Alex Johnson",
    age: 25,
    category: "baby",
    rating: 4.8,
    votes: 1243,
    bio: "Professional model with 5+ years in high fashion and commercial modeling. Specializes in editorial and runway.",
    imageUrl: pic1,
    featured: true,
  },
  {
    id: "2",
    name: "Marcus Lee",
    age: 28,
    category: "baby",
    rating: 4.5,
    votes: 987,
    bio: "Fitness model and actor with a passion for health and wellness campaigns.",
    imageUrl: pic2,
    featured: false,
  },
  {
    id: "3",
    name: "Sarah Williams",
    age: 23,
    category: "miss",
    rating: 4.9,
    votes: 1856,
    bio: "Fashion design student with a unique perspective on style and self-expression.",
    imageUrl: pic3,
    featured: true,
  },
  {
    id: "30",
    name: "Sarah Williams",
    age: 23,
    category: "teen",
    rating: 4.9,
    votes: 1856,
    bio: "Fashion design student with a unique perspective on style and self-expression.",
    imageUrl: pic3,
    featured: true,
  },
  {
    id: "4",
    name: "Janny Jude",
    category: "teen",
    rating: 4.7,
    votes: 2450,
    bio: "Award-winning dance group known for innovative choreography and dynamic performances.",
    imageUrl: pic1,
    featured: false,
  },
  {
    id: "5",
    name: "Emily Brown",
    age: 20,
    category: "baby",
    rating: 4.3,
    votes: 720,
    bio: "Emerging talent with a fresh perspective on modern fashion and beauty standards.",
    imageUrl: pic2,
    featured: true,
  },
  {
    id: "6",
    name: "Emily Brown",
    age: 20,
    category: "miss",
    rating: 4.3,
    votes: 720,
    bio: "Emerging talent with a fresh perspective on modern fashion and beauty standards.",
    imageUrl: pic2,
    featured: true,
  },
  {
    id: "8",
    name: "Emily Brown",
    age: 20,
    category: "mrs",
    rating: 4.3,
    votes: 720,
    bio: "Emerging talent with a fresh perspective on modern fashion and beauty standards.",
    imageUrl: pic2,
    featured: true,
  },
];

const categories = [
  { id: "baby", label: "Baby Kenics" },
  { id: "teen", label: "Teen Kenics" },
  { id: "miss", label: "Miss Kenics" },
  { id: "mrs", label: "Mrs Kenics" },
];

export default function ModelsPage() {
  const [selectedCategory, setSelectedCategory] = useState("miss");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = models.filter((model) => {
    return model.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="bg-pink-600 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Talented Models
          </h1>
          <p className="text-lg md:text-xl text-pink-100 max-w-3xl mx-auto">
            Discover and connect with our diverse roster of professional models
            and performers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-pink-400" />
            </div>
            <input
              type="text"
              placeholder="Search models by name or specialty..."
              className="block w-full pl-10 pr-3 py-3 border border-pink-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30"
                    : "bg-white text-pink-700 hover:bg-pink-50 border border-pink-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
                model.featured ? "ring-2 ring-pink-500" : ""
              }`}
            >
              <div className="relative h-80">
                <Image
                  src={model.imageUrl}
                  alt={model.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                {model.featured && (
                  <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {model.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-white">
                          {model.rating} ({model.votes})
                        </span>
                      </div>
                    </div>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                    {model.category}
                  </span>
                  {model.age && (
                    <span className="text-sm text-gray-500">
                      {model.age} years
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {model.bio}
                </p>

                <div className="flex space-x-3">
                  <Link
                    href={`/models/${model.id}`}
                    className="flex-1 text-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm font-medium"
                  >
                    View Profile
                  </Link>
                  <button className="p-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredModels.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No models found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria to find what
              you&apos;re looking for.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 mt-10 text-center text-gray-500 text-sm border-t border-gray-200">
        &copy; {new Date().getFullYear()} KENICS. All rights reserved.
      </footer>
    </div>
  );
}
