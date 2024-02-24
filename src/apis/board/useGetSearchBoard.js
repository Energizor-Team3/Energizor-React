import { useQuery } from "@tanstak/react-query";
import { client } from "../Client";
import { GLOBAL_API_URL } from "../GLOBAL_API_URL";
import { boardKeyFactory } from "./boardKeyFactory";

const getSearchBoard = async ({ queryKey }) => {
    const { data }= await client.get(GLOBAL_API_URL.BOARD.LIST, {
        params: {
            ...queryKey[0].params,
        },
    });
    return data;
};

export const useGetSearchBoard = (params) => 
    useQuery({
        queryKey: boardKeyFactory.list({params}),
        queryFn:getSearchBoard,
    });