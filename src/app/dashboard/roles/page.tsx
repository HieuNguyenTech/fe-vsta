import PageContainer from '@/components/layout/page-container';
import { PERMISSIONS } from '@/features/auth/permissions';
import { canAccess } from '@/features/auth/server/current-user';
import { RoleFormSheetTrigger } from '@/features/roles/components/role-form-sheet';
import { RolesTable } from '@/features/roles/components/roles-table';

export const metadata = {
  title: 'Dashboard: Roles'
};

export default async function RolesPage() {
  const access = await canAccess(PERMISSIONS.roleRead);

  return (
    <PageContainer
      access={access}
      pageTitle='Roles'
      pageDescription='Manage roles and their permissions.'
      pageHeaderAction={access && <RoleFormSheetTrigger />}
    >
      <RolesTable />
    </PageContainer>
  );
}
