import { useEffect, useState } from "react"
import { IHandleData } from "../Components/Handle/IHandleData"
import { useInteractionStore } from "../Stores/InteractionStore"
import { useNodeIOStore } from "../Stores/NodeIOStore"

/**
 * Interaction renderer used to render all user-graph interactions
 * @returns 
 */
export const InteractionRenderer = () => {
  const getHandle = useNodeIOStore((state) => state.getHandle)
  const [edgeInteractionSourceHandle, setEdgeInteractionSourceHandle] = useState<IHandleData | undefined>(undefined)
  const [edgeInteractionTargetPosition, setEdgeInteractionTargetPosition] = useState<undefined | {x: number, y: number} >(undefined)
  const edgeInteraction = useInteractionStore((state) => state.edgeInteraction)

  useEffect(() => {
    if(edgeInteraction && edgeInteraction.mousePosition){
      setEdgeInteractionSourceHandle(getHandle(edgeInteraction.sourceNodeId, edgeInteraction.sourceHandleId))
      setEdgeInteractionTargetPosition(edgeInteraction.mousePosition)
      return
    }
    setEdgeInteractionTargetPosition(undefined)
  }, [edgeInteraction, getHandle])

  return (
    <svg 
      width={'100%'} 
      height={'100%'} 
      overflow="visible" 
      style={{position: "absolute", pointerEvents: "none"}}
      >
      {edgeInteractionTargetPosition && 
        <path 
          d={`M${edgeInteractionSourceHandle?.position.x} ${edgeInteractionSourceHandle?.position.y} L ${edgeInteractionTargetPosition.x} ${edgeInteractionTargetPosition.y}`} 
          style={{stroke: '#bbb'}}
        />}
    </svg>
  )
}