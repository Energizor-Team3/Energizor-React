import { useMutation } from "@tanstack/react-query";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { client } from "../Client";

const patchComment = async (requestData) => {
  console.log('===============',requestData);
  const { data } = await client.patch(
    GLOBAL_API_URL.BOARD.COMMENT.MODIFY,
    requestData
  );
  return data;
};
export const usePatchComment = () => useMutation({
  mutationFn:patchComment
});
