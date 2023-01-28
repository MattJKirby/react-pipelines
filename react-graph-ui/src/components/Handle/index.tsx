import React, { useEffect, useRef, MouseEvent } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { useStore } from "../../Hooks/useStore";
import { HandleProps, IGraphState, INode } from "../../Types";
import { calculateHandleCenter } from "./utils";
import styles from '../../Styles/Handle/DefaultHandle.module.css'

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
export const Handle = ({ 
  children, 
  id, 
  name, 
  type = 'source',
  edgeType
}: HandleProps) => {
    const handleRef = useRef<HTMLDivElement>(null)
    const node = useNodeContext() as INode
    const handleName = name === undefined ? "handle" : name
    const { handleInteraction, getHandle, addHandle, updateHandlePosition, setHandleInteraction, resetHandleInteraction, newHandleInteraction }  = useStore(selector)
 
    useEffect(() => {
      if(handleRef.current !== null && getHandle(node.id, id) === undefined){
        addHandle(node.id, {nodeId: node.id, id: id, name: handleName, type: type, position: calculateHandleCenter(node.position, handleRef.current)})
      }
    })
    
    useEffect(() => {
      if(handleRef.current !== null){
        const handlePosition = calculateHandleCenter(node.position, handleRef.current);
        updateHandlePosition(node.id, id, handlePosition);
      }
    }, [id, node.id, node.position, getHandle, updateHandlePosition])

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
        <div className={`flow-ui-noDrag flow-ui-noZoom ${styles.RP_DefaultHandle__Wrapper} ${type === 'source' ? styles.RP_Handle_Source : null}`} 
          onMouseDown={() => handleMouseDown()}
          onMouseUp={(e: MouseEvent) => handleMouseUp(e)}
        >
        {children}
        {children === undefined && 
        <div
          ref={handleRef} 
          className={styles.RP_DefaultHandle__Container}>
        </div>}
      </div>
    )
}