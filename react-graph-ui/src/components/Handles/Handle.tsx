import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import DragContainer from "../../Containers/DragContainer";
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { useInteractionStore } from "../../Stores/InteractionStore";
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
  const {registerNodeHandle, updateHandlePosition}  = useNodeIOStore()
  const getHandle = useNodeIOStore((state) => state.getHandle)
  const {setEdgeInteractionSourceHandleId, resetEdgeInteractionSourceHandleId, edgeInteractionSourceHandleId} = useInteractionStore()
  const handleRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
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

  // useEffect(() => {
  //   console.log("AJDLKFJDHKLJ")
  //   const element = handleRef.current

    
  //     element?.addEventListener("drag", (e) => console.log("asdf"))
  //     handleRef.current?.addEventListener("drag", () => , false)

  //     // return () => {
  //     //   element?.removeEventListener('click', setEdgeInteractionSourceHandleId(id), false);
  //     // };
    
  // },[id, setEdgeInteractionSourceHandleId])

  const handleDragStart = (e) => {
    setEdgeInteractionSourceHandleId(id)
     e.dataTransfer.setDragImage(dragRef.current, 10, 10);
    
  }

  const handleDragEnd = (e) => {
    console.log("ASDF")
    resetEdgeInteractionSourceHandleId()
    e.preventDefault();
  }

  useEffect(() => {
    
    console.log(edgeInteractionSourceHandleId)
  }, [edgeInteractionSourceHandleId])




  return (
  
      <div className={'flow-ui-noDrag flow-ui-noZoom'} draggable={true} onDragStart={(e) => handleDragStart(e)}  onDrag={(e) => handleDragEnd(e)} style={{justifyContent: isTarget ? "start" : "end", border: "1px solid red", display: "inline-flex"}}>
      {children}
      {children === undefined && <div draggable={false} ref={handleRef} style={{height: "10px", width: "10px", borderRadius: "50%", display: "inline-block", backgroundColor: "#bbb"}}></div>}
      <div draggable={false} ref={dragRef} style={{opacity: "0", width: "10px", height: "10px", position: "absolute"}}></div>
    </div>
    
    
  )
}