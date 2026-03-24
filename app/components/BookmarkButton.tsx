'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BookmarkButtonProps {
  jobId: string;
}

function getPinnedIds(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('pinnedJobIds');
  return stored ? JSON.parse(stored) : [];
}

function setPinnedIds(ids: string[]) {
  localStorage.setItem('pinnedJobIds', JSON.stringify(ids));
}

export default function BookmarkButton({ jobId }: BookmarkButtonProps) {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    setIsPinned(getPinnedIds().includes(jobId));
  }, [jobId]);

  const toggle = () => {
    const ids = getPinnedIds();
    let next: string[];
    if (ids.includes(jobId)) {
      next = ids.filter((id) => id !== jobId);
    } else {
      next = [...ids, jobId];
    }
    setPinnedIds(next);
    setIsPinned(!isPinned);
  };

  return (
    <button onClick={toggle} aria-label={isPinned ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
      <Image
        src={isPinned ? '/icons/bookmark-filled.svg' : '/icons/bookmark-outline.svg'}
        alt="Signet"
        width={24}
        height={24}
      />
    </button>
  );
}
