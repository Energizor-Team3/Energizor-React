import { useQuery } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { boardKeyFactory } from "./boardKeyFactory";

const tempBoardList = async ({ queryKey }) => {
  const { data } = await client.get(GLOBAL_API_URL.BOARD.TEMPORARY_LIST, {
    params: {
      ...queryKey[0].params,
    },
  });
  return data;
};

export const useGetTempBoardList = (params) =>
  useQuery({
    queryKey: boardKeyFactory.list({ params }),
    queryFn: tempBoardList,
  });
