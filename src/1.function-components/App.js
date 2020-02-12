import React from 'react'
import Counter from './Counter'
import CounterHooks from './CounterHooks'
import './App.css'

export default function App() {
  console.log('Render App')
  return (
    <>
      Counter
      <Counter initialCount={0} />
      Counter Hooks12
      <CounterHooks initialCount={0} />
    </>
  )
}
