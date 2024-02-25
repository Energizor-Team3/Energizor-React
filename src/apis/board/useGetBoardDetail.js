import { useQuery } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { boardKeyFactory } from "./boardKeyFactory";

const getBoardDetail = async ({ queryKey }) => {
  console.info('query',queryKey)
  const { data } = await client.get(
    GLOBAL_API_URL.BOARD.DETAIL + `/${queryKey[0].id}`
  );
  return data;
};

export const useGetBoardDetail = (id) =>
  useQuery({
    queryKey: boardKeyFactory.detail(id),
    queryFn: getBoardDetail,
    enabled: !!id,
  });
