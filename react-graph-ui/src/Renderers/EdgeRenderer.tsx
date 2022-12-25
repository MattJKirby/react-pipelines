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
  const nodeSourceHandles = useNodeIOStore((state) => state.getSourceHandles())
  const nodeTargetHandles = useNodeIOStore((state) => state.getTargetHandles())
  const edges = useEdgeStore((state) => state.edges)
  const {dragInteractionNodeId} = useInteractionStore()
  const [edgeCoordinates, setEdgeCoordinates] = useState<EdgeCoordinate[]>([])

  useEffect(() => {
    edges.forEach(edge => {
      if(edgeCoordinates.find(e => e.edgeId === edge.id) === undefined){
        const sourceHandlePosition = nodeSourceHandles.find(s => s.nodeId === edge.sourceNodeId && s.id === edge.sourceNodeOutput)?.position
        const targetHandlePosition = nodeTargetHandles.find(t => t.nodeId === edge.targetNodeId && t.id === edge.targetNodeInput)?.position
       
        if(sourceHandlePosition && targetHandlePosition !== undefined) {
          setEdgeCoordinates([...edgeCoordinates, {edgeId: edge.id, source: sourceHandlePosition, target: targetHandlePosition}])
        }
      }
    })
  }, [edgeCoordinates, edges, nodeSourceHandles, nodeTargetHandles])

  useEffect(() => {
    if(dragInteractionNodeId !== undefined){
      const connectedEdges = edges.filter(e => e.sourceNodeId === dragInteractionNodeId || e.targetNodeId === dragInteractionNodeId)

      connectedEdges.forEach(edge => {
        const edgeCoordinate = edgeCoordinates.find(e => e.edgeId === edge.id)
        const sourceHandlePosition = nodeSourceHandles.find(s => s.nodeId === edge.sourceNodeId && s.id === edge.sourceNodeOutput)?.position
        const targetHandlePosition = nodeTargetHandles.find(t => t.nodeId === edge.targetNodeId && t.id === edge.targetNodeInput)?.position
          
        if(edgeCoordinate?.source !== sourceHandlePosition || edgeCoordinate?.target !== targetHandlePosition){
          if(sourceHandlePosition && targetHandlePosition !== undefined && edgeCoordinate !== undefined){
            edgeCoordinate.source = sourceHandlePosition
            edgeCoordinate.target = targetHandlePosition
            setEdgeCoordinates([...edgeCoordinates.filter(e => e.edgeId !== edge.id), edgeCoordinate])
          }
        }
      })
    }
  }, [dragInteractionNodeId, edgeCoordinates, edges, nodeSourceHandles, nodeTargetHandles])



  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}}>
      {edgeCoordinates.map((edge, index) => {
        
        return (
          <path key={index} d={`M${edge.source.x} ${edge.source.y} L ${edge.target.x} ${edge.target.y}`} style={{stroke: '#bbb'}}/>
        )
      })}
    </svg>
  )
}