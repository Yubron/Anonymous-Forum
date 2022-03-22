import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios';
import LoadingPage from './Loading.page'
import { useParams } from "react-router";

const DetailPage = () => {
  const { id } = useParams();
  
  const { isLoading, data } = useQuery('getBoardById', () => {
    return axios.get(`http://localhost:4000/board/${id}`)
  })

  if(isLoading) {
    return <LoadingPage />
  }

  return (
    <div>
      Detail.page
    </div>
  )
}

export default DetailPage