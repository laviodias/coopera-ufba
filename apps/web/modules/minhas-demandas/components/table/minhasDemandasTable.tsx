'use client';
import { Button } from '@/components/ui/button';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IoMdCreate } from 'react-icons/io';
import { CustomIcon } from '@/modules/components/icon/customIcon';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { format } from 'date-fns';
import { DeleteModal } from '../modal/deleteModal';
import { Demand, DemandStatusTranslationEnum } from '@/types/Demand';
import { MdOutlineBusinessCenter } from 'react-icons/md';

interface Params {
  data: Demand[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const MinhasDemandasTable = ({ data, onDelete, onEdit }: Params) => {
  const columns: ColumnDef<Demand>[] = [
    {
      accessorKey: 'name',
      header: 'Título',
    },
    {
      accessorKey: 'createdAt',
      header: 'Data de criação',
      cell: ({ row }) => format(row.getValue('createdAt'), 'dd/MM/yyyy'),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) =>
        DemandStatusTranslationEnum[
          row.getValue('status') as keyof typeof DemandStatusTranslationEnum
        ],
    },
    {
      accessorKey: 'projects',
      header: 'Projetos',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="bg-white rounded-2xl px-3 py-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-blue-strong font-semibold text-lg sm:text-2xl"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
              <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl text-center">
                Ações
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell className="text-blue-light py-6" key={cell.id}>
                    {Array.isArray(cell.getValue())
                      ? cell
                          .getValue()
                          .map((item: { name: string }) => item.name)
                          .join(', ')
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant={'ghost'}
                      size={'icon'}
                      title="Ver sugestões de grupos"
                    >
                      <CustomIcon
                        icon={MdOutlineBusinessCenter}
                        className="!size-5"
                      />
                    </Button>
                    <Button
                      variant={'ghost'}
                      size={'icon'}
                      onClick={() => onEdit(row.original.id)}
                      title="Editar"
                    >
                      <CustomIcon icon={IoMdCreate} className="!size-5" />
                    </Button>
                    <DeleteModal
                      onDelete={onDelete}
                      demandId={row.original.id}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhuma demanda cadastrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <GoArrowLeft />
        </Button>
        <div>{table.getPageCount()}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <GoArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default MinhasDemandasTable;
