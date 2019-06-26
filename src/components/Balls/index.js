import React, { useLayoutEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useTrail, animated } from 'react-spring'
import { range } from 'ramda'

const BALL_SIZE = 16 / 2
const BALL_GAP = 16
const BALL_MAX_HEIGHT = 400
const SINES = range(0, 5)

const Balls = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  perspective: 800px;

  > * {
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: ${BALL_MAX_HEIGHT / -2}px;
  }

  ${SINES.map(
    i => css`
      > :nth-child(${i + 1}) {
        transform: translate3d(0, 0, ${i * -100}px);
        opacity: ${1 - i * 0.1};
      }
    `
  )}
`

const Svg = styled.svg`
  display: block;
  flex: 1;
  width: 100%;
  height: ${BALL_MAX_HEIGHT}px;
`

const SinesGroup = styled.g`
  ${'' /* ${SINES.map(
    i => css`
      > :nth-child(${i + 1}) {
        transform: translate3d(0, ${i * (i + 4) * -5}, i * -10);
        opacity: ${1 - i * 0.2};
      }
    `
  )} */}
`

export default props => {
  const [index, setIndex] = useState(0)
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  const [w] = size
  const tone = useRef(0)

  const balls = range(0, parseInt(w / (BALL_SIZE + BALL_GAP) - 1))
  const ballsWidth = balls.length * BALL_SIZE + (balls.length - 1) * BALL_GAP
  const [trail, setTrail] = useTrail(balls.length, () => ({
    config: {
      // friction: 13,
      tension: 400
    },
    y: 200
  }))

  useLayoutEffect(() => {
    const t = setTimeout(() => {
      setTrail({
        y: index % 2 ? 200 + 100 * tone.current : 200 - 100 * tone.current
      })
      setIndex(index + 1)
    }, 200)
    return () => {
      clearTimeout(t)
    }
  }, [index, setTrail, setIndex, w])

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }
    const updateTone = e => {
      tone.current = e.clientY / window.innerHeight
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    window.addEventListener('mousemove', updateTone)
    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('mousemove', updateTone)
    }
  }, [])

  return (
    <Balls {...props}>
      {SINES.map(nthSine => (
        <Svg key={nthSine} viewBox={`0 0 ${w} ${BALL_MAX_HEIGHT}`}>
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
          <SinesGroup
            // fill="url(#linearGradient-1dwkdokwodkowkdokwokdowkdowkodkw)"
            // stroke="#f0f"
            // stroke="url(#linearGradient-1dwkdokwodkowkdokwokdowkdowkodkw)"
            stroke="#E100FF"
          >
            {/* {trail.map(({ y }, i) => (
              <animated.circle
                r={BALL_SIZE / 2}
                key={i}
                cx={i * (BALL_SIZE + BALL_GAP) + (w - ballsWidth) / 2}
                cy={y}
              />
            ))} */}

            {/* <animated.path
              d={trail
                .map(({ y }, i) => {
                  const x = i * (BALL_SIZE + BALL_GAP) + (w - ballsWidth) / 2
                  return `${i === 0 ? 'M' : ''}${x}, ${y.value}`
                })
                .join(' ')}
            /> */}

            {trail.map(({ y }, i, a) => {
              if (!a[i + 1]) return null
              return (
                <animated.line
                  key={i}
                  x1={i * (BALL_SIZE + BALL_GAP) + (w - ballsWidth) / 2}
                  y1={y}
                  x2={(i + 1) * (BALL_SIZE + BALL_GAP) + (w - ballsWidth) / 2}
                  y2={a[i + 1].y}
                />
              )
            })}
          </SinesGroup>
        </Svg>
      ))}
    </Balls>
  )
}
