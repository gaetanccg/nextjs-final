import Image from 'next/image';
import Link from 'next/link';
import {getLatestJobs, getAllTags} from '@/prismicio';
import JobCard from './components/JobCard';
import Tag from './components/Tag';

export default async function Home() {
    const [jobs, tags] = await Promise.all([getLatestJobs(6), getAllTags()]);

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
                <div className="h-px bg-dark/10" />
            </section>

            <section className="px-8 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <JobCard key={job.uid} job={job} />
                    ))}
                </div>
            </section>

            <div className="flex justify-center pb-8">
                <Link
                    href="/offres"
                    className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                    Voir toutes les offres
                </Link>
            </div>

            {tags.length > 0 && (
                <section className="px-8 pb-12">
                    <h2 className="text-3xl font-medium leading-none text-dark mb-6">
                        Explorer par tag
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {tags.map((tag) => (
                            <Tag key={tag} label={tag} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
