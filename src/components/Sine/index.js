import React, { useLayoutEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { range } from 'ramda'

const lines = range(0, 10)

const Sine = styled.svg`
  display: block;
  margin: 0;
  width: 100vw;
  height: 200px;

  ${lines.map(
    i => css`
      > :nth-child(${i + 1}) {
        transform: translate(${i % 2 ? i * -40 : i * 40}px, 0);
        opacity: ${1 - i * 0.1};
      }
    `
  )}
`

const SinePath = styled(animated.path)`
  animation-name: ${keyframes`
    0% {
      transform: translate3d(0,0,0);
    }
    100% {
      transform: translate3d(-1200px,0,0);
    }
  `};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  :nth-child(even) {
    animation-name: ${keyframes`
      0% {
        transform: translate3d(1200px,0,0);
      }
      100% {
        transform: translate3d(0,0,0);
      }
    `};
  }
`

export default () => {
  const [animation, setAnimation] = useSpring(() => ({
    sineSize: 100,
    from: {
      sineSize: 0
    }
  }))
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  const [w, h] = size
  const sineMiddle = 100

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  const { sineSize } = animation
  const sineD = sineSize.interpolate(
    x =>
      `M0,${sineMiddle + x} C150,${sineMiddle + x} 150,${sineMiddle -
        x} 300,${sineMiddle - x} C450,${sineMiddle - x} 450,${sineMiddle +
        x} 600,${sineMiddle + x} C750,${sineMiddle + x} 750,${sineMiddle -
        x} 900,${sineMiddle - x} C1050,${sineMiddle -
        x} 1051.25414,${sineMiddle + x} 1200,${sineMiddle + x}`
  )

  return (
    <Sine viewBox={`0 0 ${w} 200`}>
      <defs>
        <linearGradient
          x1="50%"
          y1="50%"
          x2="50%"
          y2="100%"
          id="linearGradient-1dwkdokwodkowkdokwokdowkdowkodkw"
        >
          <stop stopColor="#E100FF" offset="0%"></stop>
          <stop stopColor="#6000FF" stopOpacity="0.5" offset="100%"></stop>
        </linearGradient>
      </defs>
      {lines.map(i => (
        <g
          key={i}
          stroke="url(#linearGradient-1dwkdokwodkowkdokwokdowkdowkodkw)"
          fill="none"
        >
          <SinePath d={sineD} />
          <SinePath d={sineD} />
        </g>
      ))}
    </Sine>
  )
}
