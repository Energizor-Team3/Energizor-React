import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

export const deleteBoard = async (boardId) => {
  const { data } = await client.delete(
    `${GLOBAL_API_URL.BOARD.DELETE}/${boardId}`
  );
  return data;
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (boardId) => {
      await deleteBoard(boardId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    }
  });
}