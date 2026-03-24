import type { RichTextField } from '@prismicio/client';

// Données Prismic d'un Job (champs data)
export interface JobData {
  title: RichTextField;
  publication_date: string;
  short_desc: string;
  long_desc: RichTextField;
  tags: { tag: string }[];
  admin_emails: { email: string }[];
  expiration_date: string;
}

// Utilisateur (localStorage)
export interface User {
  pinnedJobIds: string[];
}

// Formulaire de candidature
export interface ApplicationForm {
  jobId: string;
  message: string;
}

// Config email admin
export interface AdminEmail {
  to: string[];
  subject: string;
  body: string;
  jobTitle: string;
}
