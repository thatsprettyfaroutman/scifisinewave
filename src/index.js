import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import Bars from 'components/Bars'
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
    <Bars />
    <Phone />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
