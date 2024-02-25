import { useMutation } from "@tanstack/react-query";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { client } from "../Client";

const postComment = async (requestData) => {
  const { data } = await client.post(
    GLOBAL_API_URL.BOARD.COMMENT.REGISTER,
    requestData
  );
  return data;
};
export const usePostComment = () => useMutation({
  mutationFn:postComment
});
