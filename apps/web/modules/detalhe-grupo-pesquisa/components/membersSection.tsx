import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import React from "react";
import { TMember } from "../types/researchgroup.type";
import { translateResearchType } from "@/modules/shared/utils/translateReasearchType.util";
import { Crown, TrashIcon } from "lucide-react";
import { useUser } from "@/context/UserContext";

type TProps = {
  members: TMember[];
  leaderId: string;
};
export default function MembersSection(props: TProps) {
  const { user } = useUser();

  const isMemberLeader = (id: string) => {
    return props.leaderId == id;
  }

  const isCurrentUserLeader = () => {
    if (!user) return false;

    return isMemberLeader(user.id);
  }

  const onClickChangeLeader = (userId: string) => {
    
  }

  const onClickRemoveMember = (userId: string) => {
    
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

            {
              isCurrentUserLeader() && 
              <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl text-center">
                Ações
              </TableHead>
            }

          </TableRow>
        </TableHeader>
        <TableBody>
          {props.members.map((member) => {
            return (
              <TableRow>
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
                {
                  isCurrentUserLeader() && 
                  <TableCell className="text-blue-light py-6">
                    <div className="flex gap-2 justify-center">
                      {!isMemberLeader(member.user.id) && <Crown className="w-6 h-6 cursor-pointer" onClick={() => onClickChangeLeader(member.user.id)}/>}
                      {!isMemberLeader(member.user.id) && <TrashIcon className="w-6 h-6 cursor-pointer" onClick={() => onClickRemoveMember(member.user.id)}/>}
                    </div>
                  </TableCell>
                }
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
