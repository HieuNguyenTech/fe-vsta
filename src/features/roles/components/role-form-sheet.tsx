'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { FieldError, FieldGroup } from '@/components/ui/field';
import { LoadingButton } from '@/components/ui/loading-button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useAuth } from '@/features/auth/components/auth-provider';
import { PERMISSIONS } from '@/features/auth/permissions';
import { useAppForm } from '@/lib/form';
import { roleMutations, roleQueries } from '../api/queries';
import type { Role } from '../api/types';
import { roleSchema, type RoleFormValues } from '../schemas/role';

interface RoleFormSheetProps {
  role?: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoleFormSheet({ role, open, onOpenChange }: RoleFormSheetProps) {
  const isEdit = !!role;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { can } = useAuth();
  const permissions = useQuery({ ...roleQueries.permissions(), enabled: open });

  const handlers = {
    onSuccess: () => {
      toast.success(isEdit ? 'Role updated' : 'Role created');
      close();
      // The change may affect the signed-in user's own permissions.
      router.refresh();
    },
    onError: (error: Error) => toast.error(error.message),
    onSettled: () => queryClient.invalidateQueries({ queryKey: roleQueries.all() })
  };
  const createMutation = useMutation({ ...roleMutations.create(), ...handlers });
  const updateMutation = useMutation({ ...roleMutations.update(), ...handlers });

  const form = useAppForm({
    defaultValues: {
      name: role?.name ?? '',
      slug: role?.slug ?? '',
      permissions: role?.permissions ?? []
    } as RoleFormValues,
    validators: { onSubmit: roleSchema },
    onSubmit: ({ value }) => {
      const { name, slug, permissions: granted } = value;
      if (role) {
        updateMutation.mutate({ id: role.id, values: { name, permissions: granted } });
      } else {
        createMutation.mutate({ name, slug, permissions: granted });
      }
    }
  });

  function close() {
    onOpenChange(false);
    form.reset();
  }

  const isPending = createMutation.isPending || updateMutation.isPending;
  const formId = `role-form-${role?.id ?? 'new'}`;

  return (
    <Sheet open={open} onOpenChange={(next) => (next ? onOpenChange(true) : close())}>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit Role' : 'New Role'}</SheetTitle>
          <SheetDescription>Choose what users with this role can do.</SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form
            id={formId}
            className='space-y-4 p-4'
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.AppField
                name='name'
                children={(field) => <field.TextField label='Name' required />}
              />
              <form.AppField
                name='slug'
                children={(field) => (
                  <field.TextField
                    label='Slug'
                    required
                    disabled={isEdit}
                    placeholder='content-editor'
                    description='Cannot be changed later.'
                  />
                )}
              />
              <form.AppField
                name='permissions'
                mode='array'
                children={(field) => (
                  <field.CheckboxGroupField
                    label='Permissions'
                    options={(permissions.data ?? []).map((permission) => ({
                      value: permission,
                      label: permission,
                      disabled: !can(permission)
                    }))}
                  />
                )}
              />
              {permissions.error && <FieldError>{permissions.error.message}</FieldError>}
            </FieldGroup>
          </form>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={close}>
            Cancel
          </Button>
          <LoadingButton loading={isPending} type='submit' form={formId}>
            {isEdit ? 'Update Role' : 'Create Role'}
          </LoadingButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function RoleFormSheetTrigger() {
  const [open, setOpen] = useState(false);
  const { can } = useAuth();
  if (!can(PERMISSIONS.roleManage)) return null;

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' /> Add Role
      </Button>
      <RoleFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
