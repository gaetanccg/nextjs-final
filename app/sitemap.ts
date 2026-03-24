import type {MetadataRoute} from 'next';
import {getAllJobs, getAllTags} from '@/prismicio';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextjs-final-gaetan.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [jobs, tags] = await Promise.all([getAllJobs(), getAllTags()]);

    const jobPages = jobs.map((job) => ({
        url: `${BASE_URL}/offres/${job.uid}`,
        lastModified: new Date(job.last_publication_date || ''),
    }));

    const tagPages = tags.map((tag) => ({
        url: `${BASE_URL}/tag/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
    }));

    return [
        {url: BASE_URL, lastModified: new Date()},
        {url: `${BASE_URL}/offres`, lastModified: new Date()},
        {url: `${BASE_URL}/profil`, lastModified: new Date()},
        ...jobPages,
        ...tagPages,
    ];
}
