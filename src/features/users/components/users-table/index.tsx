'use client';

import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { userQueries } from '../../api/queries';
import { columns } from './columns';

/** The backend rejects larger pages. */
const MAX_PAGE_SIZE = 100;

export function UsersTable() {
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10)
  });

  const { data, error } = useQuery(
    userQueries.list({
      page: Math.max(params.page, 1),
      limit: Math.min(Math.max(params.perPage, 1), MAX_PAGE_SIZE)
    })
  );

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns,
    pageCount: data?.meta.totalPages ?? -1,
    shallow: true,
    initialState: {
      columnPinning: { start: [], end: ['actions'] }
    }
  });

  if (error) return <p role='alert'>{error.message}</p>;
  if (!data) return <DataTableSkeleton columnCount={4} rowCount={10} filterCount={0} />;

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
