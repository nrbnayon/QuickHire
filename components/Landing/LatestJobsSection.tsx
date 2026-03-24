"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type BadgeVariant = "fulltime" | "parttime" | "contract" | "remote";

const badgeStyles: Record<BadgeVariant, string> = {
  fulltime: "text-[#56CDAD] border-[#56CDAD]",
  parttime: "text-[#FFB836] border-[#FFB836]",
  contract: "text-[#FF6550] border-[#FF6550]",
  remote: "text-[#4640DE] border-[#4640DE]",
};
const badgeLabels: Record<BadgeVariant, string> = {
  fulltime: "Full-Time",
  parttime: "Part-Time",
  contract: "Contract",
  remote: "Remote",
};

interface LatestJob {
  id: string;
  title: string;
  company: string;
  location: string;
  badge: BadgeVariant;
  logo: React.ReactNode;
}

const latestJobs: LatestJob[] = [
  {
    id: "1",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    badge: "remote",
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="4" fill="#F8F8FD" stroke="#D6DDEB" />
        <text x="8" y="26" fontFamily="sans-serif" fontWeight="900" fontSize="20" fill="#4640DE">N</text>
      </svg>
    ),
  },
  {
    id: "2",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    badge: "fulltime",
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="4" fill="#0061FF" />
        <path d="M18 8 L25 13 L18 18 L11 13 Z" fill="white" />
        <path d="M11 13 L18 18 L11 23 L4 18 Z M25 13 L32 18 L25 23 L18 18 Z" fill="white" opacity="0.7" />
        <path d="M18 20 L25 25 L18 30 L11 25 Z" fill="white" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: "3",
    title: "Interactive Developer",
    company: "Maze",
    location: "Remote, Worldwide",
    badge: "parttime",
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="6" fill="#F8F8FD" stroke="#D6DDEB" />
        <circle cx="18" cy="18" r="7" stroke="#FF4C60" strokeWidth="2" />
        <circle cx="18" cy="18" r="2.5" fill="#FF4C60" />
      </svg>
    ),
  },
  {
    id: "4",
    title: "HR Manager",
    company: "Notion",
    location: "New York, USA",
    badge: "fulltime",
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="6" fill="#F8F8FD" stroke="#D6DDEB" />
        <text x="9" y="25" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="#25324B">N</text>
      </svg>
    ),
  },
  {
    id: "5",
    title: "Social Media Assistant",
    company: "Twitter",
    location: "London, UK",
    badge: "remote",
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="6" fill="#1DA1F2" />
        <path d="M27 11A7 7 0 0 1 25.4 12C24.8 11.4 23.8 11.2 23 11.6A3.5 3.5 0 0 0 21.3 15V16C17.7 16 14.7 14.2 12.7 11C12.7 11 9.3 19 17 23C15.3 24.1 13.5 24.5 11.5 24.5C14.5 26 21 26 24.5 23C27 20.5 28 17 27 13L27 11Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "6",
    title: "Brand Designer",
    company: "Webflow",
    location: "Remote, Worldwide",
    badge: "fulltime",
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="6" fill="#4353FF" />
        <text x="6" y="24" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="white">W</text>
      </svg>
    ),
  },
  {
    id: "7",
    title: "Interactive Developer",
    company: "InVision",
    location: "Remote, Worldwide",
    badge: "contract",
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="6" fill="#FF3366" />
        <circle cx="18" cy="14" r="2" fill="white" />
        <rect x="16" y="18" width="4" height="10" rx="2" fill="white" />
      </svg>
    ),
  },
  {
    id: "8",
    title: "HR Manager",
    company: "Focused",
    location: "New York, USA",
    badge: "fulltime",
    logo: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="6" fill="#6C63FF" />
        <text x="9" y="25" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="white">Fo</text>
      </svg>
    ),
  },
];

export default function LatestJobsSection() {
  const col1 = latestJobs.slice(0, 4);
  const col2 = latestJobs.slice(4, 8);

  return (
    <section className="bg-[#F8F8FD] py-16 sm:py-20 px-5 sm:px-8 lg:px-[124px]">
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
            Latest <span className="text-[#26A4FF]">Jobs Open</span>
          </motion.h2>
          <Link href="#" className="flex items-center gap-2 text-[#4640DE] font-semibold text-[15px] hover:gap-3 transition-all duration-200 whitespace-nowrap">
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
          {[col1, col2].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              {col.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: colIdx === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.09 }}
                  className="flex items-center gap-5 py-5 border-b border-[#D6DDEB] first:border-t hover:bg-white hover:px-3 hover:-mx-3 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-14 h-14 border border-[#D6DDEB] flex items-center justify-center bg-white shrink-0">
                    {job.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[16px] text-[#25324B] mb-1 group-hover:text-[#4640DE] transition-colors truncate">
                      {job.title}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 text-[13px] text-[#7C8493]">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span className={`px-2.5 py-0.5 border text-[11px] font-bold rounded-full ${badgeStyles[job.badge]}`}>
                        {badgeLabels[job.badge]}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="text-[#4640DE] font-bold text-[13px] whitespace-nowrap hover:text-[#3530C4] flex items-center gap-1 shrink-0"
                  >
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
