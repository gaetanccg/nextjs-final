import { getAllJobs } from '@/prismicio';
import PinnedJobs from '@/app/components/PinnedJobs';
import AppliedJobs from '@/app/components/AppliedJobs';

export default async function ProfilPage() {
  const allJobs = await getAllJobs();

  return (
    <div className="px-8 py-12">
      <h1 className="text-5xl font-medium leading-none text-dark mb-8">Bienvenue</h1>

      <h2 className="text-3xl font-medium leading-none text-dark mb-6">
        Offres enregistrées
      </h2>
      <PinnedJobs allJobs={allJobs} />

      <h2 className="text-3xl font-medium leading-none text-dark mt-12 mb-6">
        Mes candidatures
      </h2>
      <AppliedJobs allJobs={allJobs} />
    </div>
  );
}
