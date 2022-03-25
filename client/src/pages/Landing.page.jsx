import React from 'react'
import LoadingPage from './Loading.page';
import { MainContainer, Table, TD, Title, TR, WriteButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { useGetBoardAll } from '../hooks/useBoard';

const LandingPage = () => {
  const { isLoading, data } = useGetBoardAll({})
  const navigate = useNavigate();

  if(isLoading) {
    return <LoadingPage />
  }
  

  return (
    <MainContainer>
      <Title> Board List </Title>
      {data.data.length !== 0 ? 
        <Table>
          <TR>
            <TD> No </TD>
            <TD> 타이틀 </TD>
            <TD> 작성자 </TD>
          </TR>
          {
            data.data.map(board => {
              return (
                <TR>
                  <TD style={{width: '50px'}}> {board.id}</TD>
                  <TD style={{width: '400px', cursor: 'pointer'}} onClick={() => navigate(`/${board.id}`)}> {board.title}</TD>
                  <TD style={{width: '100px'}}> {board.writer}</TD>
                </TR>
              )
            })
          }
        </Table> 
      : <h2> NO DATA </h2> 
      }
      <WriteButton onClick={() => navigate('/create')}> 등록 </WriteButton>
    </MainContainer>
  )
}

export default LandingPage

