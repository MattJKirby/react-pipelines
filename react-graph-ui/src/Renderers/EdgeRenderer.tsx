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
  const {edgeDataList, newEdge} = useEdgeStore()
  const {edgeInteraction, resetEdgeInteraction} = useInteractionStore()

  useEffect(() => {
    if(edgeInteraction?.targetNodeId !== undefined && edgeInteraction.targetHandleId !== undefined){
      const existingEdge = edgeDataList.find(e => e.sourceNodeId === edgeInteraction.sourceNodeId && e.sourceNodeOutput === edgeInteraction.sourceHandleId && e.targetNodeId === edgeInteraction.targetNodeId && e.targetNodeInput === edgeInteraction.targetHandleId)
      if(existingEdge === undefined){
        console.log("ADDED EDGE")
        newEdge(edgeInteraction.sourceNodeId, edgeInteraction.sourceHandleId, edgeInteraction.targetNodeId, edgeInteraction.targetHandleId)
      }
      resetEdgeInteraction()
    }
  }, [edgeInteraction, edgeDataList, newEdge, resetEdgeInteraction])

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