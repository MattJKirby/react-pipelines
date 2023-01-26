import React, { memo, useRef } from "react"
import NodeDataContext from "../../Contexts/NodeDataContext"
import { INode } from "../../Types";
import { nodeClickHandler } from "./utils";
import { useStoreApi } from "../../Hooks/useStoreApi";
import useDrag from "../../Hooks/useDrag";

export interface NodeContainerProps {
  children: React.ReactNode;
  node: INode;
}

const Node = ({children, node}: NodeContainerProps) => {
  const store = useStoreApi();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dragging = useDrag({store: store, nodeId: node.id, nodeRef: nodeRef, position: node.position})
  
  return (
    <NodeDataContext.Provider value={node}>
      <div
        ref={nodeRef}
        style={{transform: `translate(${node.position.x}px, ${node.position.y}px)`, position: 'fixed', userSelect: "none", border: dragging ? '1px solid red' : 'none'}}
        onMouseDownCapture={() => nodeClickHandler({id: node.id, store: store})}
        >
        {children}
      </div>
    </NodeDataContext.Provider>
  )
}

export default memo(Node)