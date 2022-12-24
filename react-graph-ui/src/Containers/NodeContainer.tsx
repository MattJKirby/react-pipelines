import DragContainer from "./DragContainer"
import React, { useEffect, useState } from "react"
import { useNodeStore } from "../Stores/NodeStore"
import NodeDataContext from "../Contexts/NodeDataContext"
import { INodeData } from "../Components/Node/INodeData";
import { useInteractionStore } from "../Stores/InteractionStore";


export interface NodeContainerProps {
  children: React.ReactNode;
  node: INodeData;
}

const NodeContainer = ({children, node}: NodeContainerProps) => {
  const updateNodePosition = useNodeStore((state) => state.updateNodePosition)
  const {setDragNode, resetDragNode} = useInteractionStore()
  const [isDragging, setIsDragging] = useState(false)
  
  const handlePositionUpdate = (position: {x: number, y: number}) => {
    if(position !== node?.position){
      updateNodePosition(node.id,position)
    }
  }

  useEffect(() => {
    if(isDragging){
      setDragNode(node.id)
    } else {
      resetDragNode()
    }
  },[isDragging, node.id, resetDragNode, setDragNode])

  return (
    <NodeDataContext.Provider value={node}>
      <DragContainer initPosition={node.position} onPositionUpdate={handlePositionUpdate} onDrag={setIsDragging}>
        {children}
      </DragContainer>
    </NodeDataContext.Provider>
  )
}

export default NodeContainer