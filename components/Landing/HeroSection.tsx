"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Search, ChevronDown } from "lucide-react";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[700px] bg-[#F8F8FD] overflow-hidden flex items-center">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute right-0 top-0 h-full w-[55%] opacity-40" viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="120" y="60" width="340" height="340" stroke="#CCCCF5" strokeWidth="1.5" transform="rotate(8 290 230)" />
          <rect x="190" y="120" width="250" height="250" stroke="#CCCCF5" strokeWidth="1.5" transform="rotate(8 315 245)" />
          <rect x="250" y="170" width="180" height="180" stroke="#CCCCF5" strokeWidth="1.5" transform="rotate(8 340 260)" />
          <rect x="60" y="260" width="440" height="440" stroke="#CCCCF5" strokeWidth="0.8" transform="rotate(8 280 480)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-[62px] xl:px-0 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6 max-w-[600px]">
          <FadeUp delay={0.1}>
            <h1 className="font-bold text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.08] text-[#25324B] tracking-tight">
              Discover<br />more than<br />
              <span className="text-[#26A4FF] relative inline-block">
                5000+ Jobs
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 380 14" fill="none">
                  <path d="M2 10 C70 2,160 14,280 6 S355 2,378 8" stroke="#26A4FF" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.22}>
            <p className="text-[17px] sm:text-[20px] text-[#515B6F] leading-relaxed max-w-[460px]">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>
          </FadeUp>

          {/* Search Bar */}
          <FadeUp delay={0.34}>
            <div className="flex flex-col gap-4">
              <div className="bg-white shadow-[0_20px_60px_rgba(192,192,192,0.18)] flex flex-col sm:flex-row items-stretch w-full max-w-[820px]">
                {/* Job Title Field */}
                <div className="flex items-center gap-3 px-5 py-4 sm:py-0 flex-1 min-w-0">
                  <Search className="w-5 h-5 text-[#7C8493] shrink-0" />
                  <div className="flex-1 flex flex-col justify-center py-4 min-w-0">
                    <input
                      type="text"
                      placeholder="Job title or keyword"
                      className="bg-transparent border-none outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/70 w-full"
                    />
                    <div className="h-px bg-[#D6DDEB] mt-2 hidden sm:block" />
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px bg-[#D6DDEB] my-4" />

                {/* Location Field */}
                <div className="flex items-center gap-3 px-5 py-4 sm:py-0 sm:min-w-[200px]">
                  <MapPin className="w-5 h-5 text-[#515B6F] shrink-0" />
                  <div className="flex-1 flex flex-col justify-center py-4 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[15px] text-[#25324B]">Florence, Italy</span>
                      <ChevronDown className="w-4 h-4 text-[#515B6F] shrink-0" />
                    </div>
                    <div className="h-px bg-[#D6DDEB] mt-2 hidden sm:block" />
                  </div>
                </div>

                {/* Search Button */}
                <button className="bg-[#4640DE] text-white font-bold text-[16px] px-8 py-5 hover:bg-[#3530C4] transition-colors duration-200 whitespace-nowrap shrink-0 w-full sm:w-auto cursor-pointer">
                  Search my job
                </button>
              </div>

              <p className="text-[15px] text-[#202430]/70">
                Popular :{" "}
                <span className="font-semibold text-[#202430]">UI Designer, UX Researcher, Android, Admin</span>
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:flex flex-1 justify-center items-end self-stretch relative min-h-[500px]"
        >
          <Image
            src="/images/hero.png"
            alt="Job seeker"
            fill
            sizes="(max-width: 1200px) 50vw, 520px"
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
