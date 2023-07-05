import React, { useRef, MouseEvent } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { useStore } from "../../Hooks/useStore";
import { HandleProps, IGraphState, INode } from "../../Types";
import styles from '../../Styles/Handle/Handle.module.css'
import InsertHelper from "./insertHelper";
import { getUniqueHandleId } from "./utils";

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
    const handleId = getUniqueHandleId(node.id, id);
    const { handleInteraction, setHandleInteraction, resetHandleInteraction, newHandleInteraction }  = useStore(selector);
    


    return (

      <div
        className={`RP_Node__Handle RP_Node__Handle-${type} ${type} ${styles['RP_Node__Handle-' + position]}`}
        ref={handleRef}
        style={{border: "1px solid black", width: "16px", height: "16px", position: 'absolute'}}
        data-node-id={node.id}
        data-handle-id={handleId}
        data-id={`${handleId}-${type}`}
        data-handle-type={type}
        data-position={position}
      >
      </div>  
    )
}