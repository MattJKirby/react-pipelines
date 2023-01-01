import DragContainer from "../../Containers/DragContainer"
import React, { useEffect, useState } from "react"
import NodeDataContext from "../../Contexts/NodeDataContext"
import { IGraphState, INode, IXYPosition } from "../../Types";
import { useStore } from "../../Hooks/useStore";


export interface NodeContainerProps {
  children: React.ReactNode;
  node: INode;
}

const selector = (s: IGraphState) => ({
  nodeDragInteraction: s.nodeDragInteraction,
  updateNodePosition: s.updateNodePosition,
  setNodeDragInteraction: s.setNodeDragInteraction,
  resetNodeDragInteraction: s.resetNodeDragInteraction,
});

const Node = ({children, node}: NodeContainerProps) => {
  const {updateNodePosition, setNodeDragInteraction, resetNodeDragInteraction} = useStore(selector)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(node.position)
  
  const handlePositionUpdate = (position: IXYPosition) => {
    if(position !== node?.position){
      setPosition(position)
      updateNodePosition(node.id,position)
    }
  }

  useEffect(() => isDragging ? setNodeDragInteraction(node.id) : resetNodeDragInteraction()
  ,[isDragging, node.id, resetNodeDragInteraction, setNodeDragInteraction])
  
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