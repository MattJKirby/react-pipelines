import DragContainer from "../../Containers/DragContainer"
import React, { useEffect, useState } from "react"
import NodeDataContext from "../../Contexts/NodeDataContext"
import { INodeData } from "./INodeData";
import { useInteractionStore } from "../../Stores/InteractionStore";
import { IGraphState } from "../../Types";
import { useStore } from "../../Hooks/useStore";


export interface NodeContainerProps {
  children: React.ReactNode;
  node: INodeData;
}

const selector = (s: IGraphState) => ({
  updateNodePosition: s.updateNodePosition
});

const Node = ({children, node}: NodeContainerProps) => {
  const {updateNodePosition} = useStore(selector)
  const {setDragInteractionNode: setDragNode, resetDragNode} = useInteractionStore()
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(node.position)
  
  const handlePositionUpdate = (position: {x: number, y: number}) => {
    if(position !== node?.position){
      setPosition(position)
      updateNodePosition(node.id,position)
    }
  }

  useEffect(() => isDragging ? setDragNode(node.id) : resetDragNode()
  ,[isDragging, node.id, resetDragNode, setDragNode])
  
  return (
    <NodeDataContext.Provider value={node}>
      <DragContainer initPosition={node.position} onPositionUpdate={handlePositionUpdate} onDrag={setIsDragging}>
        <div style={{zIndex: '1', left: `${position.x}px`, top: `${position.y}px`, position: 'fixed', userSelect: "none"}}>
          {children}
        </div>
      </DragContainer>
    </NodeDataContext.Provider>
  )
}

export default Node