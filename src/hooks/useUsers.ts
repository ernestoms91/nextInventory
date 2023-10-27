import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import useSWR, { SWRConfiguration } from "swr";

export const useUsers =  (
  url: string,
  config: SWRConfiguration = {}
) => {

  const  session =  getServerSession(authOptions)

  const fetcher = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.then(res=>res.json())}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
    fetcher,
    config
  );

  return {
    users: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
