'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import useAddDemand from '@/api/demandas/use-add-demand';
import { Demand } from '@/types/Demand';
import { useToast } from '@/hooks/use-toast';
import { checkAccessAndRedirect } from '@/lib/access.control';
import { usePathname, useRouter } from 'next/navigation';
import { FiInfo } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import Keywords from '@/components/keywords';
import { MultiSelect } from '@/components/ui/multi-select';
import useGetAvailableProjects from '@/api/projects/use-get-available-projects';

const CadastrarDemanda = () => {
  const router = useRouter();
  checkAccessAndRedirect(router, usePathname());
  const { data: availableProjects } = useGetAvailableProjects();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [projectOptions, setProjectOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (availableProjects) {
      setProjectOptions(
        availableProjects.map((project) => ({
          value: project.id,
          label: `${project.name} - ${project.researchGroup.name}`,
        })),
      );
    }
  }, [availableProjects]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Demand>();
  const { toast } = useToast();

  const { mutate, isPending } = useAddDemand(
    () => {
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'A demanda foi cadastrada com sucesso.',
      });

      router.push('/minhas-demandas');
    },
    () => {
      toast({
        variant: 'destructive',
        title: 'Ocorreu um error',
        description: 'Ocorreu um erro ao tentar criar nova demanda.',
      });
    },
  );

  const onSubmit = (data: Demand) => {
    const demandData: Partial<Demand> = {
      name: data.name,
      description: data.description,
      link: data?.link?.length ? data.link : undefined,
      public: data.public.toString() == 'on',
      keywords: selectedKeywords,
      projects: selectedProjects,
    };

    mutate(demandData as Demand);
  };

  const handleRedirect = () => {
    router.back();
  };

  return (
    <main className="p-8 w-full flex justify-center">
      <section className="max-w-7xl w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-blue-strong"
                href="/minhas-demandas"
              >
                Minhas demandas
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-bold">
                Cadastrar demandas
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold text-blue-strong">
            Cadastrar demanda
          </h1>
        </div>
        <div className="p-4 bg-white shadow rounded-xl mt-4 h-[700] max-w-[1350]">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-bold text-blue-strong mt-4">
              Título*
              <input
                {...register('name', { required: true })}
                type="text"
                placeholder="Título do projeto"
                className="w-full py-3 px-4 text-base font-medium rounded-lg border mt-2"
              />
              {errors.name && (
                <span className="text-red font-normal text-sm">
                  Titulo é obrigatório
                </span>
              )}
            </label>

            <label className="font-bold text-blue-strong mt-4">
              Descrição*
              <textarea
                {...register('description', { required: true })}
                placeholder="Digite o texto..."
                rows={4}
                className="w-full py-3 px-4 text-base font-normal border rounded-lg mt-2"
              />
            </label>

            <div className="flex gap-2 items-center">
              <Switch {...register('public')} />
              <label>Demanda Pública?</label>

              <Tooltip>
                <TooltipTrigger>
                  <FiInfo color="#6E6893" />
                </TooltipTrigger>
                <TooltipContent className="bg-black/80 max-w-60">
                  Demandas públicas são visíveis para todos os usuários do site.
                </TooltipContent>
              </Tooltip>
            </div>

            <label className="font-bold text-blue-strong mt-4">
              Link
              <input
                type="url"
                placeholder="Informe link da demanda"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register('link', { required: false })}
              />
            </label>

            <div className="font-bold text-base text-blue-strong">
              <label>Anexo</label>
              <div className="flex items-center mt-2">
                <Button className="rounded-full py-2.5 px-8">
                  Adicionar anexo
                </Button>
              </div>
            </div>

            <Keywords
              onChange={setSelectedKeywords}
              defaultValue={selectedKeywords}
            />

            {errors.description && <span>Este campo é obrigatório</span>}

            <label className="font-bold text-blue-strong mt-4">
              Vincular Projetos
              <MultiSelect
                options={projectOptions}
                placeholder="Selecione o(s) projeto(s)"
                variant="inverted"
                defaultValue={selectedProjects}
                onValueChange={setSelectedProjects}
                maxCount={3}
              />
            </label>

            <div className="flex flex-row gap-4 justify-center mt-10">
              <Button
                type="submit"
                className="rounded-full py-2.5 px-8"
                disabled={isPending}
              >
                {isPending ? 'Cadastrando...' : 'Cadastrar demanda'}
              </Button>

              <Button
                variant={'outline'}
                className="rounded-full py-2.5 px-8"
                onClick={handleRedirect}
                type="reset"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CadastrarDemanda;
