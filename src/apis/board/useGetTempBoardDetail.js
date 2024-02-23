import { useQuery } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { boardKeyFactory } from "./boardKeyFactory";

const getTempBoardDetail = async ({ queryKey }) => {
  console.info("query", queryKey);
  const { data } = await client.get(
    GLOBAL_API_URL.BOARD.TEMPORARY_DETAIL + `/${queryKey[0].id}`
  );
  return data;
};

export const useGetTempBoardDetail = (id) =>
  useQuery({
    queryKey: boardKeyFactory.tempDetail(id),
    queryFn: getTempBoardDetail,
    enabled: !!id,
  });
