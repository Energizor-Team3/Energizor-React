import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

export const deleteTemporaryBoard = async (boardId) => {
  const { data } = await client.delete(
    `${GLOBAL_API_URL.BOARD.TEMPORARY_DELETE}/${boardId}`
  );
  return data;
};

export const useDeleteTemporaryBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (boardId) => {
      await deleteTemporaryBoard(boardId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })};