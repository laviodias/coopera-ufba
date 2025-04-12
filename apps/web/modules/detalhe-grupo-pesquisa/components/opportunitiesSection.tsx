import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';

import React from 'react';
import useGetMatches from '@/api/similarities/use-get-matches';
import { SimilarityMatchType } from '@/types/SimilarityMatch';
import { Demand } from '@/types/Demand';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type TProps = {
  researchGroupId: string;
};

export default function OpportunitiesSection(props: TProps) {
  const { data: matches } = useGetMatches(
    props.researchGroupId,
    SimilarityMatchType.GROUP,
  );
  console.log('matches', matches);
  return (
    <div className="bg-white rounded-2xl px-3 py-4 w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Demanda
            </TableHead>

            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Empresa
            </TableHead>

            <TableHead className="text-blue-strong font-semibold text-lg text-center sm:text-2xl">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches?.length ? (
            matches.map((opportunity) => {
              return (
                <TableRow key={opportunity.id}>
                  <TableCell className="text-blue-light py-6">
                    {opportunity.target.name}
                  </TableCell>

                  <TableCell className="text-blue-light py-6">
                    {(opportunity.target as Demand).company.user.name}
                  </TableCell>

                  <TableCell className="text-blue-light py-6 text-center">
                    <Link
                      href={`/detalhe-demandas/${(opportunity.target as Demand).id}`}
                    >
                      <Button className="rounded-full" variant={'outline'}>
                        Entrar em contato
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                className="text-blue-light py-6 text-centerT"
                colSpan={2}
              >
                Nenhuma oportunidade encontrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
