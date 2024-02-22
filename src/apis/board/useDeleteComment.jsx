import { useMutation } from "@tanstack/react-query";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { client } from "../Client";

const deleteComment = async (id) => {
  const { data } = await client.delete(
    GLOBAL_API_URL.BOARD.COMMENT.DELETE + `/${id}`,
  );
  return data;
};
export const useDeleteComment = () => useMutation({
  mutationFn:deleteComment
});
