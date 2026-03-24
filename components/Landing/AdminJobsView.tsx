"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Eye, Search, X, Briefcase } from "lucide-react";
import { jobsData as initialData, Job, JobCategory, JobType, categories, jobTypes } from "@/data/jobsData";
import Link from "next/link";
import DashboardHeader from "@/components/Shared/DashboardHeader";

const EMPTY_FORM: Omit<Job, "id" | "featured" | "postedAt"> = {
  title: "",
  company: "",
  location: "",
  type: "Full-Time",
  category: "Design",
  salary: "",
  description: "",
  responsibilities: [""],
  requirements: [""],
  tags: [],
  logo: "",
  logoColor: "#4640DE",
  logoBg: "#F8F8FD",
  companySize: "",
  industry: "",
};

function AddJobModal({ onClose, onAdd }: { onClose: () => void; onAdd: (job: Job) => void }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.company.trim()) e.company = "Required";
    if (!form.location.trim()) e.location = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (!form.logo.trim()) e.logo = "Required (1-2 chars)";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const newJob: Job = {
      ...form,
      id: Date.now().toString(),
      featured: false,
      postedAt: new Date().toISOString().split("T")[0],
      responsibilities: form.responsibilities.filter(Boolean),
      requirements: form.requirements.filter(Boolean),
    };
    onAdd(newJob);
    onClose();
  };

  const updateListItem = (field: "responsibilities" | "requirements", index: number, value: string) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm({ ...form, [field]: arr });
  };

  const addListItem = (field: "responsibilities" | "requirements") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeListItem = (field: "responsibilities" | "requirements", index: number) => {
    setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white w-full max-w-[720px] my-8 shadow-2xl"
      >
        <div className="bg-[#4640DE] px-8 py-5 flex items-center justify-between">
          <h2 className="font-bold text-[20px] text-white">Add New Job Listing</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-5 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Job Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Senior UX Designer"
                className={`w-full px-4 py-3 border outline-none text-[14px] focus:border-[#4640DE] transition-colors ${errors.title ? "border-[#FF6550]" : "border-[#D6DDEB]"}`} />
              {errors.title && <p className="text-[11px] text-[#FF6550] mt-1">{errors.title}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Company *</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Apple Inc."
                className={`w-full px-4 py-3 border outline-none text-[14px] focus:border-[#4640DE] transition-colors ${errors.company ? "border-[#FF6550]" : "border-[#D6DDEB]"}`} />
              {errors.company && <p className="text-[11px] text-[#FF6550] mt-1">{errors.company}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Location *</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Remote, New York"
                className={`w-full px-4 py-3 border outline-none text-[14px] focus:border-[#4640DE] transition-colors ${errors.location ? "border-[#FF6550]" : "border-[#D6DDEB]"}`} />
              {errors.location && <p className="text-[11px] text-[#FF6550] mt-1">{errors.location}</p>}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Salary Range</label>
              <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })}
                placeholder="e.g. $80k–$110k"
                className="w-full px-4 py-3 border border-[#D6DDEB] outline-none text-[14px] focus:border-[#4640DE] transition-colors" />
            </div>

            {/* Type */}
            <div>
              <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Job Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as JobType })}
                className="w-full px-4 py-3 border border-[#D6DDEB] outline-none text-[14px] focus:border-[#4640DE] transition-colors bg-white">
                {jobTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as JobCategory })}
                className="w-full px-4 py-3 border border-[#D6DDEB] outline-none text-[14px] focus:border-[#4640DE] transition-colors bg-white">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Logo Text * (1-2 chars)</label>
              <input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value.slice(0, 2) })}
                maxLength={2} placeholder="e.g. A"
                className={`w-full px-4 py-3 border outline-none text-[14px] focus:border-[#4640DE] transition-colors ${errors.logo ? "border-[#FF6550]" : "border-[#D6DDEB]"}`} />
              {errors.logo && <p className="text-[11px] text-[#FF6550] mt-1">{errors.logo}</p>}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Industry</label>
              <input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
                placeholder="e.g. Technology"
                className="w-full px-4 py-3 border border-[#D6DDEB] outline-none text-[14px] focus:border-[#4640DE] transition-colors" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-semibold text-[#25324B] mb-1.5">Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the role..."
              rows={3}
              className={`w-full px-4 py-3 border outline-none text-[14px] focus:border-[#4640DE] transition-colors resize-none ${errors.description ? "border-[#FF6550]" : "border-[#D6DDEB]"}`} />
            {errors.description && <p className="text-[11px] text-[#FF6550] mt-1">{errors.description}</p>}
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-[13px] font-semibold text-[#25324B] mb-2">Responsibilities</label>
            {form.responsibilities.map((r, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={r} onChange={(e) => updateListItem("responsibilities", i, e.target.value)}
                  placeholder={`Responsibility ${i + 1}`}
                  className="flex-1 px-3 py-2 border border-[#D6DDEB] outline-none text-[13px] focus:border-[#4640DE]" />
                <button type="button" onClick={() => removeListItem("responsibilities", i)} className="text-[#FF6550] p-2 hover:bg-[#FF6550]/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addListItem("responsibilities")}
              className="text-[#4640DE] text-[13px] font-semibold hover:underline flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add responsibility
            </button>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-[13px] font-semibold text-[#25324B] mb-2">Requirements</label>
            {form.requirements.map((r, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={r} onChange={(e) => updateListItem("requirements", i, e.target.value)}
                  placeholder={`Requirement ${i + 1}`}
                  className="flex-1 px-3 py-2 border border-[#D6DDEB] outline-none text-[13px] focus:border-[#4640DE]" />
                <button type="button" onClick={() => removeListItem("requirements", i)} className="text-[#FF6550] p-2 hover:bg-[#FF6550]/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addListItem("requirements")}
              className="text-[#4640DE] text-[13px] font-semibold hover:underline flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add requirement
            </button>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[13px] font-semibold text-[#25324B] mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Add tag and press Enter"
                className="flex-1 px-3 py-2 border border-[#D6DDEB] outline-none text-[13px] focus:border-[#4640DE]" />
              <button type="button" onClick={addTag} className="px-4 bg-[#4640DE] text-white text-[13px] font-semibold hover:bg-[#3530C4] transition-colors">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-[#4640DE]/10 text-[#4640DE] text-[12px] font-semibold rounded-full">
                  {tag}
                  <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2 sticky bottom-0 bg-white py-4 -mx-8 px-8 border-t border-[#D6DDEB]">
            <button type="button" onClick={onClose}
              className="flex-1 border-2 border-[#D6DDEB] text-[#515B6F] font-bold py-3 hover:border-[#4640DE] hover:text-[#4640DE] transition-colors text-[14px]">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 bg-[#4640DE] text-white font-bold py-3 hover:bg-[#3530C4] transition-colors text-[14px] flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Job Listing
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminJobsView() {
  const [jobs, setJobs] = useState<Job[]>(initialData);
  const [query, setQuery] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      j.company.toLowerCase().includes(query.toLowerCase()) ||
      j.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = (job: Job) => setJobs((prev) => [job, ...prev]);

  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-[#F5F6FA] dark:bg-background">
      <DashboardHeader
        title="Job Management"
        description="Add, view, and manage all job listings."
      />

      <main className="p-5 md:p-8 space-y-6 overflow-y-auto flex-1">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-[340px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C8493]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, companies..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#D6DDEB] bg-white outline-none text-[14px] text-[#25324B] placeholder:text-[#7C8493]/60 focus:border-[#4640DE] transition-colors rounded-lg"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8493] hover:text-[#25324B]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-[#4640DE] text-white font-bold text-[14px] px-5 py-2.5 hover:bg-[#3530C4] transition-colors rounded-lg whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add New Job
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Jobs", value: jobs.length, color: "#4640DE", bg: "#4640DE10" },
            { label: "Full-Time", value: jobs.filter((j) => j.type === "Full-Time").length, color: "#56CDAD", bg: "#56CDAD10" },
            { label: "Remote", value: jobs.filter((j) => j.type === "Remote").length, color: "#26A4FF", bg: "#26A4FF10" },
            { label: "Featured", value: jobs.filter((j) => j.featured).length, color: "#FFB836", bg: "#FFB83610" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-[#D6DDEB] p-5 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: stat.bg }}>
                <Briefcase className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="font-bold text-[22px] text-[#25324B]">{stat.value}</p>
                <p className="text-[12px] text-[#7C8493]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Jobs Table */}
        <div className="bg-white border border-[#D6DDEB] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D6DDEB] bg-[#F8F8FD]">
                  <th className="text-left px-6 py-4 text-[13px] font-bold text-[#25324B]">Job</th>
                  <th className="text-left px-4 py-4 text-[13px] font-bold text-[#25324B] hidden sm:table-cell">Company</th>
                  <th className="text-left px-4 py-4 text-[13px] font-bold text-[#25324B] hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-4 text-[13px] font-bold text-[#25324B] hidden lg:table-cell">Type</th>
                  <th className="text-left px-4 py-4 text-[13px] font-bold text-[#25324B] hidden lg:table-cell">Posted</th>
                  <th className="text-right px-6 py-4 text-[13px] font-bold text-[#25324B]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-[#7C8493] text-[14px]">
                      No jobs found matching &quot;{query}&quot;
                    </td>
                  </tr>
                ) : (
                  filtered.map((job, i) => (
                    <motion.tr
                      key={job.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-[#D6DDEB] last:border-0 hover:bg-[#F8F8FD] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded flex items-center justify-center font-bold text-[14px] shrink-0"
                            style={{ backgroundColor: job.logoBg, color: job.logoColor }}>
                            {job.logo}
                          </div>
                          <div>
                            <p className="font-semibold text-[14px] text-[#25324B]">{job.title}</p>
                            <p className="text-[12px] text-[#7C8493] sm:hidden">{job.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[14px] text-[#515B6F] hidden sm:table-cell">{job.company}</td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="px-2.5 py-1 bg-[#4640DE]/10 text-[#4640DE] text-[12px] font-semibold rounded-full">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className={`px-2.5 py-1 text-[12px] font-semibold rounded-full border ${
                          job.type === "Full-Time" ? "text-[#56CDAD] border-[#56CDAD] bg-[#56CDAD]/10" :
                          job.type === "Part-Time" ? "text-[#FFB836] border-[#FFB836] bg-[#FFB836]/10" :
                          job.type === "Contract" ? "text-[#FF6550] border-[#FF6550] bg-[#FF6550]/10" :
                          "text-[#4640DE] border-[#4640DE] bg-[#4640DE]/10"
                        }`}>
                          {job.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[13px] text-[#7C8493] hidden lg:table-cell">{job.postedAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Link href={`/jobs/${job.id}`}
                            className="p-2 text-[#4640DE] hover:bg-[#4640DE]/10 rounded-lg transition-colors"
                            title="View">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(job.id)}
                            className="p-2 text-[#FF6550] hover:bg-[#FF6550]/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Job Modal */}
      {showAdd && <AddJobModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white p-8 max-w-[420px] w-full shadow-2xl rounded-xl text-center"
          >
            <div className="w-14 h-14 bg-[#FF6550]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-[#FF6550]" />
            </div>
            <h3 className="font-bold text-[20px] text-[#25324B] mb-2">Delete Job Listing</h3>
            <p className="text-[#515B6F] text-[15px] mb-6">
              Are you sure you want to delete this job listing? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 border-2 border-[#D6DDEB] text-[#515B6F] font-bold py-3 hover:border-[#4640DE] hover:text-[#4640DE] transition-colors rounded-lg">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-[#FF6550] text-white font-bold py-3 hover:bg-[#e04a37] transition-colors rounded-lg flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
