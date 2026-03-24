import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApplicationStore {
  appliedJobIds: string[];
  addApplication: (jobId: string) => void;
  hasApplied: (jobId: string) => boolean;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      appliedJobIds: [],
      addApplication: (jobId: string) => {
        const current = get().appliedJobIds;
        if (!current.includes(jobId)) {
          set({ appliedJobIds: [...current, jobId] });
        }
      },
      hasApplied: (jobId: string) => get().appliedJobIds.includes(jobId),
    }),
    { name: 'applications' }
  )
);
