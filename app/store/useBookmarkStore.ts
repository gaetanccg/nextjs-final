import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkStore {
  pinnedJobIds: string[];
  toggle: (jobId: string) => void;
  isPinned: (jobId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      pinnedJobIds: [],
      toggle: (jobId: string) => {
        const current = get().pinnedJobIds;
        if (current.includes(jobId)) {
          set({ pinnedJobIds: current.filter((id) => id !== jobId) });
        } else {
          set({ pinnedJobIds: [...current, jobId] });
        }
      },
      isPinned: (jobId: string) => get().pinnedJobIds.includes(jobId),
    }),
    { name: 'bookmarks' }
  )
);
