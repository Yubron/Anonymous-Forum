import React, { useState } from 'react'
import LoadingPage from './Loading.page';
import { MainContainer, Table, TD, Title, TR, WriteButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { useGetBoardAll } from '../hooks/useBoard';
import styled from 'styled-components';

const LandingPage = () => {
  const navigate = useNavigate()

  const [searchType, setSearchType] = useState('title')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchDto, setSearchDto] = useState({
    searchType: '',
    searchKeyword: '',
  })
  const [page, setPage] = useState(1)

  const { isLoading, data } = useGetBoardAll(page, searchDto.searchType, searchDto.searchKeyword)

  const searchHandler = () => {
    setSearchDto({
      searchType: searchType,
      searchKeyword: searchKeyword
    })
    setSearchKeyword('')
  }
  const paging = () => {
    const result = []
    for(let i = 0; i < data.totalPage; i++) {
      const page = i+1
      result.push(<button id={page} onClick={() => setPage(page)}> {page} </button>)
    }
    return result
  }
  if(isLoading) {
    return <LoadingPage />
  }
  
  return (
    <MainContainer>
      <Title> Board List </Title>
      {data.product.length !== 0 ? 
        <Table>
          <TR>
            <TD> No </TD>
            <TD> 타이틀 </TD>
            <TD> 작성자 </TD>
          </TR>
          {
            data.product.map(board => {
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
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value={'title'}> 제목 </option>
          <option value={'writer'}> 작성자 </option>
        </select>
        <input type={'text'} value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/> 
        <button onClick={searchHandler}> 검색 </button>
      </SearchBarContainer>
      <PageContainer>
        {paging()}
      </PageContainer>
      <WriteButton onClick={() => navigate('/create')}> 등록 </WriteButton>
    </MainContainer>
  )
}

export default LandingPage

const SearchBarContainer = styled.div``
const PageContainer = styled.div``