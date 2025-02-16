import { useEffect, useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function NotificationList() {
  const notifications = [
    {
      id: "1",
      title: "Proposta recebida para [Nome da demanda]!",
      createdAt: new Date(),
      url: "",
    },
    {
      id: "2",
      title: "Proposta recebida para [Nome da demanda]!",
      createdAt: new Date(),
      url: ""
    },
    {
      id: "3",
      title: "Proposta recebida para [Nome da demanda]!",
      createdAt: new Date(),
      url: ""
    },
  ];

  return notifications.length > 0 ? (
    <>
      <ul className="space-y-3 max-h-44 px-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex flex-col">
            {notification.url ? (
              <Link
                href={notification.url}
                className="text-sm hover:underline"
              >
                {notification.title}
              </Link>
            ) : (
              <span className="text-sm">{notification.title}</span>
            )}
            <small className="text-blue-light text-xs">
              {formatDistanceToNow(notification.createdAt, {
                locale: ptBR,
              })}
            </small>
            <Separator />
          </li>
        ))}
      </ul>
      <Link
        href={"notificacao"}
        className="text-center text-sm text-blue-light block pt-4 hover:text-blue-strong hover:underline"
      >
        Ver mais
      </Link>
    </>
  ) : (
    "Não há novas notificações"
  )
}
