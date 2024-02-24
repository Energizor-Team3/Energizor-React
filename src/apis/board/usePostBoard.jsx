import { useMutation } from "@tanstack/react-query";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { client } from "../Client";

export const postBoard = async (requestData) => {
  const { data } = await client.post(
    GLOBAL_API_URL.BOARD.REGISTER,
    requestData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return data;
};