import type {Metadata} from 'next';
import {getJobByUID} from '@/prismicio';
import {asText} from '@prismicio/client';
import {PrismicText, PrismicRichText} from '@prismicio/react';
import Image from 'next/image';
import type {JobData} from '@/app/types';
import Tag from '@/app/components/Tag';
import BookmarkButton from '@/app/components/BookmarkButton';
import ApplicationForm from '@/app/components/ApplicationForm';
import BackButton from '@/app/components/BackButton';
import {notFound} from 'next/navigation';
import {jobMetadata} from '@/app/metadata';

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params;
    try {
        const job = await getJobByUID(slug);
        const data = job.data as unknown as JobData;
        return jobMetadata(asText(data.title), data.short_desc);
    } catch {
        return {title: 'Offre introuvable'};
    }
}

export default async function SingleJobPage({
                                                params,
                                            }: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;

    let job;
    try {
        job = await getJobByUID(slug);
    } catch {
        notFound();
    }

    const data = job.data as unknown as JobData;
    const adminEmails = data.admin_emails?.map((e) => e.email).filter(Boolean) ?? [];

    return (
        <div className="px-8 py-12 max-w-4xl mx-auto">
            <BackButton />

            <div className="flex items-start justify-between mb-2">
                <div>
                    <h1 className="text-5xl font-medium leading-tight text-dark pb-4">
                        <PrismicText field={data.title} />
                    </h1>
                    <div className="h-1 w-48 bg-primary" />
                    <div className="h-px w-full bg-dark/10" />
                </div>
                <BookmarkButton jobId={job.uid!} />
            </div>

            <div className="flex items-center gap-2 mt-6 mb-4">
                <Image src="/icons/calendar.svg" alt="" width={16} height={16} />
                <span className="text-sm font-medium text-primary">
          {data.publication_date
              ? new Date(data.publication_date).toLocaleDateString('fr-FR')
              : '—'}
        </span>
            </div>

            {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    {data.tags.map((t, i) => (
                        <Tag key={i} label={t.tag} />
                    ))}
                </div>
            )}

            <div className="prose prose-lg max-w-none mb-12 text-dark/80">
                <PrismicRichText field={data.long_desc} />
            </div>

            {adminEmails.length > 0 && (
                <section className="border-t border-dark/10 pt-8">
                    <h2 className="text-3xl font-medium leading-none text-dark mb-6">Postuler</h2>
                    <ApplicationForm jobId={job.uid!} adminEmails={adminEmails} />
                </section>
            )}
        </div>
    );
}
