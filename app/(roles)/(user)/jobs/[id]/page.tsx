import JobDetailView from "@/components/Landing/JobDetailView";
import { jobsData } from "@/data/jobsData";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return jobsData.map((job) => ({ id: job.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const job = jobsData.find((j) => j.id === id);
  return {
    title: job ? `${job.title} at ${job.company} | QuickHire` : "Job Not Found | QuickHire",
    description: job?.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  return <JobDetailView id={id} />;
}
