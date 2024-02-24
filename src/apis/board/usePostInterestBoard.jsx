import { useMutation } from "@tanstack/react-query";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { client } from "../Client";

const postInterestBoard = async (requestData) => {
  const { data } = await client.post(
    GLOBAL_API_URL.BOARD.INTEREST_REGISTER,
    requestData
  );
  return data;
};
export const usePostInterestBoard = () => useMutation({
  mutationFn:postInterestBoard
});
