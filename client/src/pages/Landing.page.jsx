import React, { useState } from 'react'
import LoadingPage from './Loading.page';
import { MainContainer, Table, TD, Title, TR, WriteButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { useGetBoardAll } from '../hooks/useBoard';
import styled from 'styled-components';

const LandingPage = () => {
  const [searchDto, setSearchDto] = useState({
    searchType: '',
    searchKeyword: '',
  })
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const { isLoading, data } = useGetBoardAll({ page, searchType: searchDto.searchType, searchKeyword: searchDto.searchKeyword })
  // const { isLoading, data } = useGetBoardAll({})
  
  const changeHandler = (e) => {
    setSearchDto({...searchDto, [e.target.name]: e.target.value })
  }

  const searchHandler = () => {

  }

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
      <SearchBarContainer>
        <select>
          <option> 제목 </option>
          <option> 작성자 </option>
        </select>
        <input type={'text'} name={'searchKeyword'} value={searchDto.searchKeyword} onChange={changeHandler} /> 
        <button onClick={searchHandler}> 검색 </button>
      </SearchBarContainer>
      <WriteButton onClick={() => navigate('/create')}> 등록 </WriteButton>
    </MainContainer>
  )
}

export default LandingPage

const SearchBarContainer = styled.div``