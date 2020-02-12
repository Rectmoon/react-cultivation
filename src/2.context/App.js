import React, { useState } from 'react'
import Counter from './Counter'
import CounterHooks from './CounterHooks'
import './App.css'

export const ThemeContext = React.createContext()

/**
  定义: Context提供了一种方式，能够让数据在组件树中传递，而不必一级一级手动传递。
  API : createContext(defaultValue?)。

  import React, { Component, createContext } from 'react';

  const ThemeContext = createContext();

  <ThemeContext.Provider value={60}>
     <Middle />　　//子组件
  </ThemeContext.Provider>


  class Leaf extends Component {
    render() {
      return (
        <ThemeContext.Consumer>
          { value => <h1>Value : {value}</h1>  }
        </ThemeContext.Consumer>
      )
    }
  }
 */

function App() {
  console.log('Render App')
  const [theme, setTheme] = useState('orange')
  return (
    <ThemeContext.Provider value={{ backgroundColor: theme }}>
      Counter
      <Counter initialCount={0} />
      Counter Hooks
      <CounterHooks initialCount={0} />
      <button
        onClick={() =>
          setTheme(prevTheme => {
            return prevTheme === 'orange' ? 'lightblue' : 'orange'
          })
        }
      >
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  )
}

export default App
