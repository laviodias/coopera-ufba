'use client';

import { Button } from '@/components/ui/button';
import { PiArrowBendDoubleUpLeft } from 'react-icons/pi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import useSendMail from '@/api/demandas/use-send-email';
import { useToast } from '@/hooks/use-toast';
import useGetMyResearchGroups from '@/api/research-group/use-get-my-research-group';
import { useUser } from '@/context/UserContext';
import useSendNotification from '@/api/notifications/use-send-notifications';
import useGetDemand from '@/api/demandas/use-get-demand';
import { Project } from '@/types/Project';
import { Keyword } from '@/types/Keyword';
import { ResearchGroup } from '@/types/ResearchGroup';
import { CustomIcon } from '@/modules/components/icon/customIcon';
import { useRouter } from 'next/navigation';

interface ContactCompanyProps {
  id: string;
}

const ContactCompany = ({ id }: ContactCompanyProps) => {
  const { data: demand } = useGetDemand(id);
  const [message, setMessage] = useState<string>('');
  const [myResearchGroups, setMyResearchGroups] = useState<ResearchGroup[]>([]);
  const { user } = useUser();
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  const router = useRouter();

  const { mutate: mutateNotification } = useSendNotification();
  function sendNotification() {
    if (!demand) return;

    const receiverId = demand.company.user.id;
    const message = `Você recebeu uma proposta de ${user?.name} do grupo "${selectedGroup}" para a demanda "${demand.name}". Cheque seu e-mail para mais informações.`;

    mutateNotification({
      userId: receiverId,
      message,
    });
  }

  const { toast } = useToast();

  const { mutate } = useSendMail(
    () => {
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'O email foi enviado com sucesso.',
      });
      sendNotification();
    },
    () => {
      toast({
        variant: 'destructive',
        title: 'Ocorreu um error',
        description: 'Ocorreu um erro ao tentar enviar o email.',
      });
    },
  );

  const { data: myResearchGroup } = useGetMyResearchGroups('', 'asc');
  useEffect(() => {
    if (myResearchGroup) {
      const groupsAsMember = myResearchGroup.groupsAsMember || [];
      const groupsAsLeader = myResearchGroup.groupsAsLeader || [];
      const allGroups = groupsAsMember.concat(groupsAsLeader);
      setMyResearchGroups(allGroups);
    }
  }, [myResearchGroup]);

  const handleSubmitSendMail = () => {
    if (demand)
      mutate({
        message: message,
        research_group: selectedGroup,
        companyId: demand.company.user.id,
      });
  };

  return (
    <main className="p-8 w-full flex flex-col flex-grow items-center">
      <section className="max-w-7xl itens-center w-full flex flex-col">
        <div className="flex flex-col sm:flex-row w-full gap-4 justify-between mb-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-blue-strong">
            Contactar Empresa
          </h2>
          <Button
            asChild
            className="rounded-full w-fit"
            onClick={() => router.back()}
          >
            <div className="flex items-center gap-2">
              <CustomIcon icon={PiArrowBendDoubleUpLeft} className="!size-5" />
              Voltar
            </div>
          </Button>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row gap-6 max-w-7xl">
        <aside className=" lg:w-1/4 bg-white p-5 flex flex-col rounded-xl border gap-4 h-hull">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-strong self-center">
            {demand ? demand.name : ''}
          </h3>
          <span className="text-sm text-blue-light mt-2">
            Publicado{' '}
            {demand
              ? formatDistanceToNow(demand.createdAt, {
                  locale: ptBR,
                  addSuffix: true,
                })
              : ''}
          </span>
          <p className="text-blue-strong text-justify leading-5">
            {demand ? demand.description : ''}
          </p>
          <div className="flex flex-wrap gap-2">
            {demand
              ? demand.projects?.map((project) => (
                  <div
                    key={(project as Project).id}
                    className="bg-secondary rounded-full py-2 px-3 text-xs text-blue-strong w-28 text-center"
                  >
                    {(project as Project).name}
                  </div>
                ))
              : ''}
            {demand
              ? demand.keywords?.map((keyoword) => (
                  <div
                    key={(keyoword as Keyword).id}
                    className="bg-secondary rounded-full py-2 px-3 text-xs text-blue-strong w-28 text-center"
                  >
                    {(keyoword as Keyword).name}
                  </div>
                ))
              : ''}
          </div>
        </aside>
        <section className="lg:w-3/4 bg-white shadow rounded-xl p-5">
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-strong">
              Entre em contato
            </h2>
          </section>
          <hr className="my-4" />
          <section className="flex flex-col gap-4">
            <p className="text-xl">
              <span className="font-semibold">Empresa: </span>{' '}
              {demand?.company?.user.name}
            </p>
          </section>
          <hr className="my-4" />
          <section className="flex flex-col gap-3">
            <h4 className="font-semibold text-xl">Grupo de Pesquisa</h4>
            <Select onValueChange={(value) => setSelectedGroup(value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Grupo de Pesquisa" />
              </SelectTrigger>
              <SelectContent>
                {myResearchGroups &&
                  myResearchGroups.map((group: any) => (
                    <SelectItem key={group.id} value={group.name}>
                      {group.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <h4 className="font-semibold text-xl">Mensagem</h4>
            <Textarea
              placeholder="Descreva para a empresa a sua proposta para este projeto..."
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="rounded-full w-fit self-end py-2 px-8"
              onClick={handleSubmitSendMail}
            >
              Enviar proposta
            </Button>
          </section>
        </section>
      </section>
    </main>
  );
};

export default ContactCompany;
