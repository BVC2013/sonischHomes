"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import ListingCard from "./ListingCard";
import ListingModal from "./ListingModal";
import { MLSListing, ListingCategory } from "../types/listings";

interface Tab {
  id: ListingCategory;
  label: string;
  description: string;
  icon: React.ReactNode;
  queryParams: Record<string, string>;
}

const tabs: Tab[] = [
  {
    id: "residential",
    label: "For Sale",
    description: "Homes currently listed for sale",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    queryParams: { type: "residential" },
  },
  {
    id: "rental",
    label: "Rentals",
    description: "Properties available for rent",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    queryParams: { type: "rental" },
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "Premium properties over $1M",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    queryParams: { type: "luxury" },
  },
  {
    id: "commercial",
    label: "Commercial",
    description: "Business and investment properties",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    queryParams: { type: "commercial" },
  },
  {
    id: "land",
    label: "Land",
    description: "Vacant lots and land parcels",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    queryParams: { type: "land" },
  },
];

export default function MLSListings() {
  const [activeTab, setActiveTab] = useState<ListingCategory>("residential");
  const [listings, setListings] = useState<MLSListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<MLSListing | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const currentTab = useMemo(
    () => tabs.find((t) => t.id === activeTab)!,
    [activeTab]
  );

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams(currentTab.queryParams);
    params.set("limit", "12");
    if (searchQuery) params.set("q", searchQuery);

    try {
      const res = await fetch(`/api/listings?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load listings");
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to load listings. Please try again.");
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [currentTab, searchQuery]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleTabChange = (tab: ListingCategory) => {
    setActiveTab(tab);
    setSearchQuery("");
    setSearchInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Sonisch Homes
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-8">
              Find your perfect property with live MLS data. Browse thousands of
              listings updated in real time.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="flex rounded-2xl overflow-hidden shadow-2xl">
                <input
                  type="text"
                  placeholder="Search by city, neighborhood, zip code..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1 px-5 py-4 text-gray-900 text-base focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-white px-6 py-4 font-semibold transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-none gap-1 pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-blue-700 shadow-lg"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentTab.label}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {currentTab.description}
              {searchQuery && (
                <span className="ml-2 text-blue-600">
                  · Searching &quot;{searchQuery}&quot;
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchInput("");
                    }}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </span>
              )}
            </p>
          </div>
          {!loading && listings.length > 0 && (
            <p className="text-sm text-gray-500">
              {listings.length} listing{listings.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-red-50 rounded-2xl p-8 max-w-md">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Unable to Load Listings
              </h3>
              <p className="text-gray-500 text-sm mb-4">{error}</p>
              <button
                onClick={fetchListings}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && listings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-blue-50 rounded-2xl p-8 max-w-md">
              <svg className="w-12 h-12 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Listings Found
              </h3>
              <p className="text-gray-500 text-sm">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search.`
                  : "No active listings in this category right now."}
              </p>
            </div>
          </div>
        )}

        {/* Listings grid */}
        {!loading && !error && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.mlsId}
                listing={listing}
                onSelect={setSelectedListing}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-400">
          <p>
            Listing data provided via MLS integration &bull; Data refreshed every 5 minutes
          </p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} Sonisch Homes. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Listing detail modal */}
      {selectedListing && (
        <ListingModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}
