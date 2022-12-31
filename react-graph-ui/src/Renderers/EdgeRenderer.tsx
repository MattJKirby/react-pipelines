import React, { ComponentType, useEffect } from "react"
import { Edge } from "../Components/Edge"
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { useStore } from "../Hooks/useStore"
import { useEdgeStore } from "../Stores/EdgeStore"
import { useInteractionStore } from "../Stores/InteractionStore"
import { useNodeIOStore } from "../Stores/NodeIOStore"
import { IGraphState } from "../Types"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EdgeTypeProps {
}

const selector = (s: IGraphState) => ({
  customEdgeTypes: s.customEdgeTypes
});


export const EdgeRenderer = () => {
  const {customEdgeTypes} = useStore(selector)
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...customEdgeTypes}
  const {edgeDataList, getEdge, newEdge} = useEdgeStore()
  const {edgeInteraction, resetEdgeInteraction} = useInteractionStore()
  const {getHandle} = useNodeIOStore()

  useEffect(() => {
    if(edgeInteraction !== undefined){

      let completeInteraction = true
      Object.values(edgeInteraction).forEach((value) => {
        if(value === undefined){
          completeInteraction = false
          return
        }
      })
   
      if(completeInteraction){
        const {sourceNodeId, sourceHandleId,targetNodeId, targetHandleId, sourceHandleIsTarget, edgeType} = edgeInteraction
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