"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type BadgeVariant = "fulltime" | "parttime" | "contract" | "remote";

const badgeStyles: Record<BadgeVariant, string> = {
  fulltime: "text-[#56CDAD] border-[#56CDAD] bg-[#56CDAD]/10",
  parttime: "text-[#FFB836] border-[#FFB836] bg-[#FFB836]/10",
  contract: "text-[#FF6550] border-[#FF6550] bg-[#FF6550]/10",
  remote: "text-[#4640DE] border-[#4640DE] bg-[#4640DE]/10",
};

const badgeLabels: Record<BadgeVariant, string> = {
  fulltime: "Full-Time",
  parttime: "Part-Time",
  contract: "Contract",
  remote: "Remote",
};

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  badge: BadgeVariant;
  tags: string[];
  logo: React.ReactNode;
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    badge: "fulltime",
    tags: ["Marketing", "Design", "Senior"],
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="4" fill="#F8F8FD" stroke="#D6DDEB" />
        <text x="9" y="28" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="#4640DE">N</text>
      </svg>
    ),
  },
  {
    id: "2",
    title: "Brand Designer",
    company: "Reddit",
    location: "New York, USA",
    badge: "remote",
    tags: ["Design", "Junior", "Full-Time"],
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="4" fill="#FF4500" />
        <circle cx="20" cy="18" r="8" fill="white" />
        <circle cx="16" cy="17" r="2" fill="#FF4500" />
        <circle cx="24" cy="17" r="2" fill="#FF4500" />
        <path d="M15 22 Q20 26 25 22" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M26 12 L30 10 L30 14 Z" fill="white" />
        <circle cx="30" cy="10" r="2" fill="white" />
      </svg>
    ),
  },
  {
    id: "3",
    title: "Email Marketing",
    company: "Dropbox",
    location: "San Francisco, USA",
    badge: "fulltime",
    tags: ["Marketing", "Design", "Junior"],
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="4" fill="#0061FF" />
        <path d="M20 10 L28 15 L20 20 L12 15 Z" fill="white" />
        <path d="M12 15 L20 20 L12 25 L4 20 Z M28 15 L36 20 L28 25 L20 20 Z" fill="white" opacity="0.7" />
        <path d="M20 22 L28 27 L20 32 L12 27 Z" fill="white" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: "4",
    title: "Brand Designer",
    company: "Maze",
    location: "Remote, Worldwide",
    badge: "remote",
    tags: ["Design", "Business", "Senior"],
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#F8F8FD" stroke="#D6DDEB" />
        <circle cx="20" cy="20" r="8" stroke="#FF4C60" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="3" fill="#FF4C60" />
      </svg>
    ),
  },
  {
    id: "5",
    title: "Product Designer",
    company: "LinkedIn",
    location: "San Francisco, USA",
    badge: "parttime",
    tags: ["Technology", "Business", "Junior"],
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="6" fill="#0A66C2" />
        <text x="9" y="27" fontFamily="sans-serif" fontWeight="900" fontSize="17" fill="white">in</text>
      </svg>
    ),
  },
  {
    id: "6",
    title: "Brand Designer",
    company: "Figma",
    location: "Remote, Worldwide",
    badge: "remote",
    tags: ["Design", "Engineering", "Senior"],
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="6" fill="#F5F5F5" />
        <rect x="13" y="8" width="8" height="8" rx="4" fill="#F24E1E" />
        <rect x="21" y="8" width="8" height="8" rx="4" fill="#FF7262" />
        <rect x="13" y="16" width="8" height="8" rx="2" fill="#A259FF" />
        <rect x="13" y="24" width="8" height="8" rx="4" fill="#0ACF83" />
        <circle cx="25" cy="20" r="4" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    id: "7",
    title: "Brand Strategist",
    company: "Twitter",
    location: "London, UK",
    badge: "remote",
    tags: ["Marketing", "Sales", "Mid-Level"],
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="6" fill="#1DA1F2" />
        <path d="M30 13A8 8 0 0 1 28 14C27.3 13.2 26.1 13 25 13.5A4 4 0 0 0 23 17V18C19.2 18 16 16 14 13C14 13 10 22 19 26C17 27.3 15 28 13 28C16.5 30 24 30 28 26C31 22.5 32 18 31 14L30 13Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "8",
    title: "Interactive Developer",
    company: "Webflow",
    location: "Remote, Worldwide",
    badge: "fulltime",
    tags: ["Technology", "Engineering", "Junior"],
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="6" fill="#4353FF" />
        <text x="7" y="26" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="white">W</text>
      </svg>
    ),
  },
];

function JobCard({ job, index }: { job: Job; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border border-[#D6DDEB] p-7 flex flex-col gap-4 cursor-pointer hover:border-[#4640DE] hover:shadow-[0_8px_32px_rgba(70,64,222,0.1)] hover:-translate-y-1 transition-all duration-200 bg-white group"
    >
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 border border-[#D6DDEB] flex items-center justify-center bg-white shrink-0 rounded">
          {job.logo}
        </div>
        <span className={`text-[13px] font-bold px-3 py-1.5 rounded-full border-2 ${badgeStyles[job.badge]}`}>
          {badgeLabels[job.badge]}
        </span>
      </div>
      <div>
        <p className="font-bold text-[18px] text-[#25324B] mb-1 group-hover:text-[#4640DE] transition-colors">{job.title}</p>
        <p className="text-[15px] text-[#515B6F] flex items-center gap-2">
          {job.company}
          <span className="w-1 h-1 rounded-full bg-[#D6DDEB] inline-block" />
          {job.location}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span key={tag} className="px-3 py-1.5 border-2 border-[#D6DDEB] text-[#515B6F] text-[13px] font-semibold rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function FeaturedJobsSection() {
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
            Featured <span className="text-[#26A4FF]">Jobs</span>
          </motion.h2>
          <Link href="#" className="flex items-center gap-2 text-[#4640DE] font-semibold text-[15px] hover:gap-3 transition-all duration-200 whitespace-nowrap">
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {jobs.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
