import React, { useEffect, useRef, useState } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { useNodeIOStore } from "../../Stores/NodeIOStore";
import { INodeData } from "../Node/INodeData";



interface HandleProps {
  children?: React.ReactNode;
  id: string;
  type?: string;
}

const calculateHandlePosition = (nodePosition: {x: number, y: number}, handleRef: HTMLDivElement | null) => {
  if(handleRef !== null){
    const x = nodePosition.x + handleRef.offsetLeft + (handleRef.offsetWidth / 2)
    const y = nodePosition.y + handleRef.offsetTop + (handleRef.offsetHeight / 2)
    return {x: x, y: y}
  }
  return {x: 0, y: 0}
}

export const Handle = ({ children, type, id }: HandleProps) => {
  const nodeData = useNodeContext() as INodeData
  const registerNodeHandle = useNodeIOStore((state) => state.registerNodeHandle)
  const getHandle = useNodeIOStore((state) => state.getHandle)
  const updateHandlePosition = useNodeIOStore((state) => state.updateHandlePosition)
  const handleRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(calculateHandlePosition(nodeData.position, handleRef.current))
  const isTarget = type === 'target'
  

  useEffect(() => {
    if(getHandle(nodeData.id, id) === undefined){
      registerNodeHandle({nodeId: nodeData.id, id: id, isTarget: isTarget, position: pos})
    }
  }, [getHandle, id, isTarget, nodeData, pos, registerNodeHandle])
  
  useEffect(() => {
    updateHandlePosition(nodeData.id, id, (calculateHandlePosition(nodeData.position, handleRef.current)))
  }, [id, nodeData.id, nodeData.position, updateHandlePosition])


  return (
    <div  className={'flow-ui-noDrag flow-ui-noZoom'} style={{justifyContent: isTarget ? "start" : "end"}}>
      {children}
      {children === undefined && <span ref={handleRef} style={{height: "10px", width: "10px", borderRadius: "50%", display: "inline-block", backgroundColor: "#bbb"}}></span>}
    </div>
  )
}