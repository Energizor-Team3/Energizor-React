import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

export const deleteInterestBoard = async (boardId) => {
const { data } = await client.delete(
    `${GLOBAL_API_URL.BOARD.INTEREST_DELETE}/${boardId}`
  );
  return data;
};

export const useDeleteInterestBoard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (boardId) => {
            await deleteInterestBoard(boardId);
          },
          onSuccess: () => {
            queryClient.invalidateQueries();
          }
    })
};