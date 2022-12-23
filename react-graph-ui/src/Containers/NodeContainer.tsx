import DragContainer from "./DragContainer"
import React from "react"
import { useNodeStore } from "../Stores/NodeStore"
import NodeDataContext from "../Contexts/NodeDataContext"


export interface NodeContainerProps {
  children: React.ReactNode;
  nodeId: number
}

const NodeContainer = ({children, nodeId}: NodeContainerProps) => {
  const node = useNodeStore((state) => state.getNodeById(nodeId))
  const updateNodePosition = useNodeStore((state) => state.updateNodePosition)
  
  const handlePositionUpdate = (position: {x: number, y: number}) => {
    if(position !== node?.position){
      updateNodePosition(nodeId,position)
    }
  }


  return (
    <NodeDataContext.Provider value={node}>
      <DragContainer initPosition={node?.position} updatePosition={handlePositionUpdate}>
        {children}
      </DragContainer>
    </NodeDataContext.Provider>
  )
}

export default NodeContainer