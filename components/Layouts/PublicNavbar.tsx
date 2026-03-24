"use client";

import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import LogoutModal from "@/components/Shared/LogoutModal";
import Image from "next/image";

function QuickHireLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="w-8 h-8 bg-[#4640DE] rounded-full flex items-center justify-center shrink-0">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <circle cx="7.5" cy="7.5" r="5.5" stroke="white" strokeWidth="2" />
          <path d="M11.5 11.5L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className="font-bold text-[22px] text-[#25324B] tracking-tight leading-none">
        QuickHire
      </span>
    </Link>
  );
}

export default function PublicNavbar() {
  const { name, role, image, isAuthenticated, logout } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 10);
    setHidden(latest > previous && latest > 120);
  });

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-[#D6DDEB] shadow-sm"
            : "bg-[#F8F8FD]"
        )}
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-0 h-[76px] flex items-center justify-between gap-8">
          <QuickHireLogo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 h-full">
            <Link
              href="/jobs"
              className="font-medium text-[16px] text-[#515B6F] hover:text-[#4640DE] transition-colors px-3 py-2"
            >
              Find Jobs
            </Link>
            <Link
              href="#"
              className="font-medium text-[16px] text-[#515B6F] hover:text-[#4640DE] transition-colors px-3 py-2"
            >
              Browse Companies
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="flex items-center gap-2.5 group">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#D6DDEB] group-hover:border-[#4640DE] transition-colors relative bg-[#F8F8FD]">
                    <Image src={image || "/images/avatar.png"} alt="Profile" fill className="object-cover" sizes="36px" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#25324B]">{name || "User"}</span>
                </Link>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="p-2 text-[#515B6F] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="font-bold text-[16px] text-[#4640DE] px-6 py-3 hover:bg-[#CCCCF5]/30 rounded transition-colors"
                >
                  Login
                </Link>
                <div className="w-px h-10 bg-[#D6DDEB]" />
                <Link
                  href="/signup"
                  className="font-bold text-[16px] text-white bg-[#4640DE] px-6 py-3 hover:bg-[#3530C4] transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#25324B] hover:bg-[#F8F8FD] rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-[#D6DDEB] shadow-lg px-5 pb-6 pt-2 space-y-1"
          >
            <Link
              href="#"
              className="block py-3 text-[16px] font-medium text-[#515B6F] hover:text-[#4640DE] border-b border-[#D6DDEB]"
              onClick={() => setMobileOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              href="#"
              className="block py-3 text-[16px] font-medium text-[#515B6F] hover:text-[#4640DE] border-b border-[#D6DDEB]"
              onClick={() => setMobileOpen(false)}
            >
              Browse Companies
            </Link>
            {!isAuthenticated ? (
              <div className="flex gap-3 pt-4">
                <Link
                  href="/signin"
                  className="flex-1 text-center font-bold text-[15px] text-[#4640DE] border-2 border-[#4640DE] py-3 rounded transition-colors hover:bg-[#CCCCF5]/30"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 text-center font-bold text-[15px] text-white bg-[#4640DE] py-3 rounded transition-colors hover:bg-[#3530C4]"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="pt-4">
                <button
                  onClick={() => { setShowLogoutModal(true); setMobileOpen(false); }}
                  className="w-full flex items-center gap-2 text-red-500 font-semibold py-3 px-4 rounded hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.header>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
      />
    </>
  );
}
