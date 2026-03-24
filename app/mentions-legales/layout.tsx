import type {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Mentions légales',
    description: 'Mentions légales du site DEV - Offres d\'emploi.',
};

export default function MentionsLegalesLayout({children}: { children: React.ReactNode }) {
    return <div className="px-8 py-12 max-w-3xl mx-auto">{children}</div>;
}
