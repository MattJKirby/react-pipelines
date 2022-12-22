import DragContainer from "./DragContainer"
import { useRef } from "react"
import React from "react"
import { useNodeStore } from "../Stores/NodeStore"
import NodeIdContext from '../Contexts/NodeIdContext'
import NodeDataContext from "../Contexts/NodeDataContext"


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
      <NodeDataContext.Provider value={nodeData}>
        {children}
      </NodeDataContext.Provider>
    </DragContainer>
  )
}

export default NodeContainer