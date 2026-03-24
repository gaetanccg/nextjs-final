import type {Metadata} from 'next';

const BASE_TITLE = 'DEV - Offres d\'emploi';

export const rootMetadata: Metadata = {
    title: {
        default: BASE_TITLE,
        template: `%s | DEV`,
    },
    description: 'Découvrez les dernières offres d\'emploi tech : React, Next.js, TypeScript et plus encore.',
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        siteName: BASE_TITLE,
    },
};

export const pageMetadata: Record<string, Metadata> = {
    home: {
        title: `Accueil | ${BASE_TITLE}`,
        description: 'Découvrez nos dernières opportunités d\'emploi dans le développement web.',
    },
    offres: {
        title: 'Offres d\'emploi',
        description: 'Parcourez toutes les offres d\'emploi tech disponibles.',
    },
    profil: {
        title: 'Mon profil',
        description: 'Gérez vos offres enregistrées et vos candidatures.',
    },
};

export function jobMetadata(title: string, shortDesc?: string): Metadata {
    return {
        title,
        description: shortDesc || 'Offre d\'emploi sur DEV',
    };
}

export function tagMetadata(tag: string): Metadata {
    return {
        title: `Offres ${tag}`,
        description: `Toutes les offres d'emploi associées à ${tag}.`,
    };
}
