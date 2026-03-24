"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { jobsData, categories, jobTypes, Job, JobCategory, JobType } from "@/data/jobsData";
import JobCard from "@/components/Landing/JobCard";

function CategorySidebar({
  selectedCategories,
  toggleCategory,
  selectedTypes,
  toggleType,
}: {
  selectedCategories: JobCategory[];
  toggleCategory: (c: JobCategory) => void;
  selectedTypes: JobType[];
  toggleType: (t: JobType) => void;
}) {
  const [catOpen, setCatOpen] = useState(true);
  const [typeOpen, setTypeOpen] = useState(true);

  const categoryCount = (cat: JobCategory) =>
    jobsData.filter((j) => j.category === cat).length;
  const typeCount = (type: JobType) =>
    jobsData.filter((j) => j.type === type).length;

  return (
    <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
      {/* Category Filter */}
      <div className="bg-white border border-[#D6DDEB] p-6">
        <button
          className="flex items-center justify-between w-full mb-4"
          onClick={() => setCatOpen(!catOpen)}
        >
          <h3 className="font-bold text-[18px] text-[#25324B]">Type of Employment</h3>
          {catOpen ? <ChevronUp className="w-5 h-5 text-[#7C8493]" /> : <ChevronDown className="w-5 h-5 text-[#7C8493]" />}
        </button>
        {catOpen && (
          <div className="flex flex-col gap-3">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="w-4 h-4 accent-[#4640DE] rounded cursor-pointer"
                />
                <span className="flex-1 text-[15px] text-[#515B6F] group-hover:text-[#25324B] transition-colors">
                  {type}
                </span>
                <span className="text-[13px] text-[#7C8493] font-medium">
                  ({typeCount(type)})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="bg-white border border-[#D6DDEB] p-6">
        <button
          className="flex items-center justify-between w-full mb-4"
          onClick={() => setCatOpen(!catOpen)}
        >
          <h3 className="font-bold text-[18px] text-[#25324B]">Category</h3>
          {catOpen ? <ChevronUp className="w-5 h-5 text-[#7C8493]" /> : <ChevronDown className="w-5 h-5 text-[#7C8493]" />}
        </button>
        {catOpen && (
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 accent-[#4640DE] rounded cursor-pointer"
                />
                <span className="flex-1 text-[15px] text-[#515B6F] group-hover:text-[#25324B] transition-colors">
                  {cat}
                </span>
                <span className="text-[13px] text-[#7C8493] font-medium">
                  ({categoryCount(cat)})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default function JobsPageView() {
  const [query, setQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<JobCategory[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<JobType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleCategory = (cat: JobCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleType = (type: JobType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setQuery("");
    setLocationQuery("");
  };

  const filtered = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase());

      const matchesLocation =
        !locationQuery ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(job.type);

      return matchesQuery && matchesLocation && matchesCategory && matchesType;
    });
  }, [query, locationQuery, selectedCategories, selectedTypes]);

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedTypes.length > 0 ||
    query ||
    locationQuery;

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      {/* Header Search Bar */}
      <div className="bg-white border-b border-[#D6DDEB]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-0 py-8">
          <h1 className="font-bold text-[28px] sm:text-[36px] text-[#25324B] mb-2">
            Find your <span className="text-[#26A4FF]">dream job</span>
          </h1>
          <p className="text-[#515B6F] mb-6 text-[16px]">
            {filtered.length.toLocaleString()} jobs available
          </p>

          {/* Search Bar */}
          <div className="bg-white shadow-[0_4px_24px_rgba(192,192,192,0.15)] border border-[#D6DDEB] flex flex-col sm:flex-row items-stretch">
            <div className="flex items-center gap-3 px-5 py-4 flex-1">
              <Search className="w-5 h-5 text-[#7C8493] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, keyword, or company"
                className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/70"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-[#7C8493] hover:text-[#25324B]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="hidden sm:block w-px bg-[#D6DDEB] my-3" />

            <div className="flex items-center gap-3 px-5 py-4 sm:min-w-[220px]">
              <MapPin className="w-5 h-5 text-[#515B6F] shrink-0" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location"
                className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/70"
              />
              {locationQuery && (
                <button onClick={() => setLocationQuery("")} className="text-[#7C8493] hover:text-[#25324B]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => {}}
              className="bg-[#4640DE] text-white font-bold text-[15px] px-8 py-4 hover:bg-[#3530C4] transition-colors whitespace-nowrap cursor-pointer"
            >
              Search Jobs
            </button>
          </div>

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-[13px] text-[#7C8493]">Active filters:</span>
              {selectedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-1 px-3 py-1 bg-[#4640DE]/10 text-[#4640DE] text-[12px] font-semibold rounded-full hover:bg-[#4640DE]/20 transition-colors"
                >
                  {cat} <X className="w-3 h-3" />
                </button>
              ))}
              {selectedTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className="flex items-center gap-1 px-3 py-1 bg-[#56CDAD]/10 text-[#56CDAD] text-[12px] font-semibold rounded-full hover:bg-[#56CDAD]/20 transition-colors"
                >
                  {type} <X className="w-3 h-3" />
                </button>
              ))}
              <button
                onClick={clearFilters}
                className="text-[12px] text-[#FF6550] hover:underline font-semibold"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-0 py-8">
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#D6DDEB] bg-white text-[#25324B] font-semibold text-[14px] hover:border-[#4640DE] transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters {hasFilters && `(${selectedCategories.length + selectedTypes.length})`}
          </button>
          {/* View toggle */}
          <div className="flex gap-2">
            {(["grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2.5 text-[13px] font-semibold border transition-colors ${
                  viewMode === mode
                    ? "bg-[#4640DE] text-white border-[#4640DE]"
                    : "bg-white text-[#515B6F] border-[#D6DDEB] hover:border-[#4640DE]"
                }`}
              >
                {mode === "grid" ? "⊞ Grid" : "☰ List"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar - desktop always visible, mobile conditional */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <CategorySidebar
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              selectedTypes={selectedTypes}
              toggleType={toggleType}
            />
          </div>

          {/* Jobs Grid */}
          <div className="flex-1 min-w-0">
            {/* Desktop view toggle */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-[15px] text-[#515B6F]">
                Showing <span className="font-semibold text-[#25324B]">{filtered.length}</span> results
              </p>
              <div className="flex gap-2">
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 text-[13px] font-semibold border transition-colors ${
                      viewMode === mode
                        ? "bg-[#4640DE] text-white border-[#4640DE]"
                        : "bg-white text-[#515B6F] border-[#D6DDEB] hover:border-[#4640DE]"
                    }`}
                  >
                    {mode === "grid" ? "⊞ Grid" : "☰ List"}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-[#D6DDEB] p-16 text-center"
              >
                <div className="w-16 h-16 bg-[#4640DE]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#4640DE]" />
                </div>
                <h3 className="font-bold text-[20px] text-[#25324B] mb-2">No jobs found</h3>
                <p className="text-[#515B6F]">Try adjusting your search or filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2.5 bg-[#4640DE] text-white font-semibold text-[14px] hover:bg-[#3530C4] transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filtered.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <JobCard job={job} variant="grid" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#D6DDEB] px-6">
                {filtered.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <JobCard job={job} variant="list" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
