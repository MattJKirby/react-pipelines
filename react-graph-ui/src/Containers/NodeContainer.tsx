import DragContainer from "./DragContainer"
import { createRef } from "react"
import React from "react"
import { useNodeStore } from "../Stores/NodeStore"
import { Provider } from '../NodeIdContext'

interface NodeProps {
  children: React.ReactNode;
  nodeData: any
}

const NodeContainer = ({children, nodeData}: NodeProps) => {
  const updateStoredPosition = useNodeStore((state) => state.updateNodePosition)
  
  const updatePosition = (x: number, y: number) => {
    if(x !== nodeData.position?.x && y !== nodeData.position?.y){
      updateStoredPosition(nodeData.id, x, y)
    }
  }

  return (
    <DragContainer key={nodeData.id} initPosition={nodeData.position} updatePosition={updatePosition}>
      <Provider value={nodeData.id}>
        {children}
      </Provider>
    </DragContainer>
  )
}

export default NodeContainer