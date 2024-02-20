import { useMutation } from "@tanstack/react-query";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { client } from "../Client";

const putBoard = async (requestData) => {
  const { data } = await client.post(GLOBAL_API_URL.BOARD.MODIFY, requestData);
  return data;
};
export const usePutBoard = () => useMutation({
  mutationFn : putBoard
});
