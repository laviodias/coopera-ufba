import useGetResearchGroupMembers from '@/api/research-group/use-get-members';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { Trash2Icon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { translateResearchType } from '../shared/utils/translateReasearchType.util';
import { Input } from '@/components/ui/input';
import useResearchGroupAddMember from '@/api/research-group/use-add-member';
import useResearchGroupRemoveMember from '@/api/research-group/use-remove-member';
import { useToast } from '@/hooks/use-toast';

interface Props {
  groupId: string;
  onCloseModal: () => void;
}

export const GerenciarMembrosModal = ({ groupId, onCloseModal }: Props) => {
  const [userEmail, setUserEmail] = useState('');
  const { toast } = useToast();

  const { data: currentMembers } = useGetResearchGroupMembers(groupId);
  const { mutate: mutateAddMember } = useResearchGroupAddMember(
    groupId,
    () => toast({ title: 'Membro adicionado com sucesso', variant: 'success' }),
    () => toast({ title: 'Erro ao adicionar membro', variant: 'destructive' }),
  );
  const { mutate: mutateRemoveMember } = useResearchGroupRemoveMember(
    groupId,
    () => toast({ title: 'Membro removido com sucesso', variant: 'success' }),
    () => toast({ title: 'Erro ao remover membro', variant: 'destructive' }),
  );

  function onAddMember() {
    if (!userEmail) return;

    mutateAddMember(userEmail);
  }

  function onRemoveMember(memberId: string) {
    mutateRemoveMember(memberId);
  }

  return (
    <Dialog open={true} onOpenChange={onCloseModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex justify-between">
          <DialogTitle className="text-2xl font-semibold">
            Gerenciar membros do grupo de pesquisa
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-strong font-semibold sm:text-lg">
                  Nome
                </TableHead>
                <TableHead className="text-blue-strong font-semibold sm:text-lg">
                  Papel
                </TableHead>
                <TableHead className="text-blue-strong font-semibold sm:text-lg">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMembers?.map((member) => {
                return (
                  <TableRow key={member.user.id}>
                    <TableCell className="text-blue-light py-6 flex gap-2 items-center">
                      {member.user.name}
                    </TableCell>
                    <TableCell className="text-blue-light py-6">
                      {translateResearchType(member.researcherType)}
                    </TableCell>
                    <TableCell className="text-blue-light py-6 flex">
                      <Trash2Icon
                        className="cursor-pointer"
                        onClick={() => onRemoveMember(member.userId)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </DialogDescription>
        <DialogFooter>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <Button onClick={onAddMember}>Adicionar membro</Button>
        </DialogFooter>
        <XIcon
          onClick={onCloseModal}
          className="absolute right-0 cursor-pointer"
        />
      </DialogContent>
    </Dialog>
  );
};
