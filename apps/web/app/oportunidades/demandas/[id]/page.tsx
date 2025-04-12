'use client';

import { useParams } from 'next/navigation';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useGetMatches from '@/api/similarities/use-get-matches';
import { Project } from '@/types/Project';
import { SimilarityMatchType } from '@/types/SimilarityMatch';

export default function MeusMatchesProjetos() {
  const { id } = useParams<{ id: string }>();
  const { data: matches } = useGetMatches(id, SimilarityMatchType.DEMAND);

  return (
    <main className="flex justify-center flex-grow m-8">
      <section className="flex flex-col w-full max-w-7xl pt-12 gap-6">
        <h1 className="font-bold text-2xl text-blue-strong sm:text-4xl">
          Oportunidades
        </h1>

        <div className="bg-white rounded-2xl px-3 py-4 w-[100%]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
                  Demanda
                </TableHead>

                <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
                  Grupo de Pesquisa
                </TableHead>

                <TableHead className="text-blue-strong font-semibold text-lg text-center sm:text-2xl">
                  Similaridade
                </TableHead>

                <TableHead className="text-blue-strong font-semibold text-lg text-center sm:text-2xl">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches?.length ? (
                matches.map((match) => (
                  <TableRow key={match.target.id}>
                    <TableCell className="text-blue-light py-6">
                      {match.target.name}
                    </TableCell>

                    <TableCell className="text-blue-light py-6">
                      {(match.target as Project).researchGroup.name}
                    </TableCell>

                    <TableCell className="text-blue-light py-6 text-center">
                      {(match.score * 100).toFixed(2)}%
                    </TableCell>

                    <TableCell className="text-blue-light text-center">
                      <Link
                        href={`/enviar-proposta/grupo/${(match.target as Project).researchGroup.id}`}
                      >
                        <Button
                          variant="outline"
                          className="px-8 py-2.5 rounded-full"
                        >
                          Fazer proposta
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-blue-light py-6 text-center"
                  >
                    Nenhum match encontrado
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
