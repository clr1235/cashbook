import React from 'react'
import ReactDOM from 'react-dom'
import 'lib-flexible/flexible'
import {
  BrowserRouter as Router,
} from "react-router-dom"

import App from './App'

import './index.less'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
