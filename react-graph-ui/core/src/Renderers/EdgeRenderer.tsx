import { CSSProperties, ComponentType, memo } from "react"
import EdgeWrapper from "../Components/Edge/EdgeWrapper";
import { getEdgePositions, getNodeData } from "../Components/Edge/utils";
import { useStore } from "../Hooks/useStore"
import { IGraphState, Position } from "../Types"
import { getUniqueHandleId } from "../Components/Handle/utils";
import BezierEdge from "../Components/Edge/BezierEdge";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EdgeProps {
  id: string,
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourcePosition: Position,
  targetPosition: Position,
  selected: boolean,
  enableSelect: boolean,
  interactionWidth: number,
  dragging: boolean,
  style: CSSProperties
}

const selector = (s: IGraphState) => ({
  customEdgeTypes: s.customEdgeTypes,
  edges: s.edgeInternals,
  nodes: s.nodeInternals,
  enableSelectableEdges: s.enableSelectableEdges,
  addEdge: s.addEdge,
});


export const EdgeRenderer = () => {
  const { customEdgeTypes, edges, enableSelectableEdges, addEdge, nodes} = useStore(selector)
  const edgeTypes: { [key: string]: ComponentType<EdgeProps> } = {...{default: BezierEdge}, ...customEdgeTypes}


  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}}>
      {[...edges.values()].map((edge, index) => {
      const WrappedEdge = EdgeWrapper(edgeTypes[edge.type] as ComponentType<EdgeProps> || edgeTypes.default);

      const [sourceHandles, sourcePosition, sourceDims, validSource] = getNodeData(nodes.get(edge.sourceNodeId));
      const [targetHandles, targetPosition, targetDims, validTarget] = getNodeData(nodes.get(edge.targetNodeId));

      if(!validSource || !validTarget){
        return null;
      };

      const sourceHandle = sourceHandles?.source?.get(getUniqueHandleId(edge.sourceNodeId,edge.sourceNodeOutput));
      const targetHandle = targetHandles?.target?.get(getUniqueHandleId(edge.targetNodeId,edge.targetNodeInput));

      if(sourceHandle && targetHandle){
        const { sourceX, sourceY, targetX, targetY } = getEdgePositions(sourceHandle.position, sourcePosition, sourceHandle, sourceDims, targetHandle.position, targetPosition, targetHandle, targetDims)
        const enableSelect = edge.enableSelect === undefined ? true : edge.enableSelect;
        const selected = enableSelectableEdges && (edge.selected || false);
        const interactionWidth = edge.interactionWidth || 20;
        const dragging = (nodes.get(edge.sourceNodeId)?.dragging || nodes.get(edge.targetNodeId)?.dragging) || false;

        return (
          <WrappedEdge 
            key={index}
            id={edge.id}
            source={sourceHandle} 
            target={targetHandle}
            sourceX={sourceX}
            sourceY={sourceY}
            targetX={targetX}
            targetY={targetY}
            selected={selected}
            enableSelect={enableSelectableEdges && enableSelect}
            dragging={dragging}
            interactionWidth={interactionWidth}
          />
        )
      }
      })}
    </svg>
  )
}

export default memo(EdgeRenderer)