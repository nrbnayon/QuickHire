"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend 
} from "recharts";
import { Briefcase, Users, FileText, TrendingUp, Filter, Calendar } from "lucide-react";
import { jobsData as initialJobs, Job } from "@/data/jobsData";
import { StatsCard } from "@/components/Shared/StatsCard";
import DashboardHeader from "@/components/Shared/DashboardHeader";

const COLORS = ["#4640DE", "#56CDAD", "#26A4FF", "#FFB836", "#FF6550", "#7C8493"];

export default function DashboardOverview() {
  const [jobs] = useState<Job[]>(initialJobs);

  // 1. Calculate Stats
  const totalJobs = jobs.length;
  const featuredJobs = jobs.filter(j => j.featured).length;
  const remoteJobs = jobs.filter(j => j.type === "Remote").length;
  const techJobs = jobs.filter(j => j.category === "Technology" || j.category === "Engineering").length;

  // 2. Job Statistics by Category (for Pie Chart)
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach(job => {
      counts[job.category] = (counts[job.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  // 3. Postings per day/month (for Area Chart)
  const trendData = useMemo(() => {
    const dailyCounts: Record<string, number> = {};
    jobs.forEach(job => {
      const date = new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });
    return Object.entries(dailyCounts)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .map(([name, count]) => ({ name, count }));
  }, [jobs]);

  // 4. Job Types (for Bar Chart)
  const typeData = useMemo(() => {
    const types: Record<string, number> = {};
    jobs.forEach(job => {
      types[job.type] = (types[job.type] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  return (
    <div className="flex flex-col flex-1 h-full bg-[#F5F6FA] dark:bg-background overflow-y-auto">
      <DashboardHeader 
        title="Admin Dashboard" 
        description="Welcome back! Here's a summary of QuickHire's performance."
      />

      <main className="p-5 md:p-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Active Jobs" 
            value={totalJobs} 
            icon={Briefcase} 
            iconColor="#4640DE" 
            iconBgColor="#4640DE10"
            subtitle="12% from last week"
          />
          <StatsCard 
            title="Total Applications" 
            value="1,248" 
            icon={Users} 
            iconColor="#56CDAD" 
            iconBgColor="#56CDAD10"
            subtitle="24% growth in talent"
          />
          <StatsCard 
            title="Remote Opportunities" 
            value={remoteJobs} 
            icon={FileText} 
            iconColor="#26A4FF" 
            iconBgColor="#26A4FF10"
            subtitle="Expanding worldwide"
          />
          <StatsCard 
            title="Featured Slots" 
            value={featuredJobs} 
            icon={TrendingUp} 
            iconColor="#FFB836" 
            iconBgColor="#FFB83610"
            subtitle="High engagement rate"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Trend Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white dark:bg-card border border-[#D6DDEB] rounded-2xl p-7 shadow-sm flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-clash font-semibold text-[18px] text-[#25324B]">Job Posting Volume</h3>
                <p className="text-[13px] text-[#7C8493]">Real-time trajectory of new job listings</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-[#D6DDEB] rounded-lg hover:bg-[#F8F8FD] transition-colors">
                  <Calendar className="w-4 h-4 text-[#7C8493]" />
                </button>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4640DE" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4640DE" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F6FA" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#7C8493" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#7C8493" }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                    itemStyle={{ color: "#4640DE", fontWeight: "bold" }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#4640DE" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Distribution (Pie) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-card border border-[#D6DDEB] rounded-2xl p-7 shadow-sm flex flex-col gap-6"
          >
            <div>
              <h3 className="font-clash font-semibold text-[18px] text-[#25324B]">Department Shares</h3>
              <p className="text-[13px] text-[#7C8493]">Breakdown of jobs by category</p>
            </div>

            <div className="h-[240px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="block text-[24px] font-semibold text-[#25324B]">{totalJobs}</span>
                <span className="text-[10px] uppercase font-semibold text-[#7C8493]">Jobs</span>
              </div>
            </div>

            <div className="space-y-2 mt-auto">
               {categoryData.slice(0, 3).map((cat, i) => (
                 <div key={cat.name} className="flex items-center justify-between text-[13px]">
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                     <span className="text-[#515B6F] font-medium">{cat.name}</span>
                   </div>
                   <span className="font-semibold text-[#25324B]">{Math.round((cat.value / totalJobs) * 100)}%</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Job Types Distribution */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-card border border-[#D6DDEB] rounded-2xl p-7 shadow-sm"
          >
            <h3 className="font-clash font-semibold text-[18px] text-[#25324B] mb-6">Employment Types</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F6FA" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                   <Tooltip />
                   <Bar dataKey="value" fill="#56CDAD" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity / Quick Stats */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-white dark:bg-card border border-[#D6DDEB] rounded-2xl p-7 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-clash font-semibold text-[18px] text-[#25324B]">Quick Insights</h3>
               <span className="px-3 py-1 bg-[#4640DE10] text-[#4640DE] text-[10px] font-semibold rounded-lg uppercase">Real-Time</span>
            </div>

            <div className="space-y-6">
              {[
                { label: "Talent Search", value: "84 Candidates online", desc: "Searching for technology roles", icon: Users, color: "#4640DE" },
                { label: "Application Velocity", value: "Low (Avg 2.5 per job)", desc: "Requires more featured listings", icon: TrendingUp, color: "#FF6550" },
                { label: "Category Leading", value: "Marketing", desc: "Highest click-through rate", icon: Filter, color: "#56CDAD" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-[#D6DDEB] hover:bg-[#F8F8FD] transition-all group">
                   <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: `${item.color}10` }}>
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                   </div>
                   <div>
                     <h4 className="font-semibold text-[14px] text-[#25324B] mb-0.5">{item.label}</h4>
                     <p className="text-[14px] font-semibold text-[#4640DE]">{item.value}</p>
                     <p className="text-[12px] text-[#7C8493]">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
