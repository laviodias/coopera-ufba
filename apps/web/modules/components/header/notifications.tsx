import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import useGetNotification from "@/api/notifications/use-get-notifications";

export default function NotificationList() {
  const {
    data: notifications,
  } = useGetNotification()

  return notifications ? (
    <>
      <ul className="space-y-3 max-h-44 px-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
        {notifications?.map((notification) => (
          <li key={notification.id} className="flex flex-col">
            {notification.url ? (
              <Link
                href={notification.url}
                className="text-sm hover:underline"
              >
                {notification.message}
              </Link>
            ) : (
              <span className="text-sm">{notification.message}</span>
            )}
            <small className="text-blue-light text-xs">
              há {formatDistanceToNow(notification.createdAt, {
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
    "Não há notificações"
  )
}
