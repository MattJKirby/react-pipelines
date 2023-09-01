import { FC, PropsWithChildren, useRef, useEffect } from "react";
import ZoomContainer from "../../Containers/ZoomContainer/ZoomContainer";
import UseGlobalKeyHandler from "../../Hooks/useGlobalKeyHandler";
import { useStore } from "../../Hooks/useStore";
import EdgeRenderer from "../../Renderers/EdgeRenderer";
import NodeRenderer from "../../Renderers/NodeRenderer";
import { GraphViewProps, IGraphState } from "../../Types";
import useDynamicDimensions from "../../Hooks/useDynamicDimensions";

const selector = (s: IGraphState) => ({
  transform: s.graphTransform,
  dimensions: s.graphDimensions,
  multiSelectionActive: s.multiSelectionActive,
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
      onClickCapture={(e) => handleMouseDown(e)}
      style={{width: "100%", height: "100%", overflow: "hidden", position: "relative"}}
      >
        {children}
        <ZoomContainer>
          <EdgeRenderer />
          <NodeRenderer />    
        </ZoomContainer>
        
    </div>
  )
}

export default GraphView;