import React from 'react'
import styled from 'styled-components'
import LoadingPage from './Loading.page'
import { useParams } from "react-router";
import { useGetBoardById } from '../hooks/useBoard';
import { MainContainer, Title } from '../components/common';

const DetailPage = () => {
  const { id } = useParams();
  
  const {isLoading: isBoardLoading, data: board } = useGetBoardById({id})

  if(isBoardLoading) {
    return <LoadingPage />
  }
  console.log(board)
  return (
    <MainContainer>
      <BoardDetailContainer>
        <Title> {board.title} </Title>
        <Writer> 작성자 : {board.writer} </Writer>

        <Content> {board.content} </Content>
      </BoardDetailContainer>
      <ReplyMainContainer>
        
      </ReplyMainContainer>
    </MainContainer>
    
    
  )
}

export default DetailPage
const BoardDetailContainer = styled.div``
const ReplyMainContainer = styled.div``
const Writer = styled.div`
  text-align: right;
`
const Content = styled.div``