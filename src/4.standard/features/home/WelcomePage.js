import React, { useState } from 'react'
import './WelcomePage.less'

export default function WelcomePage () {
  const [count, setCount] = useState(1)

  return (
    <div className='home-welcome-page'>
      <header className='app-header'>
        <img src={require('../../assets/images/1.jpg')} className='bg' alt='logo' />
      </header>
      <div className='app-intro'>
        <h3>Hello there, Welcome 1234!</h3>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </div>
  )
}
