import { useQuery } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { boardKeyFactory } from "./boardKeyFactory";

const getInterestBoardList = async ({ queryKey }) => {
  const { data } = await client.get(GLOBAL_API_URL.BOARD.INTEREST_LIST, {
    params: {
      ...queryKey[0].params,
    },
  });
  return data;
};

export const useGetInterestBoardList = (params) =>
  useQuery({
    queryKey: boardKeyFactory.list({ params }),
    queryFn: getInterestBoardList,
  });
