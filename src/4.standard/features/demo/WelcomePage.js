import React from 'react'
import './WelcomePage.less'

export default function WelcomePage () {
  return (
    <div className='demo-welcome-page'>
      <header className='app-header'>
        <img src={require('../../assets/images/1.jpg')} className='bg' alt='logo' />
      </header>
      <div className='app-intro'>
        <h3>Hello there, Welcome demo-page!</h3>
      </div>
    </div>
  )
}
