"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JobCard from "./JobCard";
import { jobsData } from "@/data/jobsData";

const latestJobs = jobsData.slice(0, 8);

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
            className="font-clash font-semibold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] text-[#25324B]"
          >
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </motion.h2>
          <Link href="/jobs" className="flex items-center gap-2 text-[#4640DE] font-semibold text-[15px] hover:gap-3 transition-all duration-200 whitespace-nowrap">
            Show all jobs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Two-column list layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
          {[col1, col2].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col bg-white border border-[#D6DDEB] px-6">
              {col.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: colIdx === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.09 }}
                >
                  <JobCard job={job} variant="list" />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
