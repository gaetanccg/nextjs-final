import { getJobsByTag } from '@/prismicio';
import JobCard from '@/app/components/JobCard';

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const jobs = await getJobsByTag(decodedTag);

  return (
    <div className="px-6 py-12">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-5xl font-medium leading-none text-dark">
          Tag : {decodedTag}
        </h1>
        <p className="text-sm font-medium text-dark/60">
          {jobs.length} offre{jobs.length > 1 ? 's' : ''} trouvée{jobs.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.uid} job={job} />
        ))}
      </div>

      {jobs.length === 0 && (
        <p className="text-sm font-medium text-dark/60">Aucune offre pour ce tag.</p>
      )}
    </div>
  );
}
