import { useMutation } from "@tanstack/react-query";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { client } from "../Client";

const postBoard = async (requestData) => {
  const { data } = await client.post(
    GLOBAL_API_URL.BOARD.REGISTER,
    requestData
  );
  return data;
};
export const usePostBoard = () => useMutation({
  mutationFn:postBoard
});
