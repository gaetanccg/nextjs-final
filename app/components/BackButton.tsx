'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
    >
      &larr; Retour
    </button>
  );
}
