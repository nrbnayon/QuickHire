import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";

  return (
    <footer className="w-full bg-white dark:bg-background border-t border-border pt-20 pb-10 ">
      <div className="container mx-auto px-5 lg:px-4 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
        {/* Company Info */}
        <div className="md:col-span-1 space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden transform group-hover:rotate-12 transition-transform">
              <Image 
                src="/icons/logo.svg" 
                alt="Logo" 
                fill 
                className="object-contain" 
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {appName}
            </span>
          </Link>
          <p className="text-sm text-secondary leading-relaxed">
            Delivering the next generation of business management solutions. 
            Automate your workflow and scale your impact.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link href="#" className="p-2.5 bg-[#F5F6FA] hover:bg-primary hover:text-white rounded-xl transition-all" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="p-2.5 bg-[#F5F6FA] hover:bg-pink-500 hover:text-white rounded-xl transition-all" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="p-2.5 bg-[#F5F6FA] hover:bg-blue-600 hover:text-white rounded-xl transition-all" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-foreground">Solutions</h3>
          <ul className="space-y-4">
            <li><Link href="/products" className="text-sm text-secondary hover:text-primary transition-colors">Products</Link></li>
            <li><Link href="/pricing" className="text-sm text-secondary hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/about" className="text-sm text-secondary hover:text-primary transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-foreground">Support</h3>
          <ul className="space-y-4">
            <li><Link href="/help" className="text-sm text-secondary hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link href="/contact" className="text-sm text-secondary hover:text-primary transition-colors">Contact Support</Link></li>
            <li><Link href="/feedback" className="text-sm text-secondary hover:text-primary transition-colors">Feedback</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-foreground">Legal</h3>
          <ul className="space-y-4">
            <li><Link href="/terms" className="text-sm text-secondary hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy-policy" className="text-sm text-secondary hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/cookies" className="text-sm text-secondary hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 py-8 mt-16 border-t border-border/50 text-center md:flex md:justify-between items-center text-xs text-secondary/60">
        <p>© {currentYear} {appName}. All rights reserved.</p>
        <div className="flex items-center justify-center gap-6 mt-4 md:mt-0">
          <Link href="/security" className="hover:text-primary transition-colors">Security</Link>
          <Link href="/compliance" className="hover:text-primary transition-colors">Compliance</Link>
        </div>
      </div>
    </footer>
  );
}
