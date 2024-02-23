import { useMutation } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

const putBoard = async (requestData) => {
  const { data } = await client.put(GLOBAL_API_URL.BOARD.MODIFY, requestData);
  return data;
};
export const usePutBoard = () =>
  useMutation({
    mutationFn: (requestData) => putBoard(requestData),
  });
