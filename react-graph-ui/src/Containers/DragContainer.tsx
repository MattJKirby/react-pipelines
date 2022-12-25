import * as d3 from 'd3-drag'
import {select} from 'd3-selection'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import useTransformStore from '../Stores/TransformStore'
import { useZoomContextStore } from '../Stores/ZoomContextStore'

interface DraggableProps {
  children: React.ReactNode;
  initPosition: {x: number, y: number};
  onPositionUpdate: (posiiton: {x: number, y: number}) => void;
  onDrag: (isDragging: boolean) => void;
}

export const DragContainer = ({children, initPosition, onPositionUpdate, onDrag}: DraggableProps) => {
  const flowDraggable = useRef<HTMLDivElement>(null)
  const scale = useTransformStore((state) => state.transform.scale)
  const [position, setPosition] = useState(initPosition);
  const dragFilter = (e) => e.target.closest('.flow-ui-noDrag') === null;

  useEffect(() => {
    const drag = d3.drag().on('drag', (event) => {setPosition({x: position.x + event.x / scale, y: position.y + event.y / scale})
    }).subject(() => {
      onDrag(true);
      const selection = select(flowDraggable.current as Element)
      return {x: selection.attr('x'), y: selection.attr('y')}
    }).filter((e) => dragFilter(e)).on('end', () => onDrag(false))

    select(flowDraggable.current as Element).call(drag)
  }, [onDrag, position, scale])

  useEffect(() => {
    onPositionUpdate(position)
},[position, onPositionUpdate])
  
  return (
    <div ref={flowDraggable}>
      {children}
    </div>
    
  )
}

export default DragContainer