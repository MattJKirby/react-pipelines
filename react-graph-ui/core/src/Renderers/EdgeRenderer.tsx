import React, { ComponentType, memo } from "react"
import Edge from "../Components/Edge";
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { edgePathTypeMap, getEdgePositions, getNodeData } from "../Components/Edge/utils";
import { useStore } from "../Hooks/useStore"
import { IGraphState, IHandle } from "../Types"
import { getUniqueHandleId } from "../Components/Handle/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EdgeTypeProps {
  sourceHandle: IHandle;
  targetHandle: IHandle;
  selected: boolean;
  path?: string;
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
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...customEdgeTypes}


  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}}>
      {[...edges.values()].map((edge, index) => {
      const EdgeType = edgeTypes[edge.type] as ComponentType<EdgeTypeProps> || edgeTypes['default'];

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
        const path = edgePathTypeMap.get(edge.pathType || 'bezier')?.({x: sourceX, y: sourceY}, {x: targetX, y: targetY}, sourceHandle.position, targetHandle.position);
        const interactionWidth = edge.interactionWidth || 20;
        const dragging = (nodes.get(edge.sourceNodeId)?.dragging || nodes.get(edge.targetNodeId)?.dragging) || false;

        return path && (
          <Edge 
            key={index}
            id={edge.id}
            source={sourceHandle} 
            target={targetHandle}
            selected={selected}
            enableSelect={enableSelectableEdges && enableSelect}
            path={path}
            interactionWidth={interactionWidth}
            dragging={dragging}
          >
            <EdgeType
              sourceHandle={sourceHandle}
              targetHandle={targetHandle}
              selected={selected}
              path={path}
            />
          </Edge>
        )
      }
      })}
    </svg>
  )
}

export default memo(EdgeRenderer)