import React, { useState } from 'react'
import styled from 'styled-components'
import { MainContainer } from '../components/common'
import { useCreateBoard } from '../hooks/useBoard'

const CreateBoardPage = () => {
  const [createBoardDto, setCreateBoardDto] = useState({
    writer: 'jinsoo',
    password: '1234',
    title: 'title',
    content: 'content'
  })

  const createBoard = useCreateBoard()

  const changeHandler = (e) => {
    setCreateBoardDto({...createBoardDto, [e.target.name]: e.target.value })
  }
  
  return (
    <MainContainer>
      <CreateBoardContainer>
        <h2> 작성하기 </h2>
        <label> 이름 </label>
        <input type={'text'} name={'writer'} value={createBoardDto.writer} onChange={changeHandler}/>
        
        <label> 패스워드 </label>
        <input type={'password'} name={'password'} value={createBoardDto.password} onChange={changeHandler}/>
        
        <label> 제목 </label>
        <input type={'text'} name={'title'} value={createBoardDto.title} onChange={changeHandler}/>

        <label> 내용 </label>
        <textarea type={'text'} name={'content'} value={createBoardDto.content} onChange={changeHandler}/>

        <button onClick={() => createBoard.mutate(createBoardDto)}> 등록 </button>
      </CreateBoardContainer>
    </MainContainer>
  )
}

export default CreateBoardPage

const CreateBoardContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`