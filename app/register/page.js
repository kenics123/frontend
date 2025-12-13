"use client";

import { useState } from "react";
import Link from "next/link";
import { useRegister } from "../../functions/registration";
import { Toaster, toast } from "sonner";

const RegisterPage = () => {
  const { trigger, isMutating } = useRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    category: "",
    bio: "",
    experience: "",
    achievements: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      tiktok: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
    termsAccepted: false,
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [additionalPhotos, setAdditionalPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Clear error for the field being updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } else if (name.includes(".") && errors[name.split(".")[0]]) {
      // Handle nested errors
      const [parent] = name.split(".");
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${parent}.${name.split(".")[1]}`];
        return newErrors;
      });
    }

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleAdditionalPhotosChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalPhotos((prev) => [...prev, ...files]);
  };

  const removeAdditionalPhoto = (index) => {
    setAdditionalPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic Info
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    // Physical Attributes
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.category) newErrors.category = "Category is required";

    // Bio and Experience
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";

    // Emergency Contact
    if (!formData.emergencyContact.name.trim())
      newErrors["emergencyContact.name"] = "Emergency contact name is required";
    if (!formData.emergencyContact.relationship.trim())
      newErrors["emergencyContact.relationship"] = "Relationship is required";
    if (!formData.emergencyContact.phone.trim())
      newErrors["emergencyContact.phone"] =
        "Emergency contact phone is required";

    // Files
    if (!profilePhoto) newErrors.profilePhoto = "Profile photo is required";
    if (additionalPhotos.length === 0)
      newErrors.additionalPhotos = "At least one additional photo is required";

    // Terms
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formDataToSend.append(key, value);
        }
      });

      // Append profile photo if it exists
      if (profilePhoto) {
        formDataToSend.append("files", profilePhoto);
      }

      // Append additional photos if they exist
      if (additionalPhotos && additionalPhotos.length > 0) {
        additionalPhotos.forEach((file) => {
          if (file) {
            formDataToSend.append("files", file);
          }
        });
      }

      // Send to backend
      const response = await trigger(formDataToSend);

      if (response?.flutterwavePaymentUrl) {
        window.location.href = response.flutterwavePaymentUrl.data.link;
      }
    } catch (error) {
      toast.error(
        error.message ||
          "There was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Kenics Pageant Registration
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Complete the form below to apply for Kenics Pageant 2025
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200 bg-white p-8 rounded-xl shadow-lg"
        >
          {/* Personal Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Please provide your personal details.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.firstName
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.lastName
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.email
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.phone
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="+1234567890"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none ${
                      errors.dateOfBirth
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="height"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Height (cm) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="height"
                    id="height"
                    value={formData.height}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.height
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="170"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">cm</span>
                  </div>
                  {errors.height && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.height}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="weight"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Weight (kg) <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors.weight
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="65"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm">kg</span>
                  </div>
                  {errors.weight && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.weight}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none bg-white ${
                      errors.category
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="baby">
                      Baby Kenics (0-12 years)(₦10000)
                    </option>
                    <option value="miss">
                      Miss Kenics (18-25 years)(₦40000)
                    </option>
                    <option value="teen">
                      Teen Kenics (13-17 years)(₦20000)
                    </option>
                    <option value="mrs">
                      Mrs. Kenics (Married women)(₦50000)
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Photo Uploads */}
          <div className="pt-8">
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                Photo Uploads
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Upload your photos for the competition.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Photo <span className="text-red-500">*</span>
                </label>
                <div
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-all duration-200 ${
                    errors.profilePhoto
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50 hover:border-pink-400 hover:bg-pink-50"
                  }`}
                >
                  <div className="space-y-1 text-center">
                    {profilePhoto ? (
                      <div className="text-sm text-gray-600">
                        <p>{profilePhoto.name}</p>
                        <button
                          type="button"
                          onClick={() => setProfilePhoto(null)}
                          className="mt-2 text-pink-600 hover:text-pink-500"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="profile-photo"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="profile-photo"
                              name="profile-photo"
                              type="file"
                              className="sr-only"
                              onChange={handleProfilePhotoChange}
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {errors.profilePhoto && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profilePhoto}
                  </p>
                )}
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Photos
                </label>
                <div
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-all duration-200 ${
                    errors.additionalPhotos
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 bg-gray-50 hover:border-pink-400 hover:bg-pink-50"
                  }`}
                >
                  <div className="space-y-1 text-center">
                    {additionalPhotos.length > 0 ? (
                      <div className="space-y-2">
                        {additionalPhotos.map((photo, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600">
                              {photo.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeAdditionalPhoto(index)}
                              className="text-red-600 hover:text-red-500"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {additionalPhotos.length < 5 && (
                          <div className="pt-2">
                            <label
                              htmlFor="additional-photos"
                              className="text-sm text-pink-600 hover:text-pink-500 cursor-pointer"
                            >
                              + Add more photos ({5 - additionalPhotos.length}{" "}
                              remaining)
                            </label>
                            <input
                              id="additional-photos"
                              name="additional-photos"
                              type="file"
                              className="sr-only"
                              onChange={handleAdditionalPhotosChange}
                              accept="image/*"
                              multiple
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="additional-photos"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none"
                          >
                            <span>Upload files</span>
                            <input
                              id="additional-photos"
                              name="additional-photos"
                              type="file"
                              className="sr-only"
                              onChange={handleAdditionalPhotosChange}
                              accept="image/*"
                              multiple
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB each (max 5 photos)
                        </p>
                        {errors.additionalPhotos && (
                          <p className="mt-2 text-sm text-red-600">
                            {errors.additionalPhotos}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio and Experience */}
          <div className="pt-8">
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                Bio & Experience
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Tell us about yourself and your experience.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="bio"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Short Bio (Max 300 characters){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    maxLength={300}
                    value={formData.bio}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none ${
                      errors.bio
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="Tell us about yourself..."
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {formData.bio.length}/300 characters
                    </p>
                  </div>
                  {errors.bio && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="experience"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Modeling/Pageant Experience{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    value={formData.experience}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none ${
                      errors.experience
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="List any previous pageant experience, titles won, or relevant experience"
                  />
                  {errors.experience && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.experience}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="achievements"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Achievements & Awards
                </label>
                <div className="mt-1">
                  <textarea
                    id="achievements"
                    name="achievements"
                    rows={3}
                    value={formData.achievements}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none bg-white hover:border-gray-400 focus:bg-white"
                    placeholder="List any notable achievements or awards"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="pt-8">
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                Social Media
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your social media profiles (optional).
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="socialMedia.instagram"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Instagram
                </label>
                <div className="mt-1 flex rounded-lg shadow-sm overflow-hidden">
                  <span className="inline-flex items-center px-4 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="socialMedia.instagram"
                    id="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm border border-l-0 border-gray-300 bg-white hover:border-gray-400 transition-all duration-200 focus:outline-none"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="socialMedia.facebook"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Facebook
                </label>
                <div className="mt-1 flex rounded-lg shadow-sm overflow-hidden">
                  <span className="inline-flex items-center px-4 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="socialMedia.facebook"
                    id="socialMedia.facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm border border-l-0 border-gray-300 bg-white hover:border-gray-400 transition-all duration-200 focus:outline-none"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="socialMedia.tiktok"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tiktok
                </label>
                <div className="mt-1 flex rounded-lg shadow-sm overflow-hidden">
                  <span className="inline-flex items-center px-4 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="socialMedia.tiktok"
                    id="socialMedia.tiktok"
                    value={formData.socialMedia.tiktok}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm border border-l-0 border-gray-300 bg-white hover:border-gray-400 transition-all duration-200 focus:outline-none"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="socialMedia.twitter"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Twitter
                </label>
                <div className="mt-1 flex rounded-lg shadow-sm overflow-hidden">
                  <span className="inline-flex items-center px-4 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="socialMedia.twitter"
                    id="socialMedia.twitter"
                    value={formData.socialMedia.twitter}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm border border-l-0 border-gray-300 bg-white hover:border-gray-400 transition-all duration-200 focus:outline-none"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="pt-8">
            <div>
              <h2 className="text-xl font-medium text-gray-900">
                Emergency Contact
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Who should we contact in case of emergency?
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="emergencyContact.name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="emergencyContact.name"
                    id="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors["emergencyContact.name"]
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors["emergencyContact.name"] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors["emergencyContact.name"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="emergencyContact.relationship"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Relationship <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="emergencyContact.relationship"
                    id="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors["emergencyContact.relationship"]
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="e.g., Parent, Sibling, Spouse"
                  />
                  {errors["emergencyContact.relationship"] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors["emergencyContact.relationship"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="emergencyContact.phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="emergencyContact.phone"
                    id="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    className={`block w-full pl-12 pr-4 py-3 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                      errors["emergencyContact.phone"]
                        ? "border-red-500 bg-red-50 focus:ring-red-500"
                        : "border-gray-300 bg-white hover:border-gray-400 focus:bg-white"
                    }`}
                    placeholder="+1234567890"
                  />
                  {errors["emergencyContact.phone"] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors["emergencyContact.phone"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="pt-8">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={`focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-300 rounded ${
                    errors.termsAccepted ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="termsAccepted"
                  className="font-medium text-gray-700"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-pink-600 hover:text-pink-500"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-pink-600 hover:text-pink-500"
                  >
                    Privacy Policy
                  </Link>{" "}
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-500">
                  You must agree before submitting.
                </p>
                {errors.termsAccepted && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.termsAccepted}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isMutating}
                className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                  isSubmitting || isMutating
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-10 text-center text-sm text-gray-500">
          <p>
            Have questions?{" "}
            <Link href="/contact" className="text-pink-600 hover:text-pink-500">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
