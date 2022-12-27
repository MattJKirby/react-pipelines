import React, { ComponentType, useEffect } from "react"
import { Edge } from "../Components/Edge"
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { useEdgeStore } from "../Stores/EdgeStore"
import { useGraphStore } from "../Stores/GraphStore"
import { useInteractionStore } from "../Stores/InteractionStore"



export interface EdgeTypeProps {
}


export const EdgeRenderer = () => {
  const userEdgeTypes = useGraphStore((state) => state.userEdgeTypes)
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...userEdgeTypes}

  const {edges, newEdge} = useEdgeStore()
  const {edgeInteraction, resetEdgeInteraction} = useInteractionStore()




  useEffect(() => {
    if(edgeInteraction?.targetNodeId !== undefined && edgeInteraction.targetHandleId !== undefined){
      const edge = edges.find(e => e.sourceNodeId === edgeInteraction.sourceNodeId && e.sourceNodeOutput === edgeInteraction.sourceHandleId && e.targetNodeId === edgeInteraction.targetNodeId && e.targetNodeInput === edgeInteraction.targetHandleId)
      if(edge === undefined){
        newEdge(edgeInteraction.sourceNodeId, edgeInteraction.sourceHandleId, edgeInteraction.targetNodeId, edgeInteraction.targetHandleId)
      }
      resetEdgeInteraction()
    }
  }, [edgeInteraction?.sourceHandleId, edgeInteraction?.sourceNodeId, edgeInteraction?.targetHandleId, edgeInteraction?.targetNodeId, edges, newEdge, resetEdgeInteraction])


  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}}>
      {edges.map((edge, index) => {
        const EdgeType = edgeTypes[edge.type] as ComponentType<EdgeTypeProps> || edgeTypes['default']

        return (
          <Edge key={index} edge={edge}>
            <EdgeType />
          </Edge>
        )
      })}
    </svg>
  )
}

export default EdgeRenderer