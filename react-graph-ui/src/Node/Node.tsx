import Draggable from "../draggable"
import { NodeOutput } from "../components/outputs/nodeOutput"
import { createRef, useEffect, useRef, useState } from "react"
import React from "react"
import { useNodeStore } from "../stores/nodeStore"

interface NodeProps {
  children: React.ReactNode;
  nodeData: any
}

const Node = ({children, nodeData}: NodeProps) => {
  const nodeRef = createRef<HTMLDivElement>()
  const nodes = useNodeStore((state) => state.nodes)
  const updateStoredPosition = useNodeStore((state) => state.updateNodePosition)
  
  
  const updatePosition = (x: number, y: number) => {
    if(x !== nodeData.position?.x && y !== nodeData.position?.y){
      updateStoredPosition(nodeData.id, x, y)
    }
  }

  return (
    <Draggable key={nodeData.id} initPosition={nodeData.position} updatePosition={updatePosition}>
      <div ref={nodeRef}>
        {children}
      </div>
    </Draggable>
  )
}

export default Node