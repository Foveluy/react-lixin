import React, { Component } from 'react'
import { Provider } from 'react-redux'

import Admin from './Admin'
import { store } from './store'

import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Admin />
      </Provider>
    )
  }
}

export default App
