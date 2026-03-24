import {
    createClient as baseCreateClient,
    type ClientConfig,
    type Route,
} from '@prismicio/client';
import {enableAutoPreviews} from '@prismicio/next';
import sm from './slicemachine.config.json';
import type {JobData} from '@/app/types';

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

const routes: Route[] = [
    {type: 'job', path: '/offres/:uid'},
];

export const createClient = (config: ClientConfig = {}) => {
    const client = baseCreateClient(repositoryName, {
        routes,
        fetchOptions:
            process.env.NODE_ENV === 'production'
                ? {next: {tags: ['prismic']}, cache: 'force-cache'}
                : {next: {revalidate: 5}},
        ...config,
    });

    enableAutoPreviews({client});

    return client;
};

export async function getAllJobs() {
    const client = createClient();
    return client.getAllByType('job', {
        orderings: [{field: 'my.job.publication_date', direction: 'desc'}],
    });
}

export async function getLatestJobs(limit: number = 6) {
    const client = createClient();
    return client.getAllByType('job', {
        orderings: [{field: 'my.job.publication_date', direction: 'desc'}],
        limit,
    });
}

export async function getJobByUID(uid: string) {
    const client = createClient();
    return client.getByUID('job', uid);
}

export async function getJobsByTag(tag: string) {
    const client = createClient();
    const allJobs = await client.getAllByType('job', {
        orderings: [{field: 'my.job.publication_date', direction: 'desc'}],
    });

    return allJobs.filter((job) => {
        const data = job.data as unknown as JobData;
        return data.tags?.some(
            (t) => t.tag?.toLowerCase() === tag.toLowerCase()
        );
    });
}

export async function getAllTags(): Promise<string[]> {
    const allJobs = await getAllJobs();
    const tagsSet = new Set<string>();

    allJobs.forEach((job) => {
        const data = job.data as unknown as JobData;
        data.tags?.forEach((t) => {
            if (t.tag) tagsSet.add(t.tag);
        });
    });

    return Array.from(tagsSet);
}

export async function getJobsPaginated(page: number = 1, pageSize: number = 6) {
    const client = createClient();
    return client.getByType('job', {
        orderings: [{field: 'my.job.publication_date', direction: 'desc'}],
        page,
        pageSize,
    });
}
