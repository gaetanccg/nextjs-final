export interface Job {
  uid: string;
  title: string;
  publishDate: string;
  shortDescription: string;
  longDescription: unknown;
  tags: string[];
  adminEmails: string[];
  expirationDate: string;
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
