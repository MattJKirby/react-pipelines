import { FC, PropsWithChildren, useRef, MouseEvent, useEffect } from "react";
import ZoomContainer from "../../Containers/ZoomContainer/ZoomContainer";
import UseGlobalKeyHandler from "../../Hooks/useGlobalKeyHandler";
import { useStore } from "../../Hooks/useStore";
import EdgeRenderer from "../../Renderers/EdgeRenderer";
import { InteractionRenderer } from "../../Renderers/InteractionRenderer";
import NodeRenderer from "../../Renderers/NodeRenderer";
import { GraphViewProps, IGraphState } from "../../Types";
import { calculateScaledMousePosition } from "./utils";
import useDynamicDimensions from "../../Hooks/useDynamicDimensions";

const selector = (s: IGraphState) => ({
  transform: s.graphTransform,
  dimensions: s.graphDimensions,
  handleInteraction: s.handleInteraction,
  multiSelectionActive: s.multiSelectionActive,
  setHandleInteraction: s.setHandleInteraction,
  resetHandleInteraction: s.resetHandleInteraction,
  resetSelectedNodes: s.resetSelectedNodes,
  resetSelectedEdges: s.resetSelectedEdges,
  setGraphDimensions: s.setGraphDimensions
});

const GraphView: FC<PropsWithChildren<GraphViewProps>> = ({
  deleteKeyCode,
  deselectKeyCode,
  multiSelectionKeyCode,
  children
}) => {
  const flowRef = useRef<HTMLDivElement>(null);
  const store = useStore(selector);
  const dimensions = useDynamicDimensions({itemRef: flowRef});
  UseGlobalKeyHandler({deselectKeyCode, deleteKeyCode, multiSelectionKeyCode});

  useEffect(() => {
    if(dimensions !== store.dimensions){
      store.setGraphDimensions(dimensions);
    }
  }, [dimensions, store])

  // const handleMouseMove = (e: MouseEvent) => {
  //   if(store.handleInteraction !== undefined && flowRef.current !== null){
  //     store.setHandleInteraction({...store.handleInteraction, mousePosition: calculateScaledMousePosition(e, flowRef.current, store.transform)})
  //   }
  // }

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement; 
      if(target.classList.length < 2 && !store.multiSelectionActive){
        store.resetSelectedNodes();
        store.resetSelectedEdges();
      }
  }

  return (
    <div
      className="RP_GraphView"
      ref={flowRef}
      onMouseUp={() => store.resetHandleInteraction()}
      // onMouseMove={(e: MouseEvent) => handleMouseMove(e)}
      onMouseDownCapture={(e) => handleMouseDown(e)}
      style={{width: "100%", height: "100%", overflow: "hidden", position: "relative"}}
      >
        {children}
        <ZoomContainer>
          <InteractionRenderer />
          <EdgeRenderer />
          <NodeRenderer />    
        </ZoomContainer>
        
    </div>
  )
}

export default GraphView;