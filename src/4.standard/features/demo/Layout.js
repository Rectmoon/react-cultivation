import React from 'react'
import { SidePanel } from './'

export default function Layout ({ children }) {
  return (
    <div className='demo-layout'>
      <SidePanel />
      <div className='demo-page-container'>{children}</div>
    </div>
  )
}
