import React, { useState } from 'react'
import styled from 'styled-components'
import LoadingPage from './Loading.page'
import { useParams } from "react-router";
import { useGetBoardById } from '../hooks/useBoard';
import { MainContainer, Title } from '../components/common';
import { useCreateReply, useGetReplies } from '../hooks/useReply';

const DetailPage = () => {
  const { id } = useParams();
  const [createReplyDto, setCreateReplyDto ] = useState({
    content: 'content',
    writer: 'writer',
    password: 'password',
    boardId: id,
    parentReplyId: null,
  })

  const changeHandler = (e) => {
    setCreateReplyDto({...createReplyDto, [e.target.name]: e.target.value })
  }

  const createReply = useCreateReply()
  
  const replyHandler = () => {
    createReply.mutate(createReplyDto)
    resetReplyInput()
  }
  
  const resetReplyInput = () => {
    setCreateReplyDto({
      content: 'content',
      writer: 'writer',
      password: 'password',
      boardId: id,
      parentReplyId: null,
    })
  }


  const {isLoading: isBoardLoading, data: board } = useGetBoardById(id)
  const {isLoading: isReplyLoading, data: replies} = useGetReplies(id)

  
  if(isBoardLoading || isReplyLoading) {
    return <LoadingPage />
  }
  console.log(replies.data)
  return (
    <MainContainer>
      <BoardDetailContainer>
        <Title> {board.title} </Title>
        <Writer> 작성자 : {board.writer} </Writer>

        <Content> {board.content} </Content>
      </BoardDetailContainer>
      <h2> REPLY </h2>
      <ReplyMainContainer>
        <ReplyInputContainer>
          <ReplyContentInput type={'text'} name={'content'} value={createReplyDto.content} onChange={changeHandler}/>
          <div> 
            <label>작성자</label> 
            <input type={'text'} name={'writer'} value={createReplyDto.writer} onChange={changeHandler}/>
          </div>
          <div> 
            <label>비밀번호</label> 
            <input type={'password'} name={'password'} value={createReplyDto.password} onChange={changeHandler}/>
          </div>
          <button onClick={replyHandler}> 등록 </button>
        </ReplyInputContainer>
        {
          replies.data.map(reply => {
            if(reply.parentReplyId === null) {
              return (
                <div>
                  <p> {reply.writer} : {reply.content} </p>
                </div>
              )
            }
            return (
              <p> qwe </p>
            )
          })
        }
      </ReplyMainContainer>
    </MainContainer>
    
    
  )
}

export default DetailPage
const BoardDetailContainer = styled.div`
  width: 70%;
`
const ReplyMainContainer = styled.div``
const Writer = styled.div`
  text-align: right;
`
const Content = styled.div``

const ReplyInputContainer = styled.div`
`
const ReplyContentInput = styled.textarea`
  width: 50%;
  resize: none;
`