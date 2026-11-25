import PageContainer from '@/components/layout/page-container';
import { PERMISSIONS } from '@/features/auth/permissions';
import { canAccess } from '@/features/auth/server/current-user';
import { ContactsTable } from '@/features/contacts/components/contacts-table';

export const metadata = { title: 'Dashboard: Contacts' };

export default async function ContactsPage() {
  const access = await canAccess(PERMISSIONS.contactRead);
  return (
    <PageContainer
      access={access}
      pageTitle='Contacts'
      pageDescription='Quản lý các yêu cầu liên hệ từ website.'
    >
      <ContactsTable />
    </PageContainer>
  );
}
