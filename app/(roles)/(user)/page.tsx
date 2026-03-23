"use client";

import { motion } from "framer-motion";
import { User, Activity, Package, Clock } from "lucide-react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { StatsCard } from "@/components/Shared/StatsCard";

export default function UserPage() {
  const stats = [
    {
      title: "Active Projects",
      value: "5",
      icon: Activity,
      iconColor: "#3B82F6",
      iconBgColor: "rgba(59, 130, 246, 0.1)",
      subtitle: "2.1% Up from yesterday",
      isUp: true,
    },
    {
      title: "Completed Tasks",
      value: "142",
      icon: Package,
      iconColor: "#8B5CF6",
      iconBgColor: "rgba(139, 92, 246, 0.1)",
      subtitle: "10% Up from last month",
      isUp: true,
    },
    {
      title: "Hours Worked",
      value: "35h",
      icon: Clock,
      iconColor: "#10B981",
      iconBgColor: "rgba(16, 185, 129, 0.1)",
      subtitle: "1.5% Down from yesterday",
      isUp: false,
    },
    {
      title: "Profile Strength",
      value: "85%",
      icon: User,
      iconColor: "#F59E0B",
      iconBgColor: "rgba(245, 158, 11, 0.1)",
      subtitle: "Complete your profile",
      isUp: true,
    },
  ];

  return (
    <div className="flex flex-col flex-1 h-full bg-[#F5F6FA] dark:bg-background">
      <DashboardHeader 
        title="User Dashboard" 
        description="Welcome back! Here's your recent activity summary."
      />

      <main className="p-6 md:p-10 space-y-10 overflow-y-auto">
        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </motion.div>

        {/* Dummy Activity Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="bg-white dark:bg-card p-6 rounded-3xl border border-border shadow-sm min-h-[400px] flex items-center justify-center text-center"
        >
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Activity className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold">Activity Timeline Coming Soon</h2>
            <p className="text-secondary max-w-sm mx-auto">
              Your recent history and personalized insights are currently being finalized. Check back soon for more data.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
