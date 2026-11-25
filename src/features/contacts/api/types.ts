export type ContactStatus = 'new' | 'in_progress' | 'resolved';

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  note?: string;
  createdAt: string;
  updatedAt: string;
};

export type ContactFilters = { page: number; limit: number };
