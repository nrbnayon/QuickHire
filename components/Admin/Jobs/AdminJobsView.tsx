'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Eye, Search, X, Briefcase, Pencil } from "lucide-react";
import { jobsData as initialData, Job } from "@/data/jobsData";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import AdminJobModal from "./AdminJobModal";
import { cn } from "@/lib/utils";
import { StatsCard } from "@/components/Shared/StatsCard";
import { DeleteConfirmationModal } from "@/components/Shared/DeleteConfirmationModal";
import { TablePagination } from "@/components/Shared/TablePagination";

export default function AdminJobsView() {
  const [jobs, setJobs] = useState<Job[]>(initialData);
  const [query, setQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Modal State
  const [modal, setModal] = useState<{ open: boolean; mode: "view" | "edit" | "add"; job: Job | null }>({
    open: false,
    mode: "add",
    job: null
  });

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.company.toLowerCase().includes(query.toLowerCase()) ||
      j.category.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedJobs = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSave = (job: Job) => {
    if (modal.mode === "add") {
       setJobs((prev) => [job, ...prev]);
    } else {
       setJobs((prev) => prev.map(j => j.id === job.id ? job : j));
    }
    setModal({ ...modal, open: false });
  };

  const handleDelete = () => {
    if (deleteId) {
      setJobs((prev) => prev.filter((j) => j.id !== deleteId));
      setDeleteId(null);
    }
  };

  const openModal = (mode: "view" | "edit" | "add", job: Job | null = null) => {
    setModal({ open: true, mode, job });
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-[#F5F6FA] dark:bg-background">
      <DashboardHeader
        title="Job Management"
        description="Add, view, and manage all job listings."
      />

      <main className="p-5 md:p-8 space-y-6 overflow-y-auto flex-1">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Jobs" 
            value={jobs.length} 
            icon={Briefcase} 
            iconColor="#4640DE" 
            iconBgColor="#4640DE10"
            subtitle="Current active listings"
          />
          <StatsCard 
            title="Full-Time" 
            value={jobs.filter((j) => j.type === "Full-Time").length} 
            icon={Briefcase} 
            iconColor="#56CDAD" 
            iconBgColor="#56CDAD10"
            subtitle="Steady employment"
          />
          <StatsCard 
            title="Remote" 
            value={jobs.filter((j) => j.type === "Remote").length} 
            icon={Briefcase} 
            iconColor="#26A4FF" 
            iconBgColor="#26A4FF10"
            subtitle="Work from anywhere"
          />
          <StatsCard 
            title="Featured" 
            value={jobs.filter((j) => j.featured).length} 
            icon={Briefcase} 
            iconColor="#FFB836" 
            iconBgColor="#FFB83610"
            subtitle="High visibility posts"
          />
        </div>

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
          <div className="relative w-full sm:w-[340px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C8493]" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search jobs, companies..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#D6DDEB] bg-white outline-none text-[14px] text-[#25324B] placeholder:text-[#7C8493]/60 focus:border-[#4640DE] transition-colors rounded-lg shadow-sm"
            />
            {query && (
              <button onClick={() => { setQuery(""); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8493] hover:text-[#25324B]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => openModal("add")}
            className="flex items-center gap-2 bg-[#4640DE] text-white font-bold text-[14px] px-6 py-2.5 hover:bg-[#3530C4] transition-all rounded-lg whitespace-nowrap shadow-[0_4px_14px_rgba(70,64,222,0.25)] hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Add New Job
          </button>
        </div>

        {/* Jobs Table Container */}
        <div className="bg-white border border-[#D6DDEB] rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D6DDEB] bg-[#F8F8FD]">
                  <th className="text-left px-6 py-4 text-[13px] font-bold text-[#25324B] uppercase tracking-wider">Job Post</th>
                  <th className="text-left px-4 py-4 text-[13px] font-bold text-[#25324B] hidden sm:table-cell uppercase tracking-wider">Company</th>
                  <th className="text-left px-4 py-4 text-[13px] font-bold text-[#25324B] hidden md:table-cell uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-4 text-[13px] font-bold text-[#25324B] hidden lg:table-cell uppercase tracking-wider">Type</th>
                  <th className="text-right px-6 py-4 text-[13px] font-bold text-[#25324B] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-[#7C8493] text-[15px]">
                      {query ? `No results found for "${query}"` : "No job listings yet"}
                    </td>
                  </tr>
                ) : (
                  paginatedJobs.map((job, i) => (
                    <motion.tr
                      key={job.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-[#D6DDEB] last:border-0 hover:bg-[#F8F8FD]/60 transition-colors group cursor-pointer"
                      onClick={() => openModal("view", job)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[14px] shrink-0 border border-[#D6DDEB]/30 shadow-sm"
                            style={{ backgroundColor: job.logoBg, color: job.logoColor }}>
                            {job.logo}
                          </div>
                          <div>
                            <span className="font-semibold text-[14px] text-[#25324B] group-hover:text-[#4640DE] transition-colors text-left block">
                              {job.title}
                            </span>
                            <p className="text-[12px] text-[#7C8493] sm:hidden">{job.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[14px] text-[#515B6F] hidden sm:table-cell font-medium">{job.company}</td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="px-2.5 py-1 bg-[#4640DE]/5 text-[#4640DE] text-[12px] font-bold rounded-full border border-[#4640DE]/10">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className={cn("px-2.5 py-1 text-[12px] font-bold rounded-full border", 
                          job.type === "Full-Time" ? "text-[#56CDAD] border-[#56CDAD] bg-[#56CDAD]/10" :
                          job.type === "Part-Time" ? "text-[#FFB836] border-[#FFB836] bg-[#FFB836]/10" :
                          job.type === "Contract" ? "text-[#FF6550] border-[#FF6550] bg-[#FF6550]/10" :
                          "text-[#4640DE] border-[#4640DE] bg-[#4640DE]/10"
                        )}>
                          {job.type}
                        </span>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5 justify-end">
                          <button onClick={() => openModal("view", job)}
                            className="p-2 text-[#7C8493] hover:text-[#4640DE] hover:bg-[#4640DE]/10 rounded-lg transition-all"
                            title="View Details">
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button onClick={() => openModal("edit", job)}
                            className="p-2 text-blue-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit">
                            <Pencil className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => setDeleteId(job.id)}
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <TablePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            showPageSize={true}
          />
        </div>
      </main>

      {/* Admin Job Modal (Unified for View/Edit/Add) */}
      <AdminJobModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })}
        mode={modal.mode}
        job={modal.job}
        onSave={handleSave}
        onDelete={(id) => setDeleteId(id)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Job Listing"
        description="Are you sure you want to delete this job listing? This action is permanent and will remove the post from all public listings."
      />
    </div>
  );
}
