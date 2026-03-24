import type { RichTextField } from '@prismicio/client';

export interface JobData {
  title: RichTextField;
  publication_date: string;
  short_desc: string;
  long_desc: RichTextField;
  tags: { tag: string }[];
  admin_emails: { email: string }[];
  expiration_date: string;
}

export interface User {
  pinnedJobIds: string[];
}

export interface ApplicationForm {
  jobId: string;
  message: string;
}

export interface AdminEmail {
  to: string[];
  subject: string;
  body: string;
  jobTitle: string;
}
