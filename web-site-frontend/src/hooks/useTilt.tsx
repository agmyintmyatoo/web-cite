import { useRef, useState, useEffect, CSSProperties } from 'react'

export default function useTilt() {
  const ref = useRef(null)
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const elem = ref.current as HTMLElement

  useEffect(() => {
    if (elem) {
      elem.addEventListener('mousemove', handleMouseMove)
      elem.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      elem?.removeEventListener('mousemove', handleMouseMove)
      elem?.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  const handleMouseLeave = () => {
    setPoint({ x: 0, y: 0 })
    elem.style.removeProperty('--mouse-x')
    elem.style.removeProperty('--mouse-y')
  }
  const handleMouseMove = (e: MouseEvent) => {
    // https://stackoverflow.com/a/10109204/12632314

    // element box size
    const rect = elem.getBoundingClientRect()
    // mouse position relative to the element
    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top
    // percentage of the relative position
    const relativeXPercent = (100 / rect.width) * relativeX
    const relativeYPercent = (100 / rect.height) * relativeY
    // from center and limit
    const limit = 10
    const x = (relativeXPercent - 50) / limit
    const y = (relativeYPercent - 50) / limit
    
    elem.style.setProperty('--mouse-x', x + 'deg')
    elem.style.setProperty('--mouse-y', y + 'deg')
    setPoint({ x, y })
  }

  // CAUTION: Better use external CSS to set the transform origin
  const style: CSSProperties = {
    transform: `perspective(1000px) rotateX(${point.y}deg) rotateY(${point.x}deg) scaleZ(1.05)`,
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
  }

  return { elemRef: ref, point, style }
}