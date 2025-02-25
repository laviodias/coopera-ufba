"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CustomIcon } from "../components/icon/customIcon";
import MembersSection from "./components/membersSection";
import { useParams, useRouter } from "next/navigation";
import useGetResearchGroup from "@/api/grupos/use-get-research-group";
import React from "react";
import ProjectsSection from "./components/projectsSection";
import { TbUserCircle } from "react-icons/tb";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { GerenciarMembrosModal } from "../gerenciar-membros/gerenciarMembrosModal";
import { IoPersonCircleOutline } from "react-icons/io5";

const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

enum ETabs {
  MEMBERS = "membros",
  PROJECTS = "projetos",
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
  }

  if (isError) {
    router.push("/404");
  }
  if (isLoading) {
    return (
      <main className="p-8 w-full flex justify-center flex-grow ">
        <h1>Carregando</h1>
      </main>
    );
  }

  const imageComponent =
    !!researchGroup?.img && researchGroup.img.includes("/uploads") ? (
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
                    user?.utype === "RESEARCHER"
                      ? "/meus-grupos-pesquisa"
                      : "/encontrar-grupo-pesquisa"
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

            {user && (user.utype === "RESEARCHER" || user.role === "ADMIN") && (
              selectedTab === ETabs.PROJECTS ? (
                <Link href={`/cadastro-projetos/${groupId}`}>
                  <Button className="rounded-full">
                      <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" />{" "}
                      Novo Projeto
                  </Button>
                </Link>
              ) : (
                <Button className="ml-1 rounded-full" onClick={() => openAddMemberModal()}>
                    <CustomIcon icon={IoPersonCircleOutline} className="!size-5" />{" "}
                    Gerenciar Membros
                </Button>
              )
            )}
          </div>
        </div>

        <div className="flex w-[100%] gap-5">
          <div className="flex gap-5 p-5 items-center justify-center flex-col max-w-[30%] bg-[#fff] border-[2px] rounded-md border-[#C6C2DE]">
            {imageComponent}

            <h1 className="font-size-lg text-2xl">{researchGroup?.name}</h1>

            <p>{researchGroup?.description}</p>
            {user?.utype === "COMPANY" && (
              <Button
                asChild
                variant={"outline"}
                className="px-9 py-2.5 rounded-full mt-3 xs:mt-0"
              >
                <Link
                  href={{
                    pathname: `/encontrar-grupo-pesquisa/contactar-grupo-pesquisa`,
                    query: {
                      id: groupId,
                    },
                  }}
                >
                  Entrar em contato
                </Link>
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-5 w-[100%]">
            <div className="flex gap-5">
              <Button
                className="rounded-full"
                variant={selectedTab === ETabs.PROJECTS ? "default" : "secondary"}
                onClick={() => {
                  handleTabChange(ETabs.PROJECTS);
                }}
              >
                Projetos
              </Button>

              <Button
                className="rounded-full"
                variant={selectedTab === ETabs.MEMBERS ? "default" : "secondary"}
                onClick={() => {
                  handleTabChange(ETabs.MEMBERS);
                }}
              >
                Membros
              </Button>
            </div>
            {researchGroup ? (
              selectedTab == ETabs.MEMBERS ? (
                <MembersSection members={researchGroup?.members} leaderId={researchGroup?.leader.userId} />
              ) : (
                <ProjectsSection projects={researchGroup?.projects} leaderId={researchGroup?.leader.userId} />
              )
            ) : (
              <div>Carregando...</div>
            )}
          </div>
        </div>
      </section>

      {showAddMemberModal && (<GerenciarMembrosModal groupId={groupId as string} onCloseModal={() => setShowAddMemberModal(false)}/>)}
    </main>
  );
}
