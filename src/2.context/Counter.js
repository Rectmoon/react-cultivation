import React, { Component } from 'react'
import { ThemeContext } from './App'

export default class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: props.initialCount
    }
  }

  render() {
    console.log('Render Counter')
    return (
      <ThemeContext.Consumer>
        {style => (
          <div>
            <button onClick={() => this.changeCount(-1)} style={style}>
              -
            </button>
            <span>{this.state.count}</span>
            <button onClick={() => this.changeCount(1)} style={style}>
              +
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }

  changeCount(amount) {
    this.setState(prevState => {
      return { count: prevState.count + amount }
    })
  }
}
