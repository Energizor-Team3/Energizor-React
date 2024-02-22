import { useMutation } from "@tanstack/react-query";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { client } from "../Client";

export const deleteBoard = async (boardId) => {
  const { data } = await client.delete(`${GLOBAL_API_URL.BOARD.DELETE}/${boardId}`);
  return data;
};