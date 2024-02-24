import { useQuery } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { boardKeyFactory } from "./boardKeyFactory";

const getCommentList = async ({ queryKey }) => {
  console.info('query',queryKey)
  const { data } = await client.get(
    GLOBAL_API_URL.BOARD.COMMENT.LIST + `/${queryKey[0].id}`
  );
  return data;
};

export const useGetCommentList = (id) =>
  useQuery({
    queryKey: boardKeyFactory.commentList(id),
    queryFn: getCommentList,
    enabled: !!id,
  });
