'use client';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import type { DataTableFeatures } from '@/lib/data-table-features';
import type { User } from '../../api/types';
import { CellAction } from './cell-action';
import { RoleBadges } from './role-badges';

// Sorting and filtering are off: the backend list does not support them yet.
export const columns: ColumnDef<DataTableFeatures, User>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} label='Name' />,
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>{row.original.name}</span>
        <span className='text-muted-foreground text-xs'>{row.original.email}</span>
      </div>
    ),
    meta: { label: 'Name' }
  },
  {
    id: 'roles',
    accessorKey: 'roleIds',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} label='Roles' />,
    cell: ({ row }) => <RoleBadges roleIds={row.original.roleIds} />,
    meta: { label: 'Roles' }
  },
  {
    id: 'status',
    accessorKey: 'disabled',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} label='Status' />,
    cell: ({ row }) => (
      <Badge variant={row.original.disabled ? 'secondary' : 'default'}>
        {row.original.disabled ? 'Disabled' : 'Active'}
      </Badge>
    ),
    meta: { label: 'Status' }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
