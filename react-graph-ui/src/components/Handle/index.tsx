import React, { useRef, MouseEvent, memo } from "react"
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
const Handle = ({ 
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

          {handleRef.current && node.selected && type === 'source' &&
            <InsertHelper position={position} handleElement={handleRef.current}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  border: '2px dashed #ccc',
                  borderRadius: "8px",
                  background: "#fff"
              
                }}>
              </div>
            </InsertHelper>
          }

      </div>  
    )
}

export default memo(Handle)