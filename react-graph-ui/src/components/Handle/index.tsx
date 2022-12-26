import React, { useEffect, useRef } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { useEdgeStore } from "../../Stores/EdgeStore";
import { useInteractionStore } from "../../Stores/InteractionStore";
import { useNodeIOStore } from "../../Stores/NodeIOStore";
import { INodeData } from "../Node/INodeData";
import { calculateHandleCenter } from "./utils";

/**
 * Defines what is expected on a handle component
 */
interface HandleProps {
  children?: React.ReactNode;
  id: string;
  type?: string;
}

/**
 * Node handle component
 * @param param0 
 * @returns 
 */
export const Handle = ({ children, type, id }: HandleProps) => {
  const handleRef = useRef<HTMLDivElement>(null)
  const nodeData = useNodeContext() as INodeData
  const isTarget = type === 'target'
  const {registerNodeHandle, updateHandlePosition, getHandle}  = useNodeIOStore()
  const {newEdgeInteraction, setEdgeInteraction, resetEdgeInteraction, edgeInteraction} = useInteractionStore()
  
  useEffect(() => {
    if(getHandle(nodeData.id, id) === undefined && handleRef.current !== null){
      registerNodeHandle({nodeId: nodeData.id, id: id, isTarget: isTarget, position: calculateHandleCenter(nodeData.position, handleRef.current)})
    }
  }, [getHandle, id, isTarget, nodeData, registerNodeHandle])
  
  useEffect(() => {
    if(handleRef.current !== null){
      updateHandlePosition(nodeData.id, id, (calculateHandleCenter(nodeData.position, handleRef.current)))
    }
  }, [id, nodeData.id, nodeData.position, updateHandlePosition])

  const handleMouseUp = (e) => {
    e.stopPropagation();
    e.preventDefault()
    if(edgeInteraction !== undefined){
      const handle = getHandle(edgeInteraction.sourceNodeId, edgeInteraction.sourceHandleId)
      
      if(handle?.isTarget !== isTarget){
        setEdgeInteraction({...edgeInteraction, targetNodeId: nodeData.id, targetHandleId: id})
        return
      } 
      resetEdgeInteraction()
    }
  }

  return (
      <div className={'flow-ui-noDrag flow-ui-noZoom'} 
        onMouseDown={() => newEdgeInteraction(nodeData.id,id)}
        onMouseUp={(e) => handleMouseUp(e)}
        style={{display: "inline-flex"}}
      >
      {children}
      {children === undefined && <div ref={handleRef} style={{height: "10px", width: "10px", borderRadius: "50%", display: "inline-block", backgroundColor: "#bbb"}}></div>}
    </div>
  )
}