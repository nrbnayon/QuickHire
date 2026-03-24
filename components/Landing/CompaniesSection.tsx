"use client";

import { motion } from "framer-motion";

const companies = [
  {
    name: "Vodafone",
    svg: (
      <svg viewBox="0 0 120 40" className="h-8 w-auto" fill="none">
        <circle cx="20" cy="20" r="14" fill="#E60000" />
        <path d="M14 16 Q20 26 26 16" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
        <text x="38" y="26" fontFamily="sans-serif" fontWeight="700" fontSize="16" fill="#25324B">vodafone</text>
      </svg>
    ),
  },
  {
    name: "Intel",
    svg: (
      <svg viewBox="0 0 80 40" className="h-8 w-auto" fill="none">
        <text x="4" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="20" fill="#0071C5">intel.</text>
      </svg>
    ),
  },
  {
    name: "Tesla",
    svg: (
      <svg viewBox="0 0 100 40" className="h-8 w-auto" fill="none">
        <text x="4" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="18" letterSpacing="6" fill="#CC0000">TESLA</text>
      </svg>
    ),
  },
  {
    name: "AMD",
    svg: (
      <svg viewBox="0 0 70 40" className="h-8 w-auto" fill="none">
        <text x="4" y="28" fontFamily="sans-serif" fontWeight="900" fontSize="20" fill="#ED1C24">AMD</text>
      </svg>
    ),
  },
  {
    name: "Talkit",
    svg: (
      <svg viewBox="0 0 90 40" className="h-8 w-auto" fill="none">
        <text x="4" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="20" fill="#25324B">Talkit</text>
      </svg>
    ),
  },
];

export default function CompaniesSection() {
  return (
    <section className="bg-white py-12 px-5 sm:px-8 lg:px-[124px]">
      <div className="max-w-[1240px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[17px] text-[#202430]/50 mb-8"
        >
          Companies we helped grow
        </motion.p>
        <div className="flex flex-wrap items-center justify-between gap-8 sm:gap-12">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="opacity-30 hover:opacity-80 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
            >
              {company.svg}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
