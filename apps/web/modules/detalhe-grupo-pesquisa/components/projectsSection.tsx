import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import React from "react";
import { Project } from "@/types/Project";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

type TProps = {
  projects: Project[];
  leaderId: String;
};
export default function ProjectsSection(props: TProps) {
  const { user } = useUser();
  console.log(props.projects);

  const onClickDelete = (id: string) => {};

  const isCurrentUserLeader = () => {
    if (!user) return false;

    return user.id == props.leaderId;
  }

  return (
    <div className="bg-white rounded-2xl px-3 py-4 w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Nome
            </TableHead>

            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Demanda
            </TableHead>
            {isCurrentUserLeader() && (
              <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
                Ações
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.projects.length ? props.projects.map((project) => {
            return (
              <TableRow key={project.id}>
                <TableCell className="text-blue-light py-6">
                  {project.name}
                </TableCell>

                <TableCell className="text-blue-light py-6">
                  {project?.demand?.name || "Nenhuma"}
                </TableCell>

                {isCurrentUserLeader() && (
                  <TableCell className="text-blue-light py-6">
                    <div className="flex gap-2">
                      <Link href={`/projetos/${project.id}`} className="text-blue-light">Editar</Link>
                      <button onClick={() => onClickDelete(project.id)} className="text-blue-light">Excluir</button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          }) : (
            <TableRow>
              <TableCell className="text-blue-light py-6 text-centerT" colSpan={2}>
                Nenhum projeto encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
