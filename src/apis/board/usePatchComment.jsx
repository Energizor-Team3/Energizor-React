import { useMutation } from "@tanstack/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";

const patchComment = async (requestData) => {
  const { data } = await client.patch(
    GLOBAL_API_URL.BOARD.COMMENT.MODIFY,
    requestData
  );
  return data;
};

export const usePatchComment = () =>
  useMutation({
    mutationFn: (requestData) => {
      patchComment(requestData);
    },
  });
