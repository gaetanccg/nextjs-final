'use client';

import { useEffect, useState } from 'react';
import type { PrismicDocument } from '@prismicio/client';
import { useBookmarkStore } from '@/app/store/useBookmarkStore';
import JobCard from './JobCard';

interface PinnedJobsProps {
  allJobs: PrismicDocument[];
}

export default function PinnedJobs({ allJobs }: PinnedJobsProps) {
  const { pinnedJobIds } = useBookmarkStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const pinnedJobs = allJobs.filter((job) => pinnedJobIds.includes(job.uid!));

  if (pinnedJobs.length === 0) {
    return <p className="text-sm font-medium text-dark/60">Aucune offre enregistrée.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pinnedJobs.map((job) => (
        <JobCard key={job.uid} job={job} />
      ))}
    </div>
  );
}
