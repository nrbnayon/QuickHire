"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-end">
        <Image
          src="/images/Hero-bg-pattern.svg"
          alt="Background pattern"
          width={650}
          height={700}
          className="hidden lg:block h-full w-auto object-cover object-left opacity-90"
          style={{ width: "auto" }}
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-[62px] xl:px-0 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6 max-w-[600px]">
          <FadeUp delay={0.1}>
            <h1 className="font-clash font-bold text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.1] text-[#25324B] tracking-tight">
              Discover<br />more than<br />
              <span className="text-[#26A4FF] relative inline-block pb-4">
                5000+ Jobs
                <span className="absolute top-[80%] left-0 w-full mt-1">
                  <Image
                    src="/images/hero-wave.svg"
                    alt=""
                    width={380}
                    height={20}
                    className="w-full h-auto"
                    style={{ height: "auto" }}
                  />
                </span>
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
                <Link
                  href="/jobs"
                  className="bg-[#4640DE] text-white font-bold text-[16px] px-8 py-5 hover:bg-[#3530C4] transition-colors duration-200 whitespace-nowrap shrink-0 w-full sm:w-auto text-center"
                >
                  Search my job
                </Link>
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
