import React, { ComponentType, useEffect } from "react"
import { Edge } from "../Components/Edge"
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { useStore } from "../Hooks/useStore"
import { useEdgeStore } from "../Stores/EdgeStore"
import { HandleType, IGraphState } from "../Types"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EdgeTypeProps {
}

const selector = (s: IGraphState) => ({
  customEdgeTypes: s.customEdgeTypes,
  handleInteraction: s.handleInteraction,
  getHandle: s.getHandle,
  resetHandleInteraction: s.resetHandleInteraction
});


export const EdgeRenderer = () => {
  const {customEdgeTypes, handleInteraction, getHandle, resetHandleInteraction} = useStore(selector)
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...customEdgeTypes}
  const {edgeDataList, getEdge, newEdge} = useEdgeStore()

  useEffect(() => {
    if(handleInteraction !== undefined){

      let completeInteraction = true
      Object.values(handleInteraction).forEach((value) => {
        if(value === undefined){
          completeInteraction = false
          return
        }
      })
   
      if(completeInteraction){
        const {sourceHandle, targetHandle, edgeType} = handleInteraction
        const existingEdge = sourceHandle.type === HandleType.TARGET ? getEdge(targetNodeId, targetHandleId, sourceNodeId, sourceHandleId) : getEdge(sourceNodeId, sourceHandleId, targetNodeId, targetHandleId)

        if(existingEdge === undefined){
          newEdge(sourceNodeId, sourceHandleId, targetNodeId, targetHandleId, edgeType)
        }
        resetHandleInteraction()
      }
      
    }
  }, [])


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