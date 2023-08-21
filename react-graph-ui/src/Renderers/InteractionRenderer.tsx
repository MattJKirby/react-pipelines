import { useStore } from "../Hooks/useStore";
import { IGraphState } from "../Types";

const selector = (s: IGraphState) => ({
  handleInteraction: s.handleInteraction,
});

/**
 * Interaction renderer used to render all user-graph interactions
 * @returns 
 */
export const InteractionRenderer = () => {
  const {handleInteraction} = useStore(selector);



  return (
    <svg 
      width={'100%'} 
      height={'100%'} 
      overflow="visible" 
      style={{position: "absolute", pointerEvents: "none", zIndex: 1}}
      >
      {/* {handleInteraction && 
        <path 
          d={`M${handleInteraction.sourceHandle.position.x} ${handleInteraction.sourceHandle.position.y} L${handleInteraction.mousePosition. x} ${handleInteraction.mousePosition.y}`} 
          style={{stroke: '#bbb'}}
          fill={"none"}
        />} */}
    </svg>
  )
}