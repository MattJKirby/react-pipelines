import { useRef, memo } from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { HandleProps, INode } from "../../Types";
import styles from '../../Styles/Handle/Handle.module.css'
import InsertHelper from "./insertHelper";
import { getUniqueHandleId } from "./utils";
import { IGraphState } from "../../Types";
import { useStore } from "../../Hooks/useStore";

const selector = (s: IGraphState) => ({
  selectedHandle: s.selectedHandle,
  setSelectedHandle: s.setSelectedHandle,
  addEdge: s.addEdge
})

/**
 * Node handle component
 * @param param0 
 * @returns 
 */
const Handle = ({ 
  children, 
  id, 
  type = 'source',
  edgeType = 'default',
  position = "left"
}: HandleProps) => {
    const handleRef = useRef<HTMLDivElement>(null)
    const node = useNodeContext() as INode
    const handleId = getUniqueHandleId(node.id, id);
    const { selectedHandle, setSelectedHandle, addEdge } = useStore(selector)

    const handleSelectionInteraction = () => {
      if (selectedHandle === null) {
        setSelectedHandle({ sourceHandle: id, sourceNode: node.id, sourceHandleType: type, uniqueHandleId: handleId });
      } else if (selectedHandle.uniqueHandleId === handleId) {
        setSelectedHandle(null);
      } else if (type !== selectedHandle.sourceHandleType) {
        const sourceHandle = type === 'source' ? id : selectedHandle.sourceHandle;
        const sourceNode = type === 'source' ? node.id : selectedHandle.sourceNode;
        const targetHandle = type === 'target' ? id : selectedHandle.sourceHandle;
        const targetNode = type === 'target' ? node.id : selectedHandle.sourceNode;
        const edgeId = `edge-${sourceNode}_${sourceHandle}-${targetNode}_${targetHandle}`;
    
        addEdge([{ item: { id: edgeId, sourceNodeId: sourceNode, sourceNodeOutput: sourceHandle, targetNodeId: targetNode, targetNodeInput: targetHandle, type: edgeType } }]);
        setSelectedHandle(null);
      } else {
        setSelectedHandle(null);
      }
    }

    const isValidHandle = (): boolean => {
      if(!selectedHandle){
        return false
      }

      if(selectedHandle.sourceHandleType !== type){
        return true
      }
      return false
    }
    
    return (
      <div
        className={`RP_Node__Handle RP_Node__Handle-${type} ${type} ${styles['RP_Node__Handle-' + position]} ${styles['RP_Node__Handle']} ${isValidHandle() || selectedHandle?.uniqueHandleId === handleId ? styles['RP_Node__Handle-connecting'] : ''}`}
        ref={handleRef}
        data-node-id={node.id}
        data-handle-id={handleId}
        data-id={`${handleId}-${type}`}
        data-handle-type={type}
        data-position={position}
        onClick={() => handleSelectionInteraction()}
      >

          {/* {handleRef.current && node.selected && type === 'source' && selectedHandle?.uniqueHandleId !== handleId && 
            <InsertHelper position={position} handleElement={handleRef.current}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
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
          } */}

      </div> 
    )
}

export default memo(Handle)