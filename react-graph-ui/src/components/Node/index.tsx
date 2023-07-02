import React, { memo, useRef } from "react"
import NodeDataContext from "../../Contexts/NodeDataContext"
import { NodeContainerProps } from "../../Types";
import { nodeSelectHandler } from "./utils";
import { useStoreApi } from "../../Hooks/useStoreApi";
import useDrag from "../../Hooks/useDrag";
import useTrackNodeDOMUpdates from "../../Hooks/useTrackNodeDOMUpdates";


const Node = ({
  children, 
  id,
  position,
  enableSelect,
  enableDrag,
  selectOnDrag,
  z,
  selected
  
}: NodeContainerProps) => {
  const store = useStoreApi();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dragging = useDrag({store: store, nodeId: id, nodeRef: nodeRef, position, disabled: !enableDrag, selectOnDrag: selectOnDrag && enableSelect});
  const dimensions = useTrackNodeDOMUpdates({store, nodeId: id, nodeRef: nodeRef, position});

  

  return (
    <NodeDataContext.Provider value={{
      id: id, 
      position,
      selected
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