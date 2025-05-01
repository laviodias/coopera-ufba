'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CustomIcon } from '../components/icon/customIcon';
import MembersSection from './components/membersSection';
import { useParams, useRouter } from 'next/navigation';
import useGetResearchGroup from '@/api/grupos/use-get-research-group';
import React from 'react';
import ProjectsSection from './components/projectsSection';
import { TbUserCircle } from 'react-icons/tb';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { GerenciarMembrosModal } from '../gerenciar-membros/gerenciarMembrosModal';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { Researcher } from '@/types/Researcher';
import OpportunitiesSection from './components/opportunitiesSection';

const apiURL = process.env.NEXT_PUBLIC_API_URL || '';

enum ETabs {
  PROJECTS = 'projetos',
  MEMBERS = 'membros',
  DEMANDS = 'demandas',
}
export default function DetalheGrupoPesquisaPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id;

  const [selectedTab, setSelectedTab] = React.useState<ETabs>(ETabs.PROJECTS);
  const [showAddMemberModal, setShowAddMemberModal] = React.useState(false);

  const { user } = useUser();

  const {
    data: researchGroup,
    isError,
    isLoading,
  } = useGetResearchGroup(groupId as string);

  const handleTabChange = (tab: ETabs) => {
    setSelectedTab(tab);
  };

  const openAddMemberModal = () => {
    setShowAddMemberModal(true);
  };

  if (isError) {
    router.push('/404');
  }
  if (isLoading) {
    return (
      <main className="p-8 w-full flex justify-center flex-grow ">
        <h1>Carregando</h1>
      </main>
    );
  }

  const getCTAFromTab = () => {
    switch (selectedTab) {
      case ETabs.MEMBERS:
        return (
          <Button
            className="ml-1 rounded-full"
            onClick={() => openAddMemberModal()}
          >
            <CustomIcon icon={IoPersonCircleOutline} className="!size-5" />{' '}
            Gerenciar Membros
          </Button>
        );
      case ETabs.PROJECTS:
        return (
          <Link href={`/cadastro-projetos/${groupId}`}>
            <Button className="rounded-full">
              <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" />{' '}
              Novo Projeto
            </Button>
          </Link>
        );
      case ETabs.DEMANDS:
        return null;
    }
  };

  const getTabContent = () => {
    if (!researchGroup) return null;

    switch (selectedTab) {
      case ETabs.MEMBERS:
        return (
          <MembersSection
            members={researchGroup.members as Researcher[]}
            leaderId={researchGroup.leader.userId}
          />
        );
      case ETabs.PROJECTS:
        return (
          <ProjectsSection
            projects={researchGroup.projects}
            leaderId={researchGroup.leader.userId}
          />
        );
      case ETabs.DEMANDS:
        return <OpportunitiesSection researchGroupId={groupId.toString()} />;
    }
  };

  const imageComponent =
    !!researchGroup?.img && researchGroup.img.includes('/uploads') ? (
      <img
        src={`${apiURL}${researchGroup?.img}`}
        alt="Grupo de Pesquisa"
        className="max-w-[80%]"
      />
    ) : (
      <TbUserCircle className="text-primary font-normal size-16 row-span-2 col-start-1" />
    );
  return (
    <main className="p-8 w-full flex justify-center flex-grow ">
      <section className="max-w-7xl w-full">
        <div className="flex  flex-col">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="hover:text-blue-strong"
                  href={
                    user?.utype.includes('RESEARCHER')
                      ? '/meus-grupos-pesquisa'
                      : '/encontrar-grupo-pesquisa'
                  }
                >
                  Grupos de Pesquisa
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-bold">
                  Detalhes do Grupo de Pesquisa
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex mb-4 justify-between center">
            <h1 className="text-4xl font-bold text-blue-strong">
              {researchGroup?.name}
            </h1>

            {user &&
              (user.utype.includes('RESEARCHER') || user.role === 'ADMIN') &&
              getCTAFromTab()}
          </div>
        </div>

        <div className="flex w-[100%] gap-5">
          <div className="flex gap-5 p-5 items-center justify-center flex-col max-w-[30%] bg-[#fff] border-[2px] rounded-md border-[#C6C2DE]">
            {imageComponent}

            <h1 className="font-size-lg text-2xl">{researchGroup?.name}</h1>

            <p>{researchGroup?.description}</p>
            {user?.utype == 'COMPANY' && (
              <Button
                asChild
                variant={'outline'}
                className="px-9 py-2.5 rounded-full mt-3 xs:mt-0"
              >
                <Link href={`/enviar-proposta/grupo/${groupId}`}>
                  Entrar em contato
                </Link>
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-5 w-[100%]">
            <div className="flex gap-5">
              {Object.values(ETabs).map((tab) => (
                <Button
                  key={tab}
                  className="rounded-full"
                  variant={selectedTab === tab ? 'default' : 'secondary'}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>
            {researchGroup ? getTabContent() : <div>Carregando...</div>}
          </div>
        </div>
      </section>

      {showAddMemberModal && (
        <GerenciarMembrosModal
          groupId={groupId as string}
          onCloseModal={() => setShowAddMemberModal(false)}
        />
      )}
    </main>
  );
}
