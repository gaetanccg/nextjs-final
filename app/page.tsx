import Image from 'next/image';
import Link from 'next/link';
import {getLatestJobs} from '@/prismicio';
import JobCard from './components/JobCard';

export default async function Home() {
    const jobs = await getLatestJobs(6);

    return (
        <>
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src="/hero.jpg"
                    alt="Bureau"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <section className="px-8 pt-10 pb-2">
                <h1 className="text-5xl font-medium leading-none text-dark pb-4">
                    Nos dernières opportunités
                </h1>
                <div className="h-1 w-1/3 bg-primary" />
                <div className="mt-2 h-px w-full bg-dark/10" />
            </section>

            <section className="px-8 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <JobCard key={job.uid} job={job} />
                    ))}
                </div>
            </section>

            <div className="flex justify-center pb-12">
                <Link
                    href="/offres"
                    className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                    Voir toutes les offres
                </Link>
            </div>
        </>
    );
}
