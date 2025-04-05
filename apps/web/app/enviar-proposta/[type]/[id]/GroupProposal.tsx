'use client';
import useGetMyDemands from '@/api/demandas/use-get-my-demands';
import useGetResearchGroup from '@/api/grupos/use-get-research-group';
import useSendNotification from '@/api/notifications/use-send-notifications';
import useGetGroupProjects from '@/api/projects/use-get-group-projects';
import useSendMail from '@/api/research-group/use-receive-email-from-company';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Demand } from '@/types/Demand';
import { Project } from '@/types/Project';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ContactResearchGroup = (id: string) => {
  const { data: demands = [] } = useGetMyDemands();
  const { data: projects = [] } = useGetGroupProjects(id);
  const [selectedDemand, setSelectedDemand] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const { user } = useUser();

  const { mutate: mutateNotification } = useSendNotification();

  function sendNotification() {
    const receiverId = researchGroup?.leader.userId;
    if (!receiverId) return;

    const message = `Você recebeu uma proposta de ${user?.name}, dono da demanda "${selectedDemand}" 
    para o projeto "${selectedProject}" do grupo "${researchGroup?.name}". 
    Cheque seu e-mail para mais informações.`;

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
        description: 'Proposta enviada com sucesso.',
      });
      sendNotification();
    },
    () => {
      toast({
        variant: 'destructive',
        title: 'Ocorreu um error',
        description: 'Ocorreu um erro ao enviar a proposta.',
      });
    },
  );

  if (user?.utype.includes('RESEARCHER')) {
    router.back();
  }

  const { data: researchGroup, isError, isLoading } = useGetResearchGroup(id);

  if (isError) {
    router.push('/404');
  }

  const handleSubmitSendMail = () => {
    if (researchGroup && user)
      mutate({
        message,
        demandName: selectedDemand,
        researchGroupId: researchGroup?.id,
        companyName: user.name,
      });
  };

  if (isLoading) {
    return (
      <main className="p-8 w-full flex justify-center flex-grow ">
        <h1>Carregando</h1>
      </main>
    );
  }

  return (
    <main className="p-8 w-full flex flex-col flex-grow items-center">
      <section className="max-w-7xl itens-center w-full flex flex-col">
        <h2 className="text-3xl sm:text-4xl font-semibold text-blue-strong mb-4">
          Contactar Grupo de Pesquisa
        </h2>
      </section>
      <section className="flex flex-col lg:flex-row gap-6 max-w-7xl">
        <aside className=" lg:w-1/4 bg-white p-5 flex flex-col rounded-xl border gap-4 h-hull">
          <h3 className="text-2xl sm:text-2xl font-semibold text-blue-strong self-center">
            {researchGroup?.name}
          </h3>

          <p className="text-blue-strong text-justify leading-5">
            {researchGroup?.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {researchGroup?.projects.map((project) => (
              <div
                key={project.id}
                className="bg-secondary rounded-full py-2 px-3 text-xs text-blue-strong text-center"
              >
                {project.name}
              </div>
            ))}
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
              <span className="font-semibold">Grupo de Pesquisa: </span>{' '}
              {researchGroup?.name}
            </p>
          </section>
          <hr className="my-4" />
          <section className="flex flex-col gap-3">
            <h4 className="font-semibold text-xl">Demanda</h4>
            <Select
              onValueChange={(value) => setSelectedDemand(value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a demanda" />
              </SelectTrigger>
              <SelectContent>
                {demands &&
                  demands.map((demand: Demand) => (
                    <SelectItem key={demand.id} value={demand.name}>
                      {demand.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <h4 className="font-semibold text-xl">Projeto de Pesquisa</h4>
            <Select
              onValueChange={(value) => setSelectedProject(value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o projeto" />
              </SelectTrigger>
              <SelectContent>
                {projects &&
                  projects.map((project: Project) => (
                    <SelectItem key={project.id} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <h4 className="font-semibold text-xl">Mensagem</h4>
            <Textarea
              placeholder="Descreva para o líder do grupo a sua proposta para este grupo de pesquisa..."
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

export default ContactResearchGroup;
