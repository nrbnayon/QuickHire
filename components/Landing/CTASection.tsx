"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-white py-16 sm:py-20 px-5 sm:px-8 lg:px-[124px]">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#4640DE] rounded-xl overflow-hidden flex flex-col lg:flex-row relative"
        >
          {/* Content */}
          <div className="flex-1 p-10 sm:p-14 lg:p-16 flex flex-col gap-6 relative z-10">
            <h2 className="font-clash font-bold text-[36px] sm:text-[42px] lg:text-[48px] leading-[1.1] text-white max-w-[440px]">
              Start posting jobs today
            </h2>
            <p className="text-[16px] sm:text-[18px] text-white/80 leading-relaxed max-w-[360px]">
              Start posting job for free
            </p>
            <Link
              href="/signup"
              className="bg-white text-[#4640DE] font-bold text-[16px] px-8 py-4 w-fit hover:bg-white/90 transition-all duration-200"
            >
              Sign up for free
            </Link>
          </div>

          {/* Large Dashboard Image */}
          <div className="flex-1 relative min-h-[300px] lg:min-h-0">
             {/* Gradient overlay for better text contrast if needed */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#4640DE] via-[#4640DE]/40 to-transparent lg:z-10" />
             
             <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
                <Image
                  src="/images/Dashboard-Company.png"
                  alt="Dashboard Preview"
                  fill
                  className="object-contain object-left-top scale-110 lg:scale-125 translate-x-10 lg:translate-x-20 pt-10"
                />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
