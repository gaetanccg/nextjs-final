'use client';

import { useEffect, useState } from 'react';
import type { PrismicDocument } from '@prismicio/client';
import { useApplicationStore } from '@/app/store/useApplicationStore';
import JobCard from './JobCard';

interface AppliedJobsProps {
  allJobs: PrismicDocument[];
}

export default function AppliedJobs({ allJobs }: AppliedJobsProps) {
  const { appliedJobIds } = useApplicationStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const appliedJobs = allJobs.filter((job) => appliedJobIds.includes(job.uid!));

  if (appliedJobs.length === 0) {
    return <p className="text-sm font-medium text-dark/60">Aucune candidature envoyée.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {appliedJobs.map((job) => (
        <JobCard key={job.uid} job={job} />
      ))}
    </div>
  );
}
