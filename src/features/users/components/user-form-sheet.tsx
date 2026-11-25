'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { roleQueries } from '@/features/roles/api/queries';
import { canGrant } from '@/features/roles/can-grant';
import { useAppForm } from '@/lib/form';
import { userMutations, userQueries } from '../api/queries';
import type { User } from '../api/types';
import { getUserSchema, type UserFormValues } from '../schemas/user';

interface UserFormSheetProps {
  user?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sameItems = (a: string[], b: string[]) =>
  a.length === b.length && a.every((item) => b.includes(item));

export function UserFormSheet({ user, open, onOpenChange }: UserFormSheetProps) {
  const isEdit = !!user;
  const queryClient = useQueryClient();
  const { user: actor, can } = useAuth();
  const canReadRoles = can(PERMISSIONS.roleRead);
  const roles = useQuery({ ...roleQueries.list(), enabled: open && canReadRoles });

  const handlers = {
    onSuccess: () => {
      toast.success(isEdit ? 'User updated' : 'User created');
      close();
    },
    onError: (error: Error) => toast.error(error.message),
    onSettled: () => queryClient.invalidateQueries({ queryKey: userQueries.all() })
  };
  const createMutation = useMutation({ ...userMutations.create(), ...handlers });
  const updateMutation = useMutation({ ...userMutations.update(), ...handlers });

  const form = useAppForm({
    defaultValues: {
      email: user?.email ?? '',
      name: user?.name ?? '',
      password: '',
      roleIds: user?.roleIds ?? [],
      disabled: user?.disabled ?? false
    } as UserFormValues,
    validators: {
      onSubmit: getUserSchema(isEdit)
    },
    onSubmit: ({ value }) => {
      const { email, password, roleIds, disabled } = value;
      const name = value.name.trim();

      if (!user) {
        createMutation.mutate({ email, name, password, roleIds });
        return;
      }

      const details = {
        ...(name !== user.name && { name }),
        ...(password && { password }),
        ...(disabled !== user.disabled && { disabled })
      };
      updateMutation.mutate({
        id: user.id,
        changes: {
          ...(Object.keys(details).length > 0 && { details }),
          ...(!sameItems(roleIds, user.roleIds) && { roleIds })
        }
      });
    }
  });

  function close() {
    onOpenChange(false);
    form.reset();
  }

  const isPending = createMutation.isPending || updateMutation.isPending;
  const formId = `user-form-${user?.id ?? 'new'}`;

  return (
    <Sheet open={open} onOpenChange={(next) => (next ? onOpenChange(true) : close())}>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Edit User' : 'New User'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Update the user details below.'
              : 'Fill in the details to create a new user.'}
          </SheetDescription>
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
                name='email'
                children={(field) => (
                  <field.TextField label='Email' type='email' required disabled={isEdit} />
                )}
              />
              <form.AppField
                name='password'
                children={(field) => (
                  <field.TextField
                    label={isEdit ? 'New password' : 'Password'}
                    type='password'
                    autoComplete='new-password'
                    required={!isEdit}
                    description={
                      isEdit
                        ? 'Leave empty to keep the current password.'
                        : 'At least 12 characters.'
                    }
                  />
                )}
              />

              {canReadRoles && (
                <form.AppField
                  name='roleIds'
                  mode='array'
                  children={(field) => (
                    <field.CheckboxGroupField
                      label='Roles'
                      options={(roles.data ?? []).map((role) => ({
                        value: role.id,
                        label: role.name,
                        disabled: !canGrant(actor, role)
                      }))}
                    />
                  )}
                />
              )}
              {roles.error && <FieldError>{roles.error.message}</FieldError>}

              {isEdit && (
                <form.AppField
                  name='disabled'
                  children={(field) => (
                    <field.SwitchField
                      label='Disabled'
                      description='A disabled user cannot sign in.'
                    />
                  )}
                />
              )}
            </FieldGroup>
          </form>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={close}>
            Cancel
          </Button>
          <LoadingButton loading={isPending} type='submit' form={formId}>
            {isEdit ? 'Update User' : 'Create User'}
          </LoadingButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function UserFormSheetTrigger() {
  const [open, setOpen] = useState(false);
  const { can } = useAuth();
  if (!can(PERMISSIONS.userManage)) return null;

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' /> Add User
      </Button>
      <UserFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
