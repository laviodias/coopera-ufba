'use client';

import useGetMyProjects from '@/api/projects/use-get-my-projects';
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

function MeusMatchesPesquisador() {
  const { data: projects } = useGetMyProjects();

  return (
    <main className="flex justify-center flex-grow m-8">
      <section className="flex flex-col w-full max-w-7xl pt-12 gap-6">
        <h1 className="font-bold text-2xl text-blue-strong sm:text-4xl">
          Projetos
        </h1>

        <div className="bg-white rounded-2xl px-3 py-4 w-[100%]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
                  Nome
                </TableHead>

                <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
                  Grupo de Pesquisa
                </TableHead>

                <TableHead className="text-blue-strong font-semibold text-lg text-center sm:text-2xl">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="text-blue-light py-6 flex gap-2 items-center">
                      {project.name}
                    </TableCell>
                    <TableCell className="text-blue-light py-6">
                      {project.researchGroup.name}
                    </TableCell>
                    <TableCell className="text-blue-light text-center">
                      <Link
                        href={{
                          pathname: `/meus-matches/projetos/${project.id}`,
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
                    Nenhum projeto encontrado
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

export default MeusMatchesPesquisador;
