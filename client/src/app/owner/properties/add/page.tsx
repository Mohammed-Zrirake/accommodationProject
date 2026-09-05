"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import { Building2, Upload, Plus, X, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

const PROPERTY_TYPES = ["Hotel", "Appartement", "Villa", "Riad", "Cottage", "Hostel"];
const STANDALONE_TYPES = ["Appartement", "Villa", "Cottage"];

export default function AddPropertyPage() {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState<string>("Hotel");
  const [availableAmenities, setAvailableAmenities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: { street: "", city: "", country: "", postalCode: "" },
    basePricePerNight: "",
    capacity: "",
    starRating: "4",
    numberOfBedrooms: "2",
    numberOfBathrooms: "1",
    floorNumber: "1",
    isDetached: false,
    hasFireplace: false,
  });

  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);

  useEffect(() => {
    api
      .get("/api/amenities")
      .then((res) => setAvailableAmenities(res.data || []))
      .catch((err) => console.warn("Could not load amenities:", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleToggleAmenity = (id: number) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const isStandalone = STANDALONE_TYPES.includes(propertyType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) {
      toast.error("Please upload at least one photo of your property.");
      return;
    }

    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("Name", formData.name);
      data.append("Description", formData.description);
      data.append("Address.Street", formData.address.street);
      data.append("Address.City", formData.address.city);
      data.append("Address.Country", formData.address.country);
      data.append("Address.PostalCode", formData.address.postalCode || "00000");

      if (propertyType === "Hotel") {
        data.append("StarRating", formData.starRating);
      }

      if (isStandalone) {
        data.append("BasePricePerNight", formData.basePricePerNight);
        data.append("Capacity", formData.capacity);
        if (propertyType === "Appartement") {
          data.append("FloorNumber", formData.floorNumber);
          data.append("NumberOfBedrooms", formData.numberOfBedrooms);
          data.append("NumberOfBathrooms", formData.numberOfBathrooms);
        } else if (propertyType === "Villa") {
          data.append("IsDetached", String(formData.isDetached));
          data.append("NumberOfBedrooms", formData.numberOfBedrooms);
          data.append("NumberOfBathrooms", formData.numberOfBathrooms);
        } else if (propertyType === "Cottage") {
          data.append("HasFireplace", String(formData.hasFireplace));
        }
      }

      selectedAmenities.forEach((amenityId) => {
        data.append("AmenityIds", String(amenityId));
      });

      photos.forEach((file) => {
        data.append("Photos", file);
      });

      let endpoint = `/api/${propertyType.toLowerCase()}`;
      const response = await api.post(endpoint, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`${propertyType} created successfully!`);
      const created = response.data;
      const createdId = created.hotelId || created.hostelId || created.riadId || created.id;

      if (["Hotel", "Hostel", "Riad"].includes(propertyType) && createdId) {
        router.push(`/owner/properties/${createdId}/units?type=${propertyType}`);
      } else {
        router.push("/owner/properties");
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.message || "Failed to create property.";
      toast.error(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <Link
          href="/owner/properties"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Properties</span>
        </Link>
        <h1 className="text-3xl font-bold font-serif text-gray-900">List a New Accommodation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Provide your property details, upload photos, and start welcoming travelers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-8">
        {/* Step 1: Type Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Property Category
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPropertyType(type)}
                className={`py-3 px-2 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer ${
                  propertyType === type
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: General Information */}
        <div className="space-y-4 border-t pt-6">
          <h2 className="text-lg font-bold text-gray-900">General Information</h2>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Property Name</label>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Royal Mirage Palace & Spa"
              className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description</label>
            <textarea
              required
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the atmosphere, architecture, highlights, and surroundings..."
              className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Step 3: Location */}
        <div className="space-y-4 border-t pt-6">
          <h2 className="text-lg font-bold text-gray-900">Address & Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Street Address</label>
              <input
                type="text"
                required
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                placeholder="e.g. 12 Rue de la Kasbah"
                className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">City</label>
              <input
                type="text"
                required
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                placeholder="e.g. Marrakech"
                className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Country</label>
              <input
                type="text"
                required
                name="country"
                value={formData.address.country}
                onChange={handleAddressChange}
                placeholder="e.g. Morocco"
                className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.address.postalCode}
                onChange={handleAddressChange}
                placeholder="e.g. 40000"
                className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Standalone Accommodation Specifics */}
        {isStandalone && (
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-lg font-bold text-gray-900">Pricing & Capacity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Base Price / Night (DH)
                </label>
                <input
                  type="number"
                  required
                  name="basePricePerNight"
                  value={formData.basePricePerNight}
                  onChange={handleInputChange}
                  placeholder="e.g. 800"
                  className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Max Guest Capacity
                </label>
                <input
                  type="number"
                  required
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="e.g. 4"
                  className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {propertyType === "Hotel" && (
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-lg font-bold text-gray-900">Hotel Details</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Star Rating (1-5)</label>
              <select
                name="starRating"
                value={formData.starRating}
                onChange={handleInputChange}
                className="w-full text-sm border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                {[5, 4, 3, 2, 1].map((s) => (
                  <option key={s} value={s}>
                    {s} Stars
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 5: Photos Upload */}
        <div className="space-y-4 border-t pt-6">
          <h2 className="text-lg font-bold text-gray-900">Property Photos</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer relative bg-gray-50">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">Click or drag images to upload</p>
            <p className="text-xs text-gray-500 mt-1">High-quality PNG, JPG, or WEBP photos</p>
          </div>

          {photos.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {photos.map((file, index) => (
                <div key={index} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step 6: Amenities Selection */}
        {availableAmenities.length > 0 && (
          <div className="space-y-4 border-t pt-6">
            <h2 className="text-lg font-bold text-gray-900">Select Available Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {availableAmenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity.amenityId);
                return (
                  <button
                    key={amenity.amenityId}
                    type="button"
                    onClick={() => handleToggleAmenity(amenity.amenityId)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{amenity.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="border-t pt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Publishing Listing..." : "Publish Accommodation"}
          </button>
        </div>
      </form>
    </div>
  );
}
