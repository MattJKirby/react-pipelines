import * as d3 from 'd3-drag'
import {select} from 'd3-selection'
import { useEffect, useRef, useState } from 'react'

interface DraggableProps {
  children: React.ReactNode
  transform: any
  setPosition: (x: number, y: number) => void
}

export const Draggable = ({children, transform, setPosition}: DraggableProps) => {
  const flowDraggable = useRef<HTMLDivElement>(null)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const drag = d3.drag().subject(() => {
      const selection = select(flowDraggable.current as Element)
      return{x: selection.attr('x'), y: selection.attr('y')}
    }).on('drag', (event) => {
      setY(y + event.y / transform.k)
      setX(x + event.x / transform.k)
    }).filter((e) => dragFilter(e))

    select(flowDraggable.current as Element).call(drag)
  }, [setX, setY, transform, x, y])

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