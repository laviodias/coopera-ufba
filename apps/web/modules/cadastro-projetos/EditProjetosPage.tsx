'use client';

import useAddProject from '@/api/projects/use-add-project';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/use-toast';
import { Project } from '@/types/Project';
import { useParams, useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { ProjectFormData } from './types/project-form-data';
import Keywords from '@/components/keywords';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useGetAllDemands from '@/api/demandas/use-get-all-demands';
import { Keyword } from '@/types/Keyword';
import useGetProject from '@/api/projects/use-get-project';
import useUpdateProject from '@/api/projects/use-update-project';

const EditarProjeto = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const [selectedDemand, setSelectedDemand] = useState<string>("");
    const { data: demands = [] } = useGetAllDemands();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ProjectFormData>();
  const { user } = useUser();

  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data: project } = useGetProject(params.id);

  console.log('aq', project)

  /* if (!user) {
    router.push('/login');
  } */

  useEffect(() => {
    if (project) {
      if(project.keywords)
        setSelectedKeywords(project.keywords.map((keyword) => (keyword as Keyword).id));

      if(project.demandId)
        setSelectedDemand(project.demandId);

      setValue('name', project.name);
      setValue('link', project.link);
      setValue('demandId', project.demandId);
    }
  }, [project]);

  const { mutate } = useUpdateProject(
    project?.id as string,
    () => {
      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'O projeto foi salvo com sucesso.',
      });
      router.back();
    },
    () => {
      toast({
        variant: 'destructive',
        title: 'Ocorreu um error',
        description: 'Ocorreu um erro ao tentar salvar este projeto.',
      });
    },
  );

  const [keywordRequired, setKeywordRequired] = useState<boolean>(false);
  const onSubmit = (data: ProjectFormData) => {
    if (!selectedKeywords.length) {
      setKeywordRequired(true);
      return;
    }

    const projectData: Partial<Project> = {
      name: data.name,
      link: data.link,
      keywords: selectedKeywords,
    };

    if(selectedDemand?.length > 0)
      projectData.demandId = selectedDemand

    mutate(projectData);
  };

  const handleRedirect = () => {
    router.back();
  };

  return (
    <main className="p-8 w-full flex flex-1 justify-center">
      <section className="max-w-7xl w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-blue-strong"
                href={`/detalhe-grupo-pesquisa/${params.id}`}
              >
                Detalhes do Grupo de Pesquisa
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-bold">
                Editar Projeto
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold text-blue-strong">
            Editar Projeto
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

            <Keywords
              onChange={setSelectedKeywords}
              defaultValue={selectedKeywords}
            />

            {keywordRequired && <span>Este Campo é obrigatório</span>}

            <label className="font-bold text-blue-strong mt-4">
              Link
              <input
                type="url"
                placeholder="Informe link do projeto"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register('link', {
                  required: false,
                  setValueAs: (value) => value || null,
                })}
              />
            </label>

            <label className="font-bold text-blue-strong mt-4">
              Vincular Demanda
              <Select
                onValueChange={setSelectedDemand}
                value={selectedDemand}
                {...register('demandId')}
              >
                <SelectTrigger className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2">
                  <SelectValue placeholder={'Selecione uma demanda'} />
                </SelectTrigger>
                <SelectContent>
                  {demands.map((demand) => (
                    <SelectItem key={demand.id} value={demand.id}>
                      {demand.company.user.name} - {demand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <div className="flex flex-row gap-4 justify-center mt-10">
              <Button type="submit" className="rounded-full py-2.5 px-8">
                Salvar projeto
              </Button>
              <Button
                variant={'outline'}
                className="rounded-full py-2.5 px-8"
                type="reset"
                onClick={handleRedirect}
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

export default EditarProjeto;

