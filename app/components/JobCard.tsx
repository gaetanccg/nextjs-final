import Link from 'next/link';
import Image from 'next/image';
import { PrismicText } from '@prismicio/react';
import type { PrismicDocument } from '@prismicio/client';
import type { JobData } from '@/app/types';
import BookmarkButton from './BookmarkButton';

interface JobCardProps {
  job: PrismicDocument;
}

export default function JobCard({ job }: JobCardProps) {
  const data = job.data as unknown as JobData;

  const tagsText = data.tags?.map((t) => t.tag).filter(Boolean).join(', ');

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <Link href={`/offres/${job.uid}`} className="flex-1">
          <h3 className="text-xl font-bold leading-none text-dark">
            <PrismicText field={data.title} />
          </h3>
        </Link>
        <BookmarkButton jobId={job.uid!} />
      </div>

      <div className="flex items-center gap-2">
        <Image src="/icons/calendar.svg" alt="" width={16} height={16} />
        <span className="text-sm font-medium text-primary">
          {data.publication_date
            ? new Date(data.publication_date).toLocaleDateString('fr-FR')
            : '—'}
        </span>
      </div>

      {tagsText && (
        <div className="flex items-center gap-2">
          <Image src="/icons/code.svg" alt="" width={16} height={16} />
          <span className="text-sm font-medium text-primary">{tagsText}</span>
        </div>
      )}

      <p className="text-sm font-medium leading-relaxed text-dark/70 mt-1">
        {data.short_desc}
      </p>
    </div>
  );
}
