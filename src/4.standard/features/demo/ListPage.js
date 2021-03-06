import React from 'react'
import { Link } from 'react-router-dom'
import { useFetchList } from './redux/hooks'

export default function ListPage () {
  const { list, fetchList, fetchListPending, fetchListError } = useFetchList()

  return (
    <div className='demo-reddit-list-page'>
      <h1>Reddit API Usage</h1>
      <p>This demo shows how to use Redux async actions to fetch data from Reddit's REST API.</p>
      <button className='btn-fetch-reddit' disabled={fetchListPending} onClick={fetchList}>
        {fetchListPending ? 'Fetching...' : 'Fetch reactjs topics'}
      </button>
      {fetchListError && (
        <div className='fetch-list-error'>Failed to load: {fetchListError.toString()}</div>
      )}
      {list.length > 0 ? (
        <ul className='demo-reddit-list'>
          {list.map(([title, description]) => (
            <li key={title + description}>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link
                to={{
                  pathname: `/demo/detail/${title}`,
                  search: 'a=1',
                  state: {
                    title,
                    description,
                  },
                }}
              >
                详情
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className='no-items-tip'>No items yet.</div>
      )}
    </div>
  )
}
