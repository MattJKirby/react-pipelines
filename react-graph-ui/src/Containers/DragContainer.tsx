/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3-drag'
import {select} from 'd3-selection'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '../Hooks/useStore';
import { ITransform } from '../Types';

interface DraggableProps {
  children: React.ReactNode;
  initPosition: {x: number, y: number};
  onPositionUpdate: (posiiton: {x: number, y: number}) => void;
  onDrag: (isDragging: boolean) => void;
}

export const DragContainer = ({children, initPosition, onPositionUpdate, onDrag}: DraggableProps) => {
  const flowDraggable = useRef<HTMLDivElement>(null)
  const transform = useStore<ITransform>((state) => state.graphTransform)
  const [position, setPosition] = useState(initPosition);
  const dragFilter = (e: any) => e.target.closest('.flow-ui-noDrag') === null;

  useEffect(() => {
    const drag = d3.drag().on('drag', (event) => {setPosition({x: position.x + event.x / transform.scale, y: position.y + event.y / transform.scale})
    }).subject(() => {
      onDrag(true);
      const selection = select(flowDraggable.current as Element)
      return {x: selection.attr('x'), y: selection.attr('y')}
    }).filter((e) => dragFilter(e)).on('end', () => onDrag(false))

    select(flowDraggable.current as Element).call(drag)
  }, [onDrag, position, transform])

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