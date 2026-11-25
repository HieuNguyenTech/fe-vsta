import PageContainer from '@/components/layout/page-container';
import { PERMISSIONS } from '@/features/auth/permissions';
import { canAccess } from '@/features/auth/server/current-user';
import { UserFormSheetTrigger } from '@/features/users/components/user-form-sheet';
import { UsersTable } from '@/features/users/components/users-table';

export const metadata = {
  title: 'Dashboard: Users'
};

export default async function UsersPage() {
  const access = await canAccess(PERMISSIONS.userRead);

  return (
    <PageContainer
      access={access}
      pageTitle='Users'
      pageDescription='Manage accounts and their roles.'
      pageHeaderAction={access && <UserFormSheetTrigger />}
    >
      <UsersTable />
    </PageContainer>
  );
}
