"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Building2, Clock, DollarSign, Users, Briefcase, CheckCircle2, Send } from "lucide-react";
import { jobsData } from "@/data/jobsData";

interface ApplyForm {
  name: string;
  email: string;
  resumeUrl: string;
  coverNote: string;
}

function ApplyModal({ jobTitle, company, onClose }: { jobTitle: string; company: string; onClose: () => void }) {
  const [form, setForm] = useState<ApplyForm>({ name: "", email: "", resumeUrl: "", coverNote: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplyForm>>({});

  const validate = () => {
    const e: Partial<ApplyForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.resumeUrl.trim() || !/^https?:\/\//.test(form.resumeUrl)) e.resumeUrl = "Valid URL is required (https://...)";
    if (!form.coverNote.trim()) e.coverNote = "Cover note is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white w-full max-w-[560px] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#4640DE] px-8 py-6">
          <h2 className="font-bold text-[22px] text-white">{submitted ? "Application Sent!" : `Apply for ${jobTitle}`}</h2>
          <p className="text-white/70 text-[14px] mt-1">{company}</p>
        </div>

        {submitted ? (
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 bg-[#56CDAD]/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#56CDAD]" />
            </div>
            <h3 className="font-bold text-[20px] text-[#25324B] mb-2">Application Submitted!</h3>
            <p className="text-[#515B6F] mb-6">We&apos;ve received your application for <strong>{jobTitle}</strong> at {company}. We&apos;ll be in touch soon.</p>
            <button onClick={onClose} className="bg-[#4640DE] text-white font-bold px-8 py-3 hover:bg-[#3530C4] transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-5">
            {/* Name */}
            <div>
              <label className="block text-[14px] font-semibold text-[#25324B] mb-2">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/60 focus:border-[#4640DE] transition-colors ${errors.name ? "border-[#FF6550]" : "border-[#D6DDEB]"}`}
              />
              {errors.name && <p className="text-[12px] text-[#FF6550] mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[14px] font-semibold text-[#25324B] mb-2">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 border outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/60 focus:border-[#4640DE] transition-colors ${errors.email ? "border-[#FF6550]" : "border-[#D6DDEB]"}`}
              />
              {errors.email && <p className="text-[12px] text-[#FF6550] mt-1">{errors.email}</p>}
            </div>

            {/* Resume URL */}
            <div>
              <label className="block text-[14px] font-semibold text-[#25324B] mb-2">Resume Link (URL) *</label>
              <input
                type="url"
                value={form.resumeUrl}
                onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                placeholder="https://drive.google.com/your-resume"
                className={`w-full px-4 py-3 border outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/60 focus:border-[#4640DE] transition-colors ${errors.resumeUrl ? "border-[#FF6550]" : "border-[#D6DDEB]"}`}
              />
              {errors.resumeUrl && <p className="text-[12px] text-[#FF6550] mt-1">{errors.resumeUrl}</p>}
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-[14px] font-semibold text-[#25324B] mb-2">Cover Note *</label>
              <textarea
                value={form.coverNote}
                onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                placeholder="Tell us why you're a great fit for this role..."
                rows={4}
                className={`w-full px-4 py-3 border outline-none text-[15px] text-[#25324B] placeholder:text-[#7C8493]/60 focus:border-[#4640DE] transition-colors resize-none ${errors.coverNote ? "border-[#FF6550]" : "border-[#D6DDEB]"}`}
              />
              {errors.coverNote && <p className="text-[12px] text-[#FF6550] mt-1">{errors.coverNote}</p>}
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border-2 border-[#D6DDEB] text-[#515B6F] font-bold py-3 hover:border-[#4640DE] hover:text-[#4640DE] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#4640DE] text-white font-bold py-3 hover:bg-[#3530C4] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? "Submitting..." : <><Send className="w-4 h-4" /> Submit Application</>}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function JobDetailView({ id }: { id: string }) {
  const job = jobsData.find((j) => j.id === id);
  const [showApply, setShowApply] = useState(false);

  if (!job) return notFound();

  const relatedJobs = jobsData.filter((j) => j.id !== id && j.category === job.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F8FD]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#D6DDEB] py-4">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-0">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-[#4640DE] font-semibold text-[14px] hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-0 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Job Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#D6DDEB] p-8"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div
                  className="w-20 h-20 flex items-center justify-center rounded font-bold text-[24px] shrink-0"
                  style={{ backgroundColor: job.logoBg, color: job.logoColor }}
                >
                  {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h1 className="font-bold text-[26px] sm:text-[30px] text-[#25324B] mb-1">{job.title}</h1>
                      <p className="text-[#515B6F] text-[16px] flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{job.company}</span>
                        <span className="w-1 h-1 rounded-full bg-[#D6DDEB]" />
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                      </p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full border-2 font-bold text-[13px] ${
                      job.type === "Full-Time" ? "text-[#56CDAD] border-[#56CDAD] bg-[#56CDAD]/10" :
                      job.type === "Part-Time" ? "text-[#FFB836] border-[#FFB836] bg-[#FFB836]/10" :
                      job.type === "Contract" ? "text-[#FF6550] border-[#FF6550] bg-[#FF6550]/10" :
                      "text-[#4640DE] border-[#4640DE] bg-[#4640DE]/10"
                    }`}>
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {job.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 border-2 border-[#D6DDEB] text-[#515B6F] text-[13px] font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowApply(true)}
                className="mt-6 w-full sm:w-auto bg-[#4640DE] text-white font-bold text-[16px] px-10 py-4 hover:bg-[#3530C4] transition-colors flex items-center justify-center gap-2"
              >
                Apply Now <Send className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-[#D6DDEB] p-8 flex flex-col gap-7"
            >
              <div>
                <h2 className="font-bold text-[22px] text-[#25324B] mb-4">About this role</h2>
                <p className="text-[16px] text-[#515B6F] leading-relaxed">{job.description}</p>
              </div>

              <div>
                <h3 className="font-bold text-[20px] text-[#25324B] mb-4">Responsibilities</h3>
                <ul className="flex flex-col gap-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-[#515B6F]">
                      <CheckCircle2 className="w-5 h-5 text-[#4640DE] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[20px] text-[#25324B] mb-4">Requirements</h3>
                <ul className="flex flex-col gap-3">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-[#515B6F]">
                      <CheckCircle2 className="w-5 h-5 text-[#56CDAD] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setShowApply(true)}
                className="w-full sm:w-auto self-start bg-[#4640DE] text-white font-bold text-[15px] px-8 py-3.5 hover:bg-[#3530C4] transition-colors flex items-center gap-2"
              >
                Apply Now <Send className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-5">
            {/* Job Overview */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white border border-[#D6DDEB] p-6"
            >
              <h3 className="font-bold text-[18px] text-[#25324B] mb-5">Job Overview</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Clock, label: "Job Type", value: job.type },
                  { icon: MapPin, label: "Location", value: job.location },
                  { icon: DollarSign, label: "Salary", value: job.salary || "Competitive" },
                  { icon: Briefcase, label: "Category", value: job.category },
                  { icon: Building2, label: "Industry", value: job.industry || "N/A" },
                  { icon: Users, label: "Company Size", value: job.companySize || "N/A" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4640DE]/8 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#4640DE]" />
                    </div>
                    <div>
                      <p className="text-[12px] text-[#7C8493]">{label}</p>
                      <p className="font-semibold text-[14px] text-[#25324B]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#4640DE] p-6 text-white"
            >
              <h3 className="font-bold text-[18px] mb-2">Interested in this job?</h3>
              <p className="text-white/70 text-[14px] mb-5">Submit your application now to be considered.</p>
              <button
                onClick={() => setShowApply(true)}
                className="w-full bg-white text-[#4640DE] font-bold py-3 hover:bg-[#F8F8FD] transition-colors text-[15px]"
              >
                Apply Now
              </button>
            </motion.div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white border border-[#D6DDEB] p-6"
              >
                <h3 className="font-bold text-[18px] text-[#25324B] mb-4">Similar Jobs</h3>
                <div className="flex flex-col divide-y divide-[#D6DDEB]">
                  {relatedJobs.map((rj) => (
                    <Link key={rj.id} href={`/jobs/${rj.id}`} className="py-3 flex items-center gap-3 hover:opacity-80 transition-opacity group">
                      <div className="w-10 h-10 rounded font-bold text-[14px] flex items-center justify-center shrink-0"
                        style={{ backgroundColor: rj.logoBg, color: rj.logoColor }}>
                        {rj.logo}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[14px] text-[#25324B] truncate group-hover:text-[#4640DE] transition-colors">{rj.title}</p>
                        <p className="text-[12px] text-[#7C8493]">{rj.company} · {rj.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {showApply && (
        <ApplyModal jobTitle={job.title} company={job.company} onClose={() => setShowApply(false)} />
      )}
    </div>
  );
}
