'use client';

import useGetMyDemands from '@/api/demandas/use-get-my-demands';
import { Button } from '@/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import Link from 'next/link';

function MeusMatchesEmpresa() {
  const { data: demands } = useGetMyDemands();

  return (
    <main className="flex justify-center flex-grow m-8">
      <section className="flex flex-col w-full max-w-7xl pt-12 gap-6">
        <h1 className="font-bold text-2xl text-blue-strong sm:text-4xl">
          Demandas
        </h1>

        <div className="bg-white rounded-2xl px-3 py-4 w-[100%]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
                  Nome
                </TableHead>

                <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
                  Status
                </TableHead>

                <TableHead className="text-blue-strong font-semibold text-lg text-center sm:text-2xl">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demands ? (
                demands.map((demand) => (
                  <TableRow key={demand.id}>
                    <TableCell className="text-blue-light py-6 flex gap-2 items-center">
                      {demand.name}
                    </TableCell>
                    <TableCell className="text-blue-light py-6">
                      {demand.status}
                    </TableCell>
                    <TableCell className="text-blue-light text-center">
                      <Link
                        href={{
                          pathname: `/meus-matches/demandas/${demand.id}`,
                        }}
                      >
                        <Button
                          variant="outline"
                          className="px-8 py-2.5 rounded-full"
                        >
                          Ver matches
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-blue-light py-6 flex gap-2 items-center">
                    Nenhuma demanda encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}

export default MeusMatchesEmpresa;
