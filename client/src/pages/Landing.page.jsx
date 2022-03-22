import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios';
import LoadingPage from './Loading.page';
import styled from 'styled-components'
import { DeleteButton, MainContainer, Table, TD, Title, TR, UpdateButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { isLoading, data } = useQuery('getAllBoard', () => {
    return axios.get('http://localhost:4000/board')
  })

  const navigate = useNavigate();
  const goRouteId = (id) => {
   navigate(`/${id}`);
  }  

  if(isLoading) {
    return <LoadingPage />
  }

  return (
    <MainContainer>
      <Title> Board List </Title>
      <Table>
        <TR>
          <TD> No </TD>
          <TD> 타이틀 </TD>
          <TD> 작성자 </TD>
          <TD> 수정 </TD>
          <TD> 삭제 </TD>
        </TR>
        {
          data.data.map(board => {
            return (
              <TR>
                <TD style={{width: '50px'}}> {board.id}</TD>
                <TD style={{width: '400px', cursor: 'pointer'}} onClick={() => goRouteId(board.id)}> {board.title}</TD>
                <TD style={{width: '100px'}}> {board.writer}</TD>
                <TD style={{width: '50px'}}> <UpdateButton> 수정 </UpdateButton> </TD>
                <TD style={{width: '50px'}}> <DeleteButton> 삭제 </DeleteButton> </TD>
              </TR>
            )
          })
        }
      </Table> 
    </MainContainer>
  )
}

export default LandingPage

