import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../utils/axios";

const createReply = (writer, password, content, boardId, parentReplyId) => {
  return client({
    method: 'post',
    url: `/reply`,
    data: {writer, password, content, boardId: parseInt(boardId), parentReplyId: parseInt(parentReplyId)}
  })
}

export const useCreateReply = () => {
  return useMutation(
    createReplyDto => {
      return createReply(
        createReplyDto.writer,
        createReplyDto.password,
        createReplyDto.content,
        createReplyDto.boardId,
        createReplyDto.parentReplyId
      )
    },
    {
      onSuccess: () => {
        alert('댓글이 등록되었습니다.');
      },
    }
  )
}

const getReplies = (boardId) => {
  return client({
    url: `/reply/${boardId}`
  })
}

export const useGetReplies = (boardId) => {
  return useQuery(['getReplies', boardId], () => getReplies(boardId), {
  })
}

const deleteReply = (replyId,password) => {
  return client({
    method: 'delete',
    url: `/reply/${replyId}`,
    data: {password}
  })
}

export const useDeleteReply = (boardId) => {
  const queryClient = useQueryClient()
  
  return useMutation(
    deleteReplyDto => {
      return deleteReply(
        deleteReplyDto.replyId,
        deleteReplyDto.password
      )
    },
    {
      onSuccess: () => {        
        queryClient.invalidateQueries(['getReplies', boardId])
      },
      onError: () => {
        alert('비밀번호가 틀렸습니다.')
      }
    },
  )
}