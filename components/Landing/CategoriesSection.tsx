import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  PenTool, 
  BarChart3, 
  Megaphone, 
  CreditCard, 
  Code2, 
  Wrench, 
  Briefcase, 
  Users2 
} from "lucide-react";

const categories = [
  {
    id: "design",
    name: "Design",
    jobs: 235,
    icon: (active: boolean) => <PenTool className={`w-8 h-8 ${active ? "text-white" : "text-[#4640DE]"}`} />,
  },
  {
    id: "sales",
    name: "Sales",
    jobs: 756,
    icon: (active: boolean) => <BarChart3 className={`w-8 h-8 ${active ? "text-white" : "text-[#4640DE]"}`} />,
  },
  {
    id: "marketing",
    name: "Marketing",
    jobs: 140,
    icon: (active: boolean) => <Megaphone className={`w-8 h-8 ${active ? "text-white" : "text-[#4640DE]"}`} />,
  },
  {
    id: "finance",
    name: "Finance",
    jobs: 325,
    icon: (active: boolean) => <CreditCard className={`w-8 h-8 ${active ? "text-white" : "text-[#4640DE]"}`} />,
  },
  {
    id: "technology",
    name: "Technology",
    jobs: 436,
    icon: (active: boolean) => <Code2 className={`w-8 h-8 ${active ? "text-white" : "text-[#4640DE]"}`} />,
  },
  {
    id: "engineering",
    name: "Engineering",
    jobs: 542,
    icon: (active: boolean) => <Wrench className={`w-8 h-8 ${active ? "text-white" : "text-[#4640DE]"}`} />,
  },
  {
    id: "business",
    name: "Business",
    jobs: 211,
    icon: (active: boolean) => <Briefcase className={`w-8 h-8 ${active ? "text-white" : "text-[#4640DE]"}`} />,
  },
  {
    id: "hr",
    name: "Human Resource",
    jobs: 346,
    icon: (active: boolean) => <Users2 className={`w-8 h-8 ${active ? "text-white" : "text-[#4640DE]"}`} />,
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
            className="font-clash font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] text-[#25324B]"
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
