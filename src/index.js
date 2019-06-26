import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import Balls from 'components/Balls'
import Phone from 'components/Phone'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    background-color: #000;
  }
`

const App = () => (
  <>
    <GlobalStyle />
    <Balls />
    <Phone />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
