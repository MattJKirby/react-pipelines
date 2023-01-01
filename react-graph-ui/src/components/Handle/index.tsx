import React, { useEffect, useRef, MouseEvent } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { useStore } from "../../Hooks/useStore";
// import { useInteractionStore } from "../../Stores/InteractionStore";
import { HandleType, IGraphState, INode } from "../../Types";
import { calculateHandleCenter } from "./utils";

/**
 * Defines what is expected on a handle component
 */
interface HandleProps {
  children?: React.ReactNode;
  id: string;
  name?: string;
  type?: string;
  edgeType?: string;
}

const selector = (s: IGraphState) => ({
  handleInteraction: s.handleInteraction,
  addHandle: s.addHandle,
  getHandle: s.getHandle,
  updateHandlePosition: s.updateHandlePosition,
  setHandleInteraction: s.setHandleInteraction,
  newHandleInteraction: s.newHandleInteraction,
  resetHandleInteraction: s.resetHandleInteraction,
});

/**
 * Node handle component
 * @param param0 
 * @returns 
 */
export const Handle = ({ children, id, name, type, edgeType }: HandleProps) => {
  const handleRef = useRef<HTMLDivElement>(null)
  const node = useNodeContext() as INode
  const handleType = type === 'target' ? HandleType.TARGET : HandleType.SOURCE;
  const handleName = name === undefined ? "handle" : name
  const {handleInteraction, addHandle, getHandle, updateHandlePosition, setHandleInteraction,  newHandleInteraction, resetHandleInteraction}  = useStore(selector)

  
  useEffect(() => {
    if(getHandle(node.id, id) === undefined && handleRef.current !== null){
      addHandle({nodeId: node.id, id: id, name: handleName, type: handleType, position: calculateHandleCenter(node.position, handleRef.current)})
    }
  })
  
  useEffect(() => {
    if(handleRef.current !== null){
      updateHandlePosition(node.id, id, (calculateHandleCenter(node.position, handleRef.current)))
    }
  }, [id, node.id, node.position, updateHandlePosition])

  const handleMouseUp = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(handleInteraction !== undefined){
      if(handleInteraction.sourceHandle.type !== type){
        setHandleInteraction({...handleInteraction, targetHandle: getHandle(node.id, id)})
        return
      } 
      resetHandleInteraction()
    }
  }

  const handleMouseDown = () => {
    const handle = getHandle(node.id, id);
    if(handle !== undefined){
      newHandleInteraction(handle, handle.position, edgeType)
    }
  }

  return (
      <div className={'flow-ui-noDrag flow-ui-noZoom'} 
        onMouseDown={() => handleMouseDown()}
        onMouseUp={(e: MouseEvent) => handleMouseUp(e)}
        style={{display: "inline-flex"}}
      >
      {children}
      {children === undefined && <div ref={handleRef} style={{height: "10px", width: "10px", borderRadius: "50%", display: "inline-block", backgroundColor: "#bbb"}}></div>}
    </div>
  )
}