import React, { useEffect, useState } from "react"
import { useEdgeStore } from "../Stores/EdgeStore"
import { useInteractionStore } from "../Stores/InteractionStore"
import { useNodeIOStore } from "../Stores/NodeIOStore"

interface EdgeCoordinate {
  edgeId: string
  source: {x: number, y: number}
  target: {x: number, y: number}
}


export const EdgeRenderer = () => {
  const nodeHandles = useNodeIOStore((state) => state.nodeHandles)
  const {edges, newEdge} = useEdgeStore()
  const {dragInteractionNodeId, edgeInteraction, resetEdgeInteraction} = useInteractionStore()
  const [edgeCoordinates, setEdgeCoordinates] = useState<EdgeCoordinate[]>([])

  useEffect(() => {
    edges.forEach(edge => {
      if(edgeCoordinates.find(e => e.edgeId === edge.id) === undefined){     
        const sourceHandlePosition = nodeHandles.find(s => s.nodeId === edge.sourceNodeId && s.id === edge.sourceNodeOutput)?.position
        const targetHandlePosition = nodeHandles.find(t => t.nodeId === edge.targetNodeId && t.id === edge.targetNodeInput)?.position
       
        if(sourceHandlePosition !== undefined && targetHandlePosition !== undefined) {
          setEdgeCoordinates([...edgeCoordinates, {edgeId: edge.id, source: sourceHandlePosition, target: targetHandlePosition}])
        }
      }
    })
  }, [edgeCoordinates, edgeInteraction, edges, nodeHandles])

  useEffect(() => {
    if(dragInteractionNodeId !== undefined){
      const connectedEdges = edges.filter(e => e.sourceNodeId === dragInteractionNodeId || e.targetNodeId === dragInteractionNodeId)

      connectedEdges.forEach(edge => {
        const edgeCoordinate = edgeCoordinates.find(e => e.edgeId === edge.id)
        const sourceHandlePosition = nodeHandles.find(s => s.nodeId === edge.sourceNodeId && s.id === edge.sourceNodeOutput)?.position
        const targetHandlePosition = nodeHandles.find(t => t.nodeId === edge.targetNodeId && t.id === edge.targetNodeInput)?.position
          
        if(edgeCoordinate?.source !== sourceHandlePosition || edgeCoordinate?.target !== targetHandlePosition){
          if(sourceHandlePosition && targetHandlePosition !== undefined && edgeCoordinate !== undefined){
            setEdgeCoordinates([...edgeCoordinates.filter(e => e.edgeId !== edge.id), {...edgeCoordinate, source: sourceHandlePosition, target: targetHandlePosition}])
          }
        }
      })
    }
  }, [dragInteractionNodeId, edgeCoordinates, edges, nodeHandles])

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
      {edgeCoordinates.map((edge, index) => {
        
        return (
          <g 
            key={index} 
            style={{border: "1px solid red", fill: "red"}}
            onClick={() => console.log("ASDFG")} 
            >
            <path d={`M${edge.source.x} ${edge.source.y} L ${edge.target.x} ${edge.target.y}`} style={{stroke: '#bbb'}}/>
          </g>
          
        )
      })}
    </svg>
  )
}