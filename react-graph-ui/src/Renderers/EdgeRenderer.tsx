import React, { ComponentType, memo, useEffect } from "react"
import Edge from "../Components/Edge";
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { edgePathTypeMap, getEdgePositions, getNodeData } from "../Components/Edge/utils";
import { useStore } from "../Hooks/useStore"
import { IGraphState, IHandle } from "../Types"

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
  handleInteraction: s.handleInteraction,
  enableSelectableEdges: s.enableSelectableEdges,
  addEdge: s.addEdge,
  resetHandleInteraction: s.resetHandleInteraction
});


export const EdgeRenderer = () => {
  const { customEdgeTypes, edges, handleInteraction, enableSelectableEdges, addEdge, resetHandleInteraction, nodes} = useStore(selector)
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...customEdgeTypes}

  useEffect(() => {
    if(handleInteraction !== undefined){
      const {sourceHandle: source, targetHandle: target, edgeType} = handleInteraction
      if(source !== undefined && target !== undefined){
        const edgeId = `edge-${source.nodeId}_${source.id}-${target.nodeId}_${target?.id}`
        const existingEdge = edges.get(edgeId);

        if(existingEdge === undefined){
          addEdge([{item: {id: edgeId, sourceNodeId: source.nodeId, sourceNodeOutput: source.id, targetNodeId: target.nodeId, targetNodeInput: target.id, type: edgeType}}])
        }
        resetHandleInteraction()
      }
      
    }
  },[edges,handleInteraction, addEdge, resetHandleInteraction])


  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}}>
      {[...edges.values()].map((edge, index) => {
      const EdgeType = edgeTypes[edge.type] as ComponentType<EdgeTypeProps> || edgeTypes['default'];

      const [sourceHandles, sourcePosition, validSource] = getNodeData(nodes.get(edge.sourceNodeId));
      const [targetHandles, targetPosition, validTarget] = getNodeData(nodes.get(edge.targetNodeId));

      if(!validSource || !validTarget){
        return null;
      };

      const sourceHandle = sourceHandles?.source?.get(edge.sourceNodeOutput);
      const targetHandle = targetHandles?.target?.get(edge.targetNodeInput);

      if(sourceHandle && targetHandle){
        const { sourceX, sourceY, targetX, targetY } = getEdgePositions(sourcePosition, sourceHandle, targetPosition, targetHandle)
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