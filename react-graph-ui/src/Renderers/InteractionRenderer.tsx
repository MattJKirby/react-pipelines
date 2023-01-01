import { useEffect, useState } from "react"
import { useStore } from "../Hooks/useStore";
import { IGraphState, IHandle } from "../Types";

const selector = (s: IGraphState) => ({
  handleInteraction: s.handleInteraction,
});

/**
 * Interaction renderer used to render all user-graph interactions
 * @returns 
 */
export const InteractionRenderer = () => {
  const {handleInteraction} = useStore(selector)
  const [handleInteractionSource, setHandleInteractionSource] = useState<IHandle | undefined>(undefined)
  const [handleInteractionTarget, setHandleInteractionTarget] = useState<IHandle | undefined>(undefined)

  useEffect(() => {
    if(handleInteraction){
      setHandleInteractionSource(handleInteraction.sourceHandle)
      setHandleInteractionTarget(handleInteraction.targetHandle)
      return
    }
    setHandleInteractionTarget(undefined)
  }, [handleInteraction])

  return (
    <svg 
      width={'100%'} 
      height={'100%'} 
      overflow="visible" 
      style={{position: "absolute", pointerEvents: "none"}}
      >
      {handleInteractionTarget && 
        <path 
          d={`M${handleInteractionSource?.position.x} ${handleInteractionSource?.position.y} L ${handleInteractionTarget.position. x} ${handleInteractionTarget.position.y}`} 
          style={{stroke: '#bbb'}}
        />}
    </svg>
  )
}