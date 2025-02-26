import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import useGetNotification from '@/api/notifications/use-get-notifications';
import useMarkNotificationRead from '@/api/notifications/use-mark-notification-read';

export default function NotificationList() {
  const { data: notifications } = useGetNotification();

  const { mutate } = useMarkNotificationRead();

  function markAsRead(notificationId: string) {
    mutate(notificationId);

    notifications?.map((notification) => {
      if (notification.id === notificationId) {
        notification.read = true;
      }
    });
  }

  return notifications && notifications.length > 0 ? (
    <>
      <ul className="space-y-1 max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
        {notifications?.map((notification) => (
          <li
            key={notification.id}
            className={`flex flex-col gap-2 p-2 ${notification.read ? '' : 'bg-gray-100 cursor-pointer hover:bg-gray-200'}`}
          >
            {notification.url ? (
              <Link
                href={notification.url}
                className="text-sm hover:underline"
                onClick={() =>
                  !notification.read && markAsRead(notification.id)
                }
              >
                {notification.message}
              </Link>
            ) : (
              <span
                className="text-sm"
                onClick={() => markAsRead(notification.id)}
              >
                {notification.message}
              </span>
            )}
            <small className="text-blue-light text-xs">
              há{' '}
              {formatDistanceToNow(notification.createdAt, {
                locale: ptBR,
              })}
            </small>
          </li>
        ))}
      </ul>
    </>
  ) : (
    'Não há notificações'
  );
}
