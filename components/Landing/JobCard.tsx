"use client";

import Link from "next/link";
import { Job } from "@/data/jobsData";
import { MapPin, ArrowRight } from "lucide-react";

type BadgeVariant = "Full-Time" | "Part-Time" | "Contract" | "Remote" | "Internship";

const badgeStyles: Record<BadgeVariant, string> = {
  "Full-Time": "text-[#56CDAD] border-[#56CDAD] bg-[#56CDAD]/10",
  "Part-Time": "text-[#FFB836] border-[#FFB836] bg-[#FFB836]/10",
  "Contract": "text-[#FF6550] border-[#FF6550] bg-[#FF6550]/10",
  "Remote": "text-[#4640DE] border-[#4640DE] bg-[#4640DE]/10",
  "Internship": "text-[#26A4FF] border-[#26A4FF] bg-[#26A4FF]/10",
};

interface JobCardProps {
  job: Job;
  variant?: "grid" | "list";
}

export function JobLogo({ job }: { job: Job }) {
  return (
    <div
      className="w-14 h-14 flex items-center justify-center shrink-0 rounded font-bold text-[18px]"
      style={{ backgroundColor: job.logoBg, color: job.logoColor }}
    >
      {job.logo}
    </div>
  );
}

export default function JobCard({ job, variant = "grid" }: JobCardProps) {
  if (variant === "list") {
    return (
      <Link
        href={`/jobs/${job.id}`}
        className="flex items-center gap-5 py-5 border-b border-[#D6DDEB] first:border-t hover:bg-white hover:px-3 hover:-mx-3 transition-all duration-200 cursor-pointer group"
      >
        <JobLogo job={job} />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[16px] text-[#25324B] mb-1 group-hover:text-[#4640DE] transition-colors truncate">
            {job.title}
          </p>
          <div className="flex items-center flex-wrap gap-2 text-[13px] text-[#7C8493]">
            <span>{job.company}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
            <span className={`px-2.5 py-0.5 border text-[11px] font-bold rounded-full ${badgeStyles[job.type]}`}>
              {job.type}
            </span>
          </div>
        </div>
        <span className="text-[#4640DE] font-bold text-[13px] whitespace-nowrap hover:text-[#3530C4] flex items-center gap-1 shrink-0">
          Apply <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="border border-[#D6DDEB] p-7 flex flex-col gap-4 cursor-pointer hover:border-[#4640DE] hover:shadow-[0_8px_32px_rgba(70,64,222,0.1)] hover:-translate-y-1 transition-all duration-200 bg-white group block"
    >
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 border border-[#D6DDEB] flex items-center justify-center bg-white shrink-0 rounded overflow-hidden font-bold text-[18px]"
          style={{ backgroundColor: job.logoBg, color: job.logoColor }}>
          {job.logo}
        </div>
        <span className={`text-[13px] font-bold px-3 py-1.5 rounded-full border-2 ${badgeStyles[job.type]}`}>
          {job.type}
        </span>
      </div>
      <div>
        <p className="font-clash font-bold text-[18px] text-[#25324B] mb-1 group-hover:text-[#4640DE] transition-colors">
          {job.title}
        </p>
        <p className="text-[15px] text-[#515B6F] flex items-center gap-2">
          {job.company}
          <span className="w-1 h-1 rounded-full bg-[#D6DDEB] inline-block" />
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
        </p>
      </div>
      {job.salary && (
        <p className="text-[14px] font-semibold text-[#4640DE]">{job.salary}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span key={tag} className="px-3 py-1.5 border-2 border-[#D6DDEB] text-[#515B6F] text-[13px] font-semibold rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
