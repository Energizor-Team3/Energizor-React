import { useMutation } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

const deleteComment = async (id) => {
  const { data } = await client.delete(
    GLOBAL_API_URL.BOARD.COMMENT.DELETE + `/${id}`
  );
  return data;
};
export const useDeleteComment = () =>
  useMutation({
    mutationFn: (id) => deleteComment(id),
  });
