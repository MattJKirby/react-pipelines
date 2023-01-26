import DragContainer from "../../Containers/DragContainer"
import React, { memo, useEffect, useRef, useState } from "react"
import NodeDataContext from "../../Contexts/NodeDataContext"
import { IGraphState, INode, IXYPosition } from "../../Types";
import { useStore } from "../../Hooks/useStore";
import { nodeClickHandler } from "./utils";
import { useStoreApi } from "../../Hooks/useStoreApi";
import useDrag from "../../Hooks/useDrag";

export interface NodeContainerProps {
  children: React.ReactNode;
  node: INode;
}

const selector = (s: IGraphState) => ({
  nodeDragInteraction: s.nodeDragInteraction,
  enableDraggableNodes: s.enableDraggableNodes,

  updateNodePosition: s.updateNodePosition,
  setNodeDragInteraction: s.setNodeDragInteraction,
  resetNodeDragInteraction: s.resetNodeDragInteraction,
  addSelectedNode: s.addSelectedNode,
});

const Node = ({children, node}: NodeContainerProps) => {
  const state = useStore(selector);
  const store = useStoreApi();
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(node.position);

  const handlePositionUpdate = (position: IXYPosition) => {
    if(state.enableDraggableNodes && position !== node?.position){
      setPosition(position)
      state.updateNodePosition(node.id,position)
    }
  }

  useEffect(() => {
   if(state.nodeDragInteraction !== undefined){
    isDragging ? state.setNodeDragInteraction(node.id) : state.resetNodeDragInteraction();
   }
  }
  ,[isDragging, node.id, state]);

  useDrag({nodeId: node.id, nodeRef: nodeRef, position: node.position})
  
  return (
    <NodeDataContext.Provider value={node}>
      {/* <DragContainer initPosition={node.position} onPositionUpdate={handlePositionUpdate} onDrag={setIsDragging}> */}
        <div
          ref={nodeRef}
          style={{left: `${node.position.x}px`, top: `${node.position.y}px`, position: 'fixed', userSelect: "none"}}
          onMouseDownCapture={() => nodeClickHandler({id: node.id, store: store})}
          >
          {children}
        </div>
      {/* </DragContainer> */}
    </NodeDataContext.Provider>
  )
}

export default memo(Node)