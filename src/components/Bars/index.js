import React, { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { useSprings, animated } from 'react-spring'
import { range } from 'ramda'

const BAR_WIDTH = 16 * 4
const BAR_GAP = 16 * 2
const BAR_MAX_HEIGHT = 400

const Bars = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`

const Svg = styled.svg`
  display: block;
  flex: 1;
  margin: 0;
  width: 100%;
  height: ${BAR_MAX_HEIGHT}px;
`

export default props => {
  const [index, setIndex] = useState(0)
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  const [w] = size

  const bars = range(0, parseInt(w / (BAR_WIDTH + BAR_GAP) - 1))
  const barDelay = 400 / bars.length
  const barsWidth = bars.length * BAR_WIDTH + (bars.length - 1) * BAR_GAP

  const [springs, setSprings] = useSprings(bars.length, i => ({
    height: BAR_MAX_HEIGHT,
    from: { height: 0 },
    delay: i * barDelay
  }))

  useLayoutEffect(() => {
    const t = setTimeout(async () => {
      const height = Math.random() * BAR_MAX_HEIGHT
      await setSprings(i => ({
        height,
        delay: i * 12
      }))
      setIndex(index + 1)
    }, barDelay * bars.length * 2)
    return () => {
      clearTimeout(t)
    }
  }, [index, barDelay, bars.length, setSprings])

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

  return (
    <Bars {...props}>
      <Svg viewBox={`0 0 ${w} ${BAR_MAX_HEIGHT}`}>
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
        <g
          stroke="url(#linearGradient-1dwkdokwodkowkdokwokdowkdowkodkw)"
          fill="none"
        >
          {springs.map(({ height }, i) => (
            <animated.rect
              rx={8}
              key={i}
              width={BAR_WIDTH}
              height={height}
              x={i * (BAR_WIDTH + BAR_GAP) + (w - barsWidth) / 2}
              y={height.interpolate(height => {
                const h = height // / (i + 1)
                return (BAR_MAX_HEIGHT - h) / 2
              })}
            />
          ))}
        </g>
      </Svg>
    </Bars>
  )
}
