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
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Append files
      formDataToSend.append("profilePhoto", profilePhoto);
      additionalPhotos.forEach((file, index) => {
        formDataToSend.append(`additionalPhotos`, file);
      });

      //send to backend
      console.log(formData);
      // const response = await trigger(formDataToSend);

      // console.log(response);

      // window.open(paylinkUrl, "_blank");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
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
          className="space-y-8 divide-y divide-gray-200 bg-white p-6 rounded-lg shadow-md"
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
                  className="block text-sm font-medium text-gray-700"
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
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
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
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.dateOfBirth ? "border-red-500" : ""
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700"
                >
                  Height (cm)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="height"
                    id="height"
                    value={formData.height}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.height ? "border-red-500" : ""
                    }`}
                  />
                  {errors.height && (
                    <p className="mt-1 text-sm text-red-600">{errors.height}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight (kg)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.weight ? "border-red-500" : ""
                    }`}
                  />
                  {errors.weight && (
                    <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.category ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select a category</option>
                    <option value="miss">Miss Kenics (18-25 years)</option>
                    <option value="teen">Teen Kenics (13-17 years)</option>
                    <option value="mrs">Mrs. Kenics (Married women)</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
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
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                    errors.profilePhoto ? "border-red-500" : ""
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
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                    errors.additionalPhotos
                      ? "border-red-500"
                      : "border-gray-300"
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Short Bio (Max 300 characters)
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    maxLength={300}
                    value={formData.bio}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border ${
                      errors.bio ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.bio.length}/300 characters
                  </p>
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modeling/Pageant Experience
                </label>
                <div className="mt-1">
                  <textarea
                    id="experience"
                    name="experience"
                    rows={3}
                    value={formData.experience}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border ${
                      errors.experience ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    placeholder="List any previous pageant experience, titles won, or relevant experience"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="achievements"
                  className="block text-sm font-medium text-gray-700"
                >
                  Achievements & Awards
                </label>
                <div className="mt-1">
                  <textarea
                    id="achievements"
                    name="achievements"
                    rows={2}
                    value={formData.achievements}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border border-gray-300 rounded-md"
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Instagram
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="socialMedia.instagram"
                    id="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="socialMedia.facebook"
                  className="block text-sm font-medium text-gray-700"
                >
                  Facebook
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="socialMedia.facebook"
                    id="socialMedia.facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="socialMedia.tiktok"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tiktok
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="socialMedia.tiktok"
                    id="socialMedia.tiktok"
                    value={formData.socialMedia.tiktok}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="socialMedia.twitter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Twitter
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    name="socialMedia.twitter"
                    id="socialMedia.twitter"
                    value={formData.socialMedia.twitter}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-pink-500 focus:border-pink-500 sm:text-sm border-gray-300"
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="emergencyContact.name"
                    id="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border ${
                      errors["emergencyContact.name"]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors["emergencyContact.name"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors["emergencyContact.name"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="emergencyContact.relationship"
                  className="block text-sm font-medium text-gray-700"
                >
                  Relationship
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="emergencyContact.relationship"
                    id="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border ${
                      errors["emergencyContact.relationship"]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                    placeholder="e.g., Parent, Sibling, Spouse"
                  />
                  {errors["emergencyContact.relationship"] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors["emergencyContact.relationship"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="emergencyContact.phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="emergencyContact.phone"
                    id="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-pink-500 focus:border-pink-500 block w-full sm:text-sm border ${
                      errors["emergencyContact.phone"]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                  />
                  {errors["emergencyContact.phone"] && (
                    <p className="mt-1 text-sm text-red-600">
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
