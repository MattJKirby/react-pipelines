import React, { ComponentType, useEffect } from "react"
import { Edge } from "../Components/Edge"
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { IEdgeData } from "../Components/Edge/IEdgeData"
import { IHandleData } from "../Components/Handle/IHandleData"
import { useEdgeStore } from "../Stores/EdgeStore"
import { useGraphStore } from "../Stores/GraphStore"
import { useInteractionStore } from "../Stores/InteractionStore"
import { useNodeIOStore } from "../Stores/NodeIOStore"



export interface EdgeTypeProps {
}


export const EdgeRenderer = () => {
  const userEdgeTypes = useGraphStore((state) => state.userEdgeTypes)
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...userEdgeTypes}
  const nodeHandles = useNodeIOStore((state) => state.nodeHandles)
  const {edgeDataList, getEdge, newEdge} = useEdgeStore()
  const {edgeInteraction, resetEdgeInteraction} = useInteractionStore()

  useEffect(() => {
    if(edgeInteraction !== undefined){
      const {sourceNodeId, sourceHandleId,targetNodeId, targetHandleId, sourceHandleIsTarget} = edgeInteraction

      if(sourceNodeId !== undefined && sourceHandleId !== undefined && targetNodeId !== undefined && targetHandleId !== undefined){
        const existingEdge = sourceHandleIsTarget ? getEdge(targetNodeId, targetHandleId, sourceNodeId, sourceHandleId) : getEdge(sourceNodeId, sourceHandleId, targetNodeId, targetHandleId)

        if(existingEdge === undefined){
          newEdge(sourceNodeId, sourceHandleId, targetNodeId, targetHandleId)
        }
        resetEdgeInteraction()
      }
    }
  }, [edgeInteraction, edgeDataList, newEdge, resetEdgeInteraction, getEdge])

  const getNodeHandle = (nodeId: number, handleId: string): IHandleData | undefined => {
    return nodeHandles.find(h => h.nodeId === nodeId && h.id === handleId)
  }


  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}}>
      {edgeDataList.map((edge, index) => {
        const EdgeType = edgeTypes[edge.type] as ComponentType<EdgeTypeProps> || edgeTypes['default']
        const source = getNodeHandle(edge.sourceNodeId, edge.sourceNodeOutput)
        const target = getNodeHandle(edge.targetNodeId, edge.targetNodeInput)

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