'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { AlertModal } from '@/components/modal/alert-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useAuth } from '@/features/auth/components/auth-provider';
import { PERMISSIONS } from '@/features/auth/permissions';
import { roleMutations, roleQueries } from '../api/queries';
import type { Role } from '../api/types';
import { canGrant } from '../can-grant';
import { RoleFormSheet } from './role-form-sheet';

export function RolesTable() {
  const roles = useQuery(roleQueries.list());

  if (roles.isPending) return <Skeleton className='h-64 w-full' />;
  if (roles.error) return <p role='alert'>{roles.error.message}</p>;

  return (
    <div className='overflow-x-auto rounded-lg border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead className='w-24 text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.data.map((role) => (
            <RoleRow key={role.id} role={role} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RoleRow({ role }: { role: Role }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const queryClient = useQueryClient();
  const { user, can } = useAuth();
  const editable = !role.isSystem && can(PERMISSIONS.roleManage) && canGrant(user, role);

  const deleteMutation = useMutation({
    ...roleMutations.delete(),
    onSuccess: () => toast.success('Role deleted'),
    onError: (error) => toast.error(error.message),
    onSettled: () => {
      setDeleteOpen(false);
      return queryClient.invalidateQueries({ queryKey: roleQueries.all() });
    }
  });

  return (
    <TableRow>
      <TableCell>
        <div className='flex flex-col'>
          <span className='font-medium'>
            {role.name} {role.isSystem && <Badge variant='secondary'>System</Badge>}
          </span>
          <span className='text-muted-foreground text-xs'>{role.slug}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex flex-wrap gap-1'>
          {role.permissions.length === 0 && (
            <span className='text-muted-foreground text-xs'>None</span>
          )}
          {role.permissions.map((permission) => (
            <Badge key={permission} variant='outline'>
              {permission}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className='text-right'>
        {editable && (
          <>
            <Button
              variant='ghost'
              size='icon'
              aria-label={`Edit ${role.name}`}
              onClick={() => setEditOpen(true)}
            >
              <Icons.edit className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              aria-label={`Delete ${role.name}`}
              onClick={() => setDeleteOpen(true)}
            >
              <Icons.trash className='h-4 w-4' />
            </Button>
            <RoleFormSheet role={role} open={editOpen} onOpenChange={setEditOpen} />
            <AlertModal
              isOpen={deleteOpen}
              onClose={() => setDeleteOpen(false)}
              onConfirm={() => deleteMutation.mutate(role.id)}
              loading={deleteMutation.isPending}
            />
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
