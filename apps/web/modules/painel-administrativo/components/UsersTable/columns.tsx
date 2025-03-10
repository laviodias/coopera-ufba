import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { EditModal } from './edit-modal';
import { User } from '@/types/User';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        className="font-bold text-xl"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nome
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        className="font-bold text-xl"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          className="font-bold text-xl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Papel
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label =
        row.getValue('role') === 'ADMIN' ? 'Administrador' : 'Usuário';
      return <div className="capitalize">{label}</div>;
    },
  },
  {
    accessorKey: 'utype',
    header: ({ column }) => {
      return (
        <Button
          className="font-bold text-xl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tipo
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const utype = row.getValue('utype');
      const label =
        utype === 'RESEARCHER'
          ? 'Pesquisador'
          : utype === 'COMPANY'
            ? 'Empresa'
            : 'Nenhum';

      return <div className="capitalize">{label}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          className="font-bold text-xl"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue('status');
      const label =
        status === 'APPROVED'
          ? 'Aprovado'
          : status === 'BLOCKED'
            ? 'Bloqueado'
            : 'Pendente';

      return <div className="capitalize">{label}</div>;
    },
  },
  {
    id: 'actions',
    header: () => (
      <div className="text-blue-light font-bold text-xl">Ações</div>
    ),
    cell: ({ row }) => {
      const { original } = row;
      return <EditModal {...original} />;
    },
  },
];

export { columns };
