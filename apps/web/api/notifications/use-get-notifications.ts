import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Notification } from "@/types/Notification";

async function getNotification(): Promise<Notification[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).get<Notification[]>(
    `/notifications/my`
  );

  return data;
}

export default function useGetNotification() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotification()
  });
}
