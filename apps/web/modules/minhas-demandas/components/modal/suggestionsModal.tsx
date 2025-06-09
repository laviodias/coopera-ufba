import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { useState } from 'react';
import { CustomIcon } from '@/modules/components/icon/customIcon';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import useGetMatches from '@/api/similarities/use-get-matches';
import { SimilarityMatchType } from '@/types/SimilarityMatch';
import { ResearchGroup } from '@/types/ResearchGroup';
import Link from 'next/link';

interface Props {
  demandId: string;
}

export const SuggestionsModal = ({ demandId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: matches } = useGetMatches(
    demandId,
    SimilarityMatchType.DEMAND,
  );

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-strong">
            Sugestões de Grupos de Pesquisa
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-blue-strong font-semibold text-lg">
                      Grupo de Pesquisa
                    </TableHead>
                    <TableHead className="text-blue-strong font-semibold text-lg">
                      Líder
                    </TableHead>
                    <TableHead className="text-blue-strong font-semibold text-lg text-center">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches?.length ? (
                    matches.map((match) => {
                      const group = match.target as ResearchGroup;
                      return (
                        <TableRow key={match.id}>
                          <TableCell className="text-blue-light py-6">
                            <div>
                              <div className="font-semibold">{group.name}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {group.description?.substring(0, 100)}
                                {group.description && group.description.length > 100 && '...'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-blue-light py-6">
                            {group.leader?.user?.name || 'Não informado'}
                          </TableCell>
                          <TableCell className="text-blue-light py-6 text-center">
                            <Link
                              href={`/enviar-proposta/grupo/${group.id}`}
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
                        className="text-blue-light py-6 text-center"
                        colSpan={4}
                      >
                        Nenhuma sugestão de grupo encontrada
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}; 