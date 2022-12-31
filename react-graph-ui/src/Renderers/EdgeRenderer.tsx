import React, { ComponentType, useEffect } from "react"
import { Edge } from "../Components/Edge"
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { useEdgeStore } from "../Stores/EdgeStore"
import { useGraphStore } from "../Stores/GraphStore"
import { useInteractionStore } from "../Stores/InteractionStore"
import { useNodeIOStore } from "../Stores/NodeIOStore"



// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EdgeTypeProps {
}


export const EdgeRenderer = () => {
  const userEdgeTypes = useGraphStore((state) => state.userEdgeTypes)
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...userEdgeTypes}
  const {edgeDataList, getEdge, newEdge} = useEdgeStore()
  const {edgeInteraction, resetEdgeInteraction} = useInteractionStore()
  const {getHandle} = useNodeIOStore()

  useEffect(() => {
    if(edgeInteraction !== undefined){
      const {sourceNodeId, sourceHandleId,targetNodeId, targetHandleId, sourceHandleIsTarget, edgeType} = edgeInteraction

      if(sourceNodeId !== undefined && sourceHandleId !== undefined && targetNodeId !== undefined && targetHandleId !== undefined){
        const existingEdge = sourceHandleIsTarget ? getEdge(targetNodeId, targetHandleId, sourceNodeId, sourceHandleId) : getEdge(sourceNodeId, sourceHandleId, targetNodeId, targetHandleId)

        if(existingEdge === undefined){
          newEdge(sourceNodeId, sourceHandleId, targetNodeId, targetHandleId, edgeType)
        }
        resetEdgeInteraction()
      }
    }
  }, [edgeInteraction, edgeDataList, newEdge, resetEdgeInteraction, getEdge])


  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}}>
      {edgeDataList.map((edge, index) => {
        const EdgeType = edgeTypes[edge.type] as ComponentType<EdgeTypeProps> || edgeTypes['default']
        const source = getHandle(edge.sourceNodeId, edge.sourceNodeOutput)
        const target = getHandle(edge.targetNodeId, edge.targetNodeInput)

      if(source && target){
        return (
          <Edge key={index} edge={edge} source={source} target={target}>
            <EdgeType />
          </Edge>
        )
      }
      })}
    </svg>
  )
}

export default EdgeRenderer