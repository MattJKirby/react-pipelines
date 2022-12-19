import * as d3 from 'd3-drag'
import {select} from 'd3-selection'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import useTransformStore from './stores/transformStore'

interface DraggableProps {
  children: React.ReactNode
  setPosition: (x: number, y: number) => void
}

export const Draggable = ({children, setPosition}: DraggableProps) => {
  const flowDraggable = useRef<HTMLDivElement>(null)
  const scale = useTransformStore((state) => state.scale)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const drag = d3.drag().on('drag', (event) => {
      setY(y + event.y / scale)
      setX(x + event.x / scale)
    }).subject(() => {
      const selection = select(flowDraggable.current as Element)
      return {x: selection.attr('x'), y: selection.attr('y')}
    }).filter((e) => dragFilter(e))

    select(flowDraggable.current as Element).call(drag)
  }, [scale, setX, setY, x, y])

  useEffect(() => {
    const x = flowDraggable.current?.offsetLeft
    const y = flowDraggable.current?.offsetTop

    if(x !== undefined && y !== undefined){
      setPosition(x,y)
    }
    
  },[setPosition, x, y])

  const dragFilter = (e) => {
    const className = e.target.classList.contains('flow-ui-noDrag')
    return !className
  }
  

  return (
    <div style={{zIndex: '1', left: `${x}px`, top: `${y}px`, position: 'fixed'}} ref={flowDraggable}>
      {children}
    </div>
    
  )
}

export default Draggable