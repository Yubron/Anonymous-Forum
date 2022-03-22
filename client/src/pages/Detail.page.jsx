import React from 'react'
import LoadingPage from './Loading.page'
import { useParams } from "react-router";
import { useGetBoardById } from '../hooks/useBoard';

const DetailPage = () => {
  const { id } = useParams();
  
  const {isLoading, data } = useGetBoardById({id})

  if(isLoading) {
    return <LoadingPage />
  }

  return (
    <div>
      {data.data[0].title}
    </div>
  )
}

export default DetailPage