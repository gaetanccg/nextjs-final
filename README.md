# DEV - Offres d'emploi

Mini-application de gestion d'offres d'emploi, TP de fin de matiere Ynov.

## Lancer le projet

```bash
# Installer les dependances
npm install

# Lancer le serveur de dev
npm run dev

# Lancer Slice Machine (gestion du contenu Prismic)
npm run slicemachine
```

Le site est accessible sur `http://localhost:3000`, Slice Machine sur `http://localhost:9999`.

### Variables d'environnement

Creer un fichier `.env.local` a la racine :

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
SMTP_FROM=email@gmail.com
```

### Autres commandes

```bash
npm run build     # Build de production
npm run lint      # Linting ESLint
npm run format    # Formatage Prettier
```

## Stack technique

| Technologie | Utilisation |
|---|---|
| **Next.js 16** (App Router) | Framework principal, routing, Server Components, Server Actions |
| **TypeScript** | Typage global (interfaces `JobData`, `User`, `ApplicationForm`, `AdminEmail`) |
| **Tailwind CSS 4** | Stylisation de toutes les pages et composants |
| **Prismic** (via Slice Machine) | CMS headless pour administrer les offres d'emploi |
| **Zustand** | State management client : favoris (bookmarks) et candidatures, persistance localStorage |
| **Nodemailer** | Envoi d'emails de candidature via Server Action (SMTP Gmail) |
| **MDX** | Page mentions legales ecrite en Markdown, rendue avec composants custom |

## Fonctionnalites Next.js utilisees

| Fonctionnalite | Ou |
|---|---|
| **App Router** | Structure `app/` avec routes dynamiques (`[slug]`, `[tag]`) |
| **Server Components** | Pages, `JobCard`, `Tag`, `Pagination`, `PageHeader` |
| **Client Components** | `BookmarkButton`, `ApplicationForm`, `PinnedJobs`, `AppliedJobs`, `BackButton` |
| **Server Actions** | `app/actions/sendEmail.ts` — envoi d'email cote serveur |
| **generateMetadata** | Metadata dynamiques sur `/offres/[slug]` et `/tag/[tag]` |
| **Metadata centralisees** | `app/metadata.ts` — config SEO unique importee par chaque page |
| **Route Sitemap** | `app/sitemap.ts` — sitemap XML dynamique avec toutes les offres et tags |
| **Route Robots** | `app/robots.ts` — fichier robots.txt genere |
| **loading.tsx** | Spinner affiche pendant le chargement des pages |
| **next/image** | Optimisation des images (hero, icones) |
| **next/font** | Police Inter chargee via Google Fonts |
| **MDX** | Support Markdown pour les pages de contenu statique |

## Structure du projet

```
app/
├── actions/           # Server Actions (envoi email)
├── components/        # Composants reutilisables
├── store/             # Stores Zustand (bookmarks, candidatures)
├── types/             # Interfaces TypeScript
├── metadata.ts        # Configuration SEO centralisee
├── loading.tsx        # Loader global
├── sitemap.ts         # Sitemap dynamique
├── robots.ts          # Robots.txt
├── page.tsx           # Homepage
├── offres/            # Liste paginee + page detail [slug]
├── tag/[tag]/         # Filtrage par technologie
├── profil/            # Offres enregistrees + candidatures
└── mentions-legales/  # Page MDX
customtypes/job/       # Definition du custom type Prismic
prismicio.ts           # Client Prismic + fonctions de recuperation
```
