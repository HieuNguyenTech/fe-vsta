'use client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/features/auth/components/auth-provider';
import { PERMISSIONS } from '@/features/auth/permissions';
import { roleQueries } from '@/features/roles/api/queries';

export function RoleBadges({ roleIds }: { roleIds: string[] }) {
  const { can } = useAuth();
  const canReadRoles = can(PERMISSIONS.roleRead);
  const roles = useQuery({ ...roleQueries.list(), enabled: canReadRoles });

  if (roleIds.length === 0) return <span className='text-muted-foreground text-xs'>None</span>;
  // Role names need the role:read permission.
  if (!canReadRoles) return <Badge variant='outline'>{roleIds.length} assigned</Badge>;

  return (
    <div className='flex flex-wrap gap-1'>
      {roles.data
        ?.filter((role) => roleIds.includes(role.id))
        .map((role) => (
          <Badge key={role.id} variant='outline'>
            {role.name}
          </Badge>
        ))}
    </div>
  );
}
