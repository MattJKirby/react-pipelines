import { FC, PropsWithChildren, useRef, MouseEvent } from "react";
import ZoomContainer from "../../Containers/ZoomContainer";
import UseGlobalKeyHandler from "../../Hooks/useGlobalKeyHandler";
import { useStore } from "../../Hooks/useStore";
import EdgeRenderer from "../../Renderers/EdgeRenderer";
import { InteractionRenderer } from "../../Renderers/InteractionRenderer";
import NodeRenderer from "../../Renderers/NodeRenderer";
import { GraphViewProps, IGraphState } from "../../Types";
import { calculateScaledMousePosition } from "./utils";

const selector = (s: IGraphState) => ({
  transform: s.graphTransform,
  handleInteraction: s.handleInteraction,
  multiSelectionActive: s.multiSelectionActive,
  setHandleInteraction: s.setHandleInteraction,
  resetHandleInteraction: s.resetHandleInteraction,
  resetSelectedNodes: s.resetSelectedNodes,
  resetSelectedEdges: s.resetSelectedEdges
});

const GraphView: FC<PropsWithChildren<GraphViewProps>> = ({
  deleteKeyCode,
  deselectKeyCode,
  multiSelectionKeyCode,
  children
}) => {
  const flowRef = useRef<HTMLDivElement>(null);
  const store = useStore(selector);
  UseGlobalKeyHandler({deselectKeyCode, deleteKeyCode, multiSelectionKeyCode});
  
  const handleMouseMove = (e: MouseEvent) => {
    if(store.handleInteraction !== undefined && flowRef.current !== null){
      store.setHandleInteraction({...store.handleInteraction, mousePosition: calculateScaledMousePosition(e, flowRef.current, store.transform)})
    }
  }

  const handleMouseDown = (e: MouseEvent & {target: HTMLElement}) => {    
    if(e.target.classList.length < 2 && !store.multiSelectionActive){
      store.resetSelectedNodes();
      store.resetSelectedEdges();
    }
  }

  return (
    <div
      className="RP_GraphView"
      ref={flowRef}
      onMouseUp={() => store.resetHandleInteraction()}
      onMouseMove={(e: MouseEvent) => handleMouseMove(e)}
      onMouseDownCapture={(e) => handleMouseDown(e)}
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