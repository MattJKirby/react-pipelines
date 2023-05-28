import React, { memo, useRef } from "react"
import NodeDataContext from "../../Contexts/NodeDataContext"
import { NodeContainerProps } from "../../Types";
import { nodeSelectHandler } from "./utils";
import { useStoreApi } from "../../Hooks/useStoreApi";
import useDrag from "../../Hooks/useDrag";
import useNodeDimensions from "../../Hooks/useNodeDimensions";

const Node = ({
  children, 
  id,
  position,
  dimensions,
  enableSelect,
  enableDrag,
  selectOnDrag,
  z
  
}: NodeContainerProps) => {
  const store = useStoreApi();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dragging = useDrag({store: store, nodeId: id, nodeRef: nodeRef, position: position, disabled: !enableDrag, selectOnDrag: selectOnDrag && enableSelect});
  useNodeDimensions({store, nodeId: id, nodeRef: nodeRef, dimensions})

  return (
    <NodeDataContext.Provider value={{
      id: id, 
      position: position
    }}>
      <div
        className="RP_Node__Container"
        ref={nodeRef}
        style={{transform: `translate(${position.x}px, ${position.y}px)`, position: 'fixed', userSelect: "none", zIndex: !dragging ? z : 9999}}
        onClickCapture={() => nodeSelectHandler({id: id, store: store, disabled: !enableSelect})}
        >
        {children}
      </div>
    </NodeDataContext.Provider>
  )
}

export default memo(Node)