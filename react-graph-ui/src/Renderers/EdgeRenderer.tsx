import React, { ComponentType, useEffect } from "react"
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { Edge } from "../Components/Edge"
import { useStore } from "../Hooks/useStore"
import { IGraphState, IHandle } from "../Types"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EdgeTypeProps {
  sourceHandle: IHandle;
  targetHandle: IHandle;
}

const selector = (s: IGraphState) => ({
  customEdgeTypes: s.customEdgeTypes,
  edges: s.edges,
  handleInteraction: s.handleInteraction,
  handles: s.handles,
  newEdge: s.newEdge,
  getEdge: s.getEdge,
  resetHandleInteraction: s.resetHandleInteraction
});


export const EdgeRenderer = () => {
  const {customEdgeTypes, edges, handleInteraction, newEdge, getEdge, resetHandleInteraction, handles} = useStore(selector)
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...customEdgeTypes}

  useEffect(() => {
    if(handleInteraction !== undefined){
      const {sourceHandle: source, targetHandle: target, edgeType} = handleInteraction
      if(source !== undefined && target !== undefined){
        const existingEdge = getEdge(`edge-${source.id}-${target?.id}`)

        if(existingEdge === undefined){
          newEdge(source.nodeId, source.id, target.nodeId, target.id, edgeType)
        }
        resetHandleInteraction()
      }
      
    }
  }, [getEdge, handleInteraction, newEdge, resetHandleInteraction])


  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}}>
      {edges.map((edge, index) => {
        const EdgeType = edgeTypes[edge.type] as ComponentType<EdgeTypeProps> || edgeTypes['default']
        const s = handles.find(h => h.nodeId === edge.sourceNodeId && h.id === edge.sourceNodeOutput)
        const t = handles.find(h => h.nodeId === edge.targetNodeId && h.id === edge.targetNodeInput)

      if(s && t){
        return (
          <Edge key={index} edge={edge} source={s} target={t}>
            <EdgeType
              sourceHandle={s}
              targetHandle={t}
            />
          </Edge>
        )
      }
      })}
    </svg>
  )
}

export default EdgeRenderer