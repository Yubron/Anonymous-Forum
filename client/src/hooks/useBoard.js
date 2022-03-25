import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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

export const useGetBoardById = (id) => {
  return useQuery(['getBoard', id], () => getBoardById({id}), {
    select: data => data.data[0],
  })
}

const createBoard = (writer, password, title, content) => {
  return client({
    method: 'post',
    url: `/board`,
    data: {writer, password, title, content}
  })
}

export const useCreateBoard = () => {
  const navigate = useNavigate()
  return useMutation(
    createBoardDto => {
      return createBoard(
        createBoardDto.writer,
        createBoardDto.password,
        createBoardDto.title,
        createBoardDto.content
      )
    },
    {
      onSuccess: () => {
        alert('글이 등록되었습니다.');
        navigate('/')
      },
    }
  )
}