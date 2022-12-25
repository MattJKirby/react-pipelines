import React, { useEffect, useRef } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { useInteractionStore } from "../../Stores/InteractionStore";
import { useNodeIOStore } from "../../Stores/NodeIOStore";
import { INodeData } from "../Node/INodeData";

/**
 * Defines what is expected on a handle component
 */
interface HandleProps {
  children?: React.ReactNode;
  id: string;
  type?: string;
}

/**
 * Helper method for calculating handle center
 * @param nodePosition 
 * @param handleRef 
 * @returns 
 */
const calculateHandleCenter = (nodePosition: {x: number, y: number}, handleRef: HTMLDivElement) => {
  const x = nodePosition.x + handleRef.offsetLeft + (handleRef.offsetWidth / 2)
  const y = nodePosition.y + handleRef.offsetTop + (handleRef.offsetHeight / 2)
  return {x: x, y: y}
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
  const {newEdgeInteraction, resetEdgeInteraction} = useInteractionStore()
  
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


  return (
      <div className={'flow-ui-noDrag flow-ui-noZoom'} 
        onMouseDown={() => newEdgeInteraction(nodeData.id,id)}
        onMouseUp={() => resetEdgeInteraction()}
        style={{display: "inline-flex"}}
      >
      {children}
      {children === undefined && <div ref={handleRef} style={{height: "10px", width: "10px", borderRadius: "50%", display: "inline-block", backgroundColor: "#bbb"}}></div>}
    </div>
  )
}