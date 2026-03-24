"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-[#F8F8FD] py-16 sm:py-20 px-5 sm:px-8 lg:px-[124px]">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-[#D6DDEB] overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Job Seekers */}
          <div className="flex-1 bg-white p-10 sm:p-14 lg:p-16 flex flex-col gap-6 lg:border-r border-b lg:border-b-0 border-[#D6DDEB]">
            <span className="inline-flex items-center justify-center px-4 py-1 border-2 border-[#4640DE] text-[#4640DE] font-bold text-[13px] w-fit">
              For Job Seekers
            </span>
            <h3 className="font-bold text-[28px] sm:text-[34px] lg:text-[38px] leading-tight text-[#25324B]">
              Search, Apply &<br />Get Your Dream Jobs.
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#515B6F] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Volutpat commodo proin libero pharetra.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 border-2 border-[#4640DE] text-[#4640DE] font-bold text-[15px] px-6 py-3.5 w-fit hover:bg-[#4640DE] hover:text-white transition-all duration-200 group"
            >
              Search Jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Employers */}
          <div className="flex-1 bg-[#25324B] p-10 sm:p-14 lg:p-16 flex flex-col gap-6 relative overflow-hidden">
            {/* Decorative dashboard image */}
            <div className="absolute right-0 top-0 w-[55%] h-full opacity-15 pointer-events-none">
              <Image
                src="/images/Dashboard-Company.png"
                alt="Dashboard"
                fill
                className="object-cover object-left"
              />
            </div>
            <span className="inline-flex items-center justify-center px-4 py-1 border-2 border-[#26A4FF] text-[#26A4FF] font-bold text-[13px] w-fit relative z-10">
              For Employers
            </span>
            <h3 className="font-bold text-[28px] sm:text-[34px] lg:text-[38px] leading-tight text-white relative z-10">
              Start Posting<br />Jobs Today.
            </h3>
            <p className="text-[15px] sm:text-[16px] text-white/70 leading-relaxed relative z-10">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Volutpat commodo proin libero pharetra.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-[#26A4FF] text-white font-bold text-[15px] px-6 py-3.5 w-fit hover:bg-[#1a8ee0] transition-colors duration-200 group relative z-10"
            >
              Post a Job
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
