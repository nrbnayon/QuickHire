"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import LogoutModal from "@/components/Shared/LogoutModal";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PublicNavbar() {
  const { name, role, image, isAuthenticated, logout } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Scrolled state for backdrop/border changes
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hidden state for scroll direction
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/70 dark:bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm py-2" 
          : "bg-transparent py-4 border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-10 h-10 overflow-hidden transform group-hover:scale-110 transition-transform">
             <Image 
                src="/icons/logo.svg" 
                alt="Logo" 
                fill 
                sizes="40px"
                className="object-contain" 
                priority 
             />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hidden sm:inline-block">
            {process.env.NEXT_PUBLIC_APP_NAME || "App"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/products" className="text-foreground/70 hover:text-primary transition-colors">Products</Link>
          <Link href="/pricing" className="text-foreground/70 hover:text-primary transition-colors">Pricing</Link>
          <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">About</Link>
          {isAuthenticated && role === 'admin' && (
            <Link href="/admin" className="text-primary font-semibold hover:opacity-80 transition-all">Admin Dashboard</Link>
          )}
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 md:gap-5">
              {/* Notifications */}
              <Link 
                href="/notifications"
                className="relative p-2.5 bg-muted/50 hover:bg-muted rounded-xl transition-all hidden sm:flex"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-blue-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </Link>

              {/* Profile Shortcut */}
              <Link href="/profile" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-all bg-muted relative">
                  <Image 
                    src={image || "/images/avatar.png"} 
                    alt="Profile" 
                    fill 
                    sizes="40px"
                    className="object-cover" 
                  />
                </div>
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-sm font-bold text-foreground truncate max-w-[120px]">{name || "User"}</span>
                  <span className="text-[10px] text-muted-foreground capitalize font-semibold leading-none">{role}</span>
                </div>
              </Link>

              {/* Logout */}
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
               <Button asChild variant="ghost" className="rounded-full font-semibold">
                 <Link href="/signin">Sign In</Link>
               </Button>
               <Button asChild className="rounded-full font-semibold px-6 shadow-md hover:shadow-lg transition-all">
                 <Link href="/signup">Get Started</Link>
               </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border p-6 space-y-4 shadow-2xl backdrop-blur-xl bg-background/95"
        >
          <Link href="/products" className="block text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link href="/pricing" className="block text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link href="/about" className="block text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
          {!isAuthenticated && (
             <div className="pt-4 space-y-3">
                <Button asChild variant="outline" className="w-full rounded-full" onClick={() => setMobileMenuOpen(false)}><Link href="/signin">Sign In</Link></Button>
                <Button asChild className="w-full rounded-full" onClick={() => setMobileMenuOpen(false)}><Link href="/signup">Get Started</Link></Button>
             </div>
          )}
        </motion.div>
      )}

      {/* Logout Modal Overlay */}
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
      />
    </motion.header>
  );
}
