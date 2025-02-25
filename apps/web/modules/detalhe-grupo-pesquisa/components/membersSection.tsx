import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import React from "react";
import { translateResearchType } from "@/modules/shared/utils/translateReasearchType.util";
import { Crown } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Researcher } from "@/types/Researcher";

type TProps = {
  members: Researcher[];
  leaderId: string;
};
export default function MembersSection(props: TProps) {
  const { user } = useUser();

  const isMemberLeader = (id: string) => {
    return props.leaderId == id;
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
              Email
            </TableHead>

            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Papel
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.members.map((member) => {
            return (
              <TableRow key={member.user.id}>
                <TableCell className="text-blue-light py-6 flex gap-2 items-center">
                  {member.user.name}
                  {isMemberLeader(member.user.id) && <Crown className="w-4 h-4" />}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {member.user.email}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {translateResearchType(member.researcherType)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
