import { useQuery } from "react-query";
import { client } from "../utils/axios";

const getBoardAll = ({ page=1, searchType, searchKeyword }) => {
  return client({
    url: `/board?page=${page}${searchType ? `&searchType=${searchType}` : ''}${searchKeyword ? `&searchKeyword=${searchKeyword}` : ''}`,
  });
};

export const useGetBoardAll = ({ page=1, searchType, searchKeyword}) => {
  return useQuery(['getAllBoard', page, searchType, searchKeyword ], () => getBoardAll({ page, searchType, searchKeyword }), {
  });
};

const getBoardById = ({id}) => {
  return client({
    url: `/board/${id}`
  })
}

export const useGetBoardById = ({id}) => {
  return useQuery(['getBoard', id], () => getBoardById({id}), {
    select: data => data.data[0],
  })
}