import React from 'react'
import { Link } from 'react-router-dom'

export default function SidePanel () {
  return (
    <div className='demo-side-panel'>
      <ul>
        <li>
          <Link to='/demo'>Welcome</Link>
        </li>
        <li>
          <Link to='/demo/counter'>Counter Demo</Link>
        </li>
        <li>
          <Link to='/demo/list'>List Demo</Link>
        </li>
        <li>
          <Link to='/'>Back to start page</Link>
        </li>
      </ul>
    </div>
  )
}
