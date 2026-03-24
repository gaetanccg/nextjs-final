import { getJobsPaginated, getAllTags } from '@/prismicio';
import JobCard from '@/app/components/JobCard';
import Tag from '@/app/components/Tag';
import Pagination from '@/app/components/Pagination';

const PAGE_SIZE = 6;

export default async function OffresPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>;
}) {
  const { page: pageParam, tag: activeTag } = await searchParams;
  const currentPage = Number(pageParam) || 1;

  const [response, allTags] = await Promise.all([
    getJobsPaginated(currentPage, PAGE_SIZE),
    getAllTags(),
  ]);

  const jobs = activeTag
    ? response.results.filter((job) => {
        const tags = (job.data as unknown as { tags: { tag: string }[] }).tags;
        return tags?.some((t) => t.tag?.toLowerCase() === activeTag.toLowerCase());
      })
    : response.results;

  return (
    <div className="px-8 py-12">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-5xl font-medium leading-none text-dark">Toutes les offres</h1>
        <p className="text-sm font-medium text-dark/60 mt-2">
          {response.total_results_size} offre{response.total_results_size > 1 ? 's' : ''} disponible{response.total_results_size > 1 ? 's' : ''}
        </p>
      </div>

      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              active={activeTag === tag}
              href={activeTag === tag ? '/offres' : `/offres?tag=${encodeURIComponent(tag)}`}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.uid} job={job} />
        ))}
      </div>

      {!activeTag && (
        <Pagination
          currentPage={currentPage}
          totalPages={response.total_pages}
          basePath="/offres"
        />
      )}
    </div>
  );
}
