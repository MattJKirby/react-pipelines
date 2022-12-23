import DragContainer from "./DragContainer"
import React from "react"
import { useNodeStore } from "../Stores/NodeStore"
import NodeDataContext from "../Contexts/NodeDataContext"
import { INodeData } from "../Components/Node/INodeData";


export interface NodeContainerProps {
  children: React.ReactNode;
  node: INodeData;
}

const NodeContainer = ({children, node}: NodeContainerProps) => {
  const updateNodePosition = useNodeStore((state) => state.updateNodePosition)
  
  const handlePositionUpdate = (position: {x: number, y: number}) => {
    if(position !== node?.position){
      updateNodePosition(node.id,position)
    }
  }

  return (
    <NodeDataContext.Provider value={node}>
      <DragContainer initPosition={node.position} updatePosition={handlePositionUpdate}>
        {children}
      </DragContainer>
    </NodeDataContext.Provider>
  )
}

export default NodeContainer