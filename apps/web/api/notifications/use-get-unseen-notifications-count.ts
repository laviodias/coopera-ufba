import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

async function getUnseenNotificationsCount(): Promise<number> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).get<number>(
    `/notifications/unseen-count`
  );

  return data;
}

export default function useGetUnseenNotificationsCount() {
  return useQuery({
    queryKey: ["notifications-unseen-count"],
    queryFn: () => getUnseenNotificationsCount()
  });
}
