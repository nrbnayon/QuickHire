import AdminJobsView from "@/components/Landing/AdminJobsView";

export const metadata = {
  title: "Job Management | QuickHire Admin",
  description: "Manage all job listings - add, view, and delete job postings.",
};

export default function AdminJobsPage() {
  return <AdminJobsView />;
}
