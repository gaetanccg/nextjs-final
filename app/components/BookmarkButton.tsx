'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useBookmarkStore} from '@/app/store/useBookmarkStore';

interface BookmarkButtonProps {
    jobId: string;
}

export default function BookmarkButton({jobId}: BookmarkButtonProps) {
    const {toggle, isPinned} = useBookmarkStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const pinned = hydrated && isPinned(jobId);

    return (
        <button onClick={() => toggle(jobId)} aria-label={pinned ? 'Retirer des favoris' : 'Ajouter aux favoris'}>
            <Image
                src={pinned ? '/icons/bookmark-filled.svg' : '/icons/bookmark-outline.svg'}
                alt="Signet"
                width={24}
                height={24}
            />
        </button>
    );
}
