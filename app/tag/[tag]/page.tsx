import { getJobsByTag } from '@/prismicio';
import JobCard from '@/app/components/JobCard';
import Pagination from '@/app/components/Pagination';
import PageHeader from '@/app/components/PageHeader';
import BackButton from '@/app/components/BackButton';

const PAGE_SIZE = 6;

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag } = await params;
  const { page: pageParam } = await searchParams;
  const decodedTag = decodeURIComponent(tag);
  const currentPage = Number(pageParam) || 1;

  const allJobs = await getJobsByTag(decodedTag);
  const totalPages = Math.ceil(allJobs.length / PAGE_SIZE);
  const jobs = allJobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="px-8 py-12">
      <BackButton />

      <PageHeader
        title={`Tag : ${decodedTag}`}
        count={allJobs.length}
        countLabel={`offre${allJobs.length > 1 ? 's' : ''}`}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.uid} job={job} />
        ))}
      </div>

      {jobs.length === 0 && (
        <p className="text-sm font-medium text-dark/60">Aucune offre pour ce tag.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/tag/${encodeURIComponent(decodedTag)}`}
      />
    </div>
  );
}
