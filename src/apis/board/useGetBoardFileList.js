import { useQuery } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { boardKeyFactory } from "./boardKeyFactory";

const getBoardFileList = async ({ queryKey }) => {
  console.info("query", queryKey);
  const { data } = await client.get(
    GLOBAL_API_URL.BOARD.FILE_LIST + `/${queryKey[0].id}`
  );
  return data;
};

export const useGetBoardFileList = (id) =>
  useQuery({
    queryKey: boardKeyFactory.fileList(id),
    queryFn: getBoardFileList,
    enabled: !!id,
  });
