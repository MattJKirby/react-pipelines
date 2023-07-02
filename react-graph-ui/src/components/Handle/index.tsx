import React, { useRef, MouseEvent } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { useStore } from "../../Hooks/useStore";
import { HandleProps, IGraphState, INode } from "../../Types";

const selector = (s: IGraphState) => ({
  handleInteraction: s.handleInteraction,
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
  type = 'source',
  edgeType,
  position = "left"
}: HandleProps) => {
    const handleRef = useRef<HTMLDivElement>(null)
    const node = useNodeContext() as INode
    const { handleInteraction, setHandleInteraction, resetHandleInteraction, newHandleInteraction }  = useStore(selector)



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
        <div
        className={`RP_Node__Handle RP_Node__Handle-${type} ${type}`}
        ref={handleRef}
        style={{border: "1px solid black", width: "16px", height: "16px", background: "#FFF"}}
        data-node-id={node.id}
        data-handle-id={id}
        data-id={`node_${node.id}-handle_${id}-${type}`}
        data-handle-type={type}
        data-position={position}
      >
    </div>
    )
}