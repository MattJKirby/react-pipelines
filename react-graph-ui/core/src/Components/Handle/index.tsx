import React, { useRef, memo } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { HandleProps, INode } from "../../Types";
import styles from '../../Styles/Handle/Handle.module.css'
import InsertHelper from "./insertHelper";
import { getUniqueHandleId } from "./utils";

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
    
    return (

      <div
        className={`RP_Node__Handle RP_Node__Handle-${type} ${type} ${styles['RP_Node__Handle-' + position]} ${styles['RP_Node__Handle']}`}
        ref={handleRef}
        style={{position: 'absolute'}}
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
                  width: '16px',
                  height: '16px',
                  border: '1px dashed #ccc',
                  borderRadius: "4px",
                  background: "#fff",
                  color: '#ccc',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  +
              </div>
            </InsertHelper>
          }

      </div>  
    )
}

export default memo(Handle)