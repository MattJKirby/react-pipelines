import { FC, PropsWithChildren, useRef, MouseEvent } from "react";
import ZoomContainer from "../../Containers/ZoomContainer";
import { useStore } from "../../Hooks/useStore";
import EdgeRenderer from "../../Renderers/EdgeRenderer";
import { InteractionRenderer } from "../../Renderers/InteractionRenderer";
import NodeRenderer from "../../Renderers/NodeRenderer";
import { IGraphState } from "../../Types";
import { calculateScaledMousePosition } from "./utils";

const selector = (s: IGraphState) => ({
  graphNodes: s.nodes,
  transform: s.graphTransform,
  handleInteraction: s.handleInteraction,
  setHandleInteraction: s.setHandleInteraction,
  resetHandleInteraction: s.resetHandleInteraction,
  removeSelectedNodes: s.removeSelectedNodes
});

const GraphView: FC<PropsWithChildren> = ({children}) => {
  const flowRef = useRef<HTMLDivElement>(null)
  const store = useStore(selector)
  
  const handleMouseMove = (e: MouseEvent) => {
    if(store.handleInteraction !== undefined && flowRef.current !== null){
      store.setHandleInteraction({...store.handleInteraction, mousePosition: calculateScaledMousePosition(e, flowRef.current, store.transform)})
    }
  }

  return (
    <div
      ref={flowRef}
      onMouseUp={() => store.resetHandleInteraction()}
      onMouseMove={(e: MouseEvent) => handleMouseMove(e)}
      onMouseDownCapture={() => store.removeSelectedNodes([],true)}
      style={{width: "100%", height: "100%", overflow: "hidden", position: "relative"}}
      >
        <ZoomContainer>
          <InteractionRenderer />
          <EdgeRenderer />
          <NodeRenderer />    
        </ZoomContainer>
        {children}
    </div>
  )
}

export default GraphView;