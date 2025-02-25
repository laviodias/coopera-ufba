import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit } from "lucide-react";
import { EditForm } from "./edit-form";
import { useState } from "react";
import { User } from "@/types/User";

function EditModal(user: User) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        className="bg-primary text-white py-2 px-4 text-sm rounded-md hover:brightness-110"
        onClick={() => setIsOpen(true)}
      >
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>
            <EditForm user={user} closeModal={handleCloseModal} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export { EditModal };
