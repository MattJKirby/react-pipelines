import * as d3 from 'd3-drag'
import {select} from 'd3-selection'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import useTransformStore from '../Stores/TransformStore'
import { useZoomContextStore } from '../Stores/ZoomContextStore'

interface DraggableProps {
  children: React.ReactNode;
  initPosition?: {x: number, y: number};
  updatePosition: (posiiton: {x: number, y: number}) => void
}

export const DragContainer = ({children, initPosition, updatePosition}: DraggableProps) => {
  const flowDraggable = useRef<HTMLDivElement>(null)
  const scale = useTransformStore((state) => state.transform.scale)
  const zoomContextPosition = useZoomContextStore((state) => state.contextPosition);
  const [position, setPosition] = useState(initPosition != undefined ? initPosition : {x: -zoomContextPosition.offsetX, y: -zoomContextPosition.offsetY});
  const dragFilter = (e: d3.D3DragEvent) => e.target.closest('.flow-ui-noDrag') === null;

  useEffect(() => {
    const drag = d3.drag().on('drag', (event) => {setPosition({x: position.x + event.x / scale, y: position.y + event.y / scale})
    }).subject(() => {
      const selection = select(flowDraggable.current as Element)
      return {x: selection.attr('x'), y: selection.attr('y')}
    }).filter((e) => dragFilter(e))

    select(flowDraggable.current as Element).call(drag)
  }, [position, scale])

  useEffect(() => {
    updatePosition(position)
},[position, updatePosition])
  
  return (
    <div style={{zIndex: '1', left: `${position.x}px`, top: `${position.y}px`, position: 'fixed'}} ref={flowDraggable}>
      {children}
    </div>
    
  )
}

export default DragContainer