"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "design",
    name: "Design",
    jobs: 235,
    icon: (active: boolean) => (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="18" cy="18" r="8" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <circle cx="32" cy="28" r="6" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <path d="M24 12 L36 8 L40 24 L28 28" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 32 L16 24 L20 32" stroke={active ? "white" : "#4640DE"} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "sales",
    name: "Sales",
    jobs: 756,
    icon: (active: boolean) => (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="7" y="28" width="7" height="14" rx="1" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <rect x="18" y="20" width="7" height="22" rx="1" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <rect x="29" y="13" width="7" height="29" rx="1" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <path d="M10 24 L21 17 L32 10" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="10" r="2.5" fill={active ? "white" : "#4640DE"} />
      </svg>
    ),
  },
  {
    id: "marketing",
    name: "Marketing",
    jobs: 140,
    icon: (active: boolean) => (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M10 24 C10 16 16 10 24 10 L24 38 C16 38 10 32 10 24Z" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <path d="M24 10 L38 15 L38 33 L24 38" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="36" cy="14" r="4" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <circle cx="36" cy="34" r="4" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: "finance",
    name: "Finance",
    jobs: 325,
    icon: (active: boolean) => (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="28" rx="2" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <path d="M15 20 L33 20" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15 26 L24 26" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="33" cy="30" r="5" fill={active ? "rgba(255,255,255,0.15)" : "white"} stroke={active ? "white" : "#4640DE"} strokeWidth="1.5" />
        <path d="M33 27 L33 33 M31 29.5 L35 29.5" stroke={active ? "white" : "#4640DE"} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "technology",
    name: "Technology",
    jobs: 436,
    icon: (active: boolean) => (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="10" width="40" height="28" rx="2" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <path d="M16 20 L12 24 L16 28" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 20 L36 24 L32 28" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 16 L21 32" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "engineering",
    name: "Engineering",
    jobs: 542,
    icon: (active: boolean) => (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 8 L8 18 L8 40 L40 40 L40 18 Z" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="18" y="28" width="12" height="12" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <path d="M20 16 L28 16 M20 20 L25 20" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "business",
    name: "Business",
    jobs: 211,
    icon: (active: boolean) => (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="20" width="32" height="22" rx="1" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <path d="M16 20 L16 16 C16 11.6 19.6 8 24 8 C28.4 8 32 11.6 32 16 L32 20" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <circle cx="24" cy="30" r="2.5" fill={active ? "white" : "#4640DE"} />
      </svg>
    ),
  },
  {
    id: "hr",
    name: "Human Resource",
    jobs: 346,
    icon: (active: boolean) => (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="16" cy="17" r="5" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <circle cx="32" cy="17" r="5" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" />
        <path d="M6 38 C6 31 10.5 27 16 27" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M42 38 C42 31 37.5 27 32 27" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 38 C16 31 19.6 27 24 27 C28.4 27 32 31 32 38" stroke={active ? "white" : "#4640DE"} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function CategoriesSection() {
  const [activeId, setActiveId] = useState("marketing");

  const row1 = categories.slice(0, 4);
  const row2 = categories.slice(4, 8);

  return (
    <section className="bg-white py-16 sm:py-20 px-5 sm:px-8 lg:px-[124px]">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight text-[#25324B]"
          >
            Explore by <span className="text-[#26A4FF]">category</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="#" className="flex items-center gap-2 text-[#4640DE] font-semibold text-[15px] hover:gap-3 transition-all duration-200 whitespace-nowrap">
              Show all jobs <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {[row1, row2].map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {row.map((cat, i) => {
                const isActive = cat.id === activeId;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (rowIdx * 4 + i) * 0.07 }}
                    onClick={() => setActiveId(cat.id)}
                    className={`border p-6 sm:p-8 flex flex-col gap-6 cursor-pointer transition-all duration-200 group ${
                      isActive
                        ? "bg-[#4640DE] border-[#4640DE] shadow-[0_8px_32px_rgba(70,64,222,0.25)]"
                        : "bg-white border-[#D6DDEB] hover:border-[#4640DE] hover:shadow-[0_8px_32px_rgba(70,64,222,0.1)] hover:-translate-y-1"
                    }`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      {cat.icon(isActive)}
                    </div>
                    <div>
                      <p className={`font-bold text-[18px] sm:text-[22px] leading-snug mb-2 ${isActive ? "text-white" : "text-[#25324B]"}`}>
                        {cat.name}
                      </p>
                      <div className={`flex items-center gap-2 text-[15px] ${isActive ? "text-white/80" : "text-[#7C8493]"}`}>
                        <span>{cat.jobs} jobs available</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
