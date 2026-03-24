import React from "react";
import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";


export default async function PublicLayoutView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-background flex flex-col w-full overflow-x-hidden pt-0 animate-in fade-in duration-700">
      {/* Header with auth-aware links */}
      <PublicNavbar />

      {/* Hero / Page Content */}
      <main className="flex-1 w-full bg-grid-slate-100/50 dark:bg-transparent min-w-0">
        <div className="w-full mx-auto flex-1 flex flex-col">
          {children}
        </div>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
