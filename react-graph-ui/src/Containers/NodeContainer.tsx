import DragContainer from "./DragContainer"
import React from "react"
import { useNodeStore } from "../Stores/NodeStore"
import NodeDataContext from "../Contexts/NodeDataContext"
import { INodeData } from "../Components/Node/INodeData"


export interface NodeContainerProps {
  children: React.ReactNode;
  nodeData: INodeData
}

const NodeContainer = ({children, nodeData}: NodeContainerProps) => {
  const updateNodePosition = useNodeStore((state) => state.updateNodePosition)
  
  const handlePositionUpdate = (x: number, y: number) => {
    if(x !== nodeData.position?.x && y !== nodeData.position?.y){
      updateNodePosition(nodeData.id, x, y)
    }
  }

  return (
    <NodeDataContext.Provider value={nodeData}>
      <DragContainer key={nodeData.id} initPosition={nodeData.position} updatePosition={handlePositionUpdate}>
        {children}
      </DragContainer>
    </NodeDataContext.Provider>
  )
}

export default NodeContainer