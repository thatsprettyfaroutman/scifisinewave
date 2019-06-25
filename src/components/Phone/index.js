import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { range } from 'ramda'

const LINES = range(0, 5)

const Phone = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 320px;
    height: 600px;
    border: 1px solid #6000ff;
    background-color: rgba(0, 0, 0, 0.8);
    transform: translate(-50%, -50%);
    border-radius: 8px;
  }

  ${LINES.slice(1).map(
    i => css`
      > :nth-child(${i + 1}) {
        background-color: transparent;
        margin-left: ${parseInt(Math.random() * 4 - 2) * 8}px;
        margin-top: ${parseInt(Math.random() * 4 - 2) * 8}px;
        opacity: 0.3;
      }
    `
  )}
`

export default props => {
  return (
    <Phone {...props}>
      {LINES.map(i => (
        <span key={i} />
      ))}
    </Phone>
  )
}
