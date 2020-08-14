import React, { useEffect, useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'

const STORAGE_KEY = 'DETAIL_INFO'

export default function DetailPage () {
  const [detailInfo, setDetailInfo] = useState({})
  const { state } = useLocation()

  useEffect(() => {
    const detailInfoFromSessionStorage = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    const data = state || detailInfoFromSessionStorage
    setDetailInfo(data)
    data && sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    return () => {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [state])

  return (
    <div className='demo-detail-page'>
      {detailInfo ? (
        <>
          <h3>{detailInfo.title}</h3>
          <h3>{detailInfo.description}</h3>
        </>
      ) : (
        <Redirect to='/demo/list' />
      )}
    </div>
  )
}
