import Draggable from "../draggable"
import { createRef } from "react"
import React from "react"
import { useNodeStore } from "../Stores/NodeStore"

interface NodeProps {
  children: React.ReactNode;
  nodeData: any
}

const NodeContainer = ({children, nodeData}: NodeProps) => {
  const nodeRef = createRef<HTMLDivElement>()
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

export default NodeContainer