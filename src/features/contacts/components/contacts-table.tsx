'use client';

import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { useDataTable } from '@/hooks/use-data-table';
import type { DataTableFeatures } from '@/lib/data-table-features';
import { contactQueries } from '../api/queries';
import type { Contact } from '../api/types';
import type { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<DataTableFeatures, Contact>[] = [
  { accessorKey: 'name', header: 'Họ và tên' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'subject', header: 'Chủ đề' },
  { accessorKey: 'company', header: 'Đơn vị' },
  { accessorKey: 'status', header: 'Trạng thái' },
  {
    accessorKey: 'createdAt',
    header: 'Ngày gửi',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString('vi-VN')
  }
];

export function ContactsTable() {
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10)
  });
  const { data, error } = useQuery(
    contactQueries.list({ page: params.page, limit: params.perPage })
  );
  const { table } = useDataTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.meta.totalPages ?? -1,
    shallow: true
  });

  if (error) return <p role='alert'>{error.message}</p>;
  if (!data) return <DataTableSkeleton columnCount={6} rowCount={10} filterCount={0} />;
  return <DataTable table={table} />;
}
