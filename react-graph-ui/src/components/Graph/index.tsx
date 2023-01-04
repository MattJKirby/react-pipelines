import React, { useRef, MouseEvent, PropsWithChildren, FC } from "react"
import ZoomContainer from "../../Containers/ZoomContainer"
import NodeRenderer from "../../Renderers/NodeRenderer"
import StoreUpdater from "../StoreUpdater"
import { EdgeRenderer } from "../../Renderers/EdgeRenderer"
import { InteractionRenderer } from "../../Renderers/InteractionRenderer"
import { calculateScaledMousePosition } from "./utils"
import { useStore } from "../../Hooks/useStore"
import { IGraphProps, IGraphState } from "../../Types"


const selector = (s: IGraphState) => ({
  graphNodes: s.nodes,
  transform: s.graphTransform,
  handleInteraction: s.handleInteraction,
  setHandleInteraction: s.setHandleInteraction,
  resetHandleInteraction: s.resetHandleInteraction,
  setCustomNodeTypes: s.setCustomNodeTypes,
  addNode: s.addNode,
  addEdge: s.addEdge,
});

/**
 * Graph entrypoint component
 * @param param0 
 * @returns 
 */
export const Graph: FC<PropsWithChildren<IGraphProps>> = ({children,
  nodes,
  edges,
  nodeTypes,
  enableDraggableNodes,
}) => {
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
      style={{width: '100%', height: '100%', overflow: "hidden", position: "relative"}}
    >
      <StoreUpdater
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        enableDraggableNodes={enableDraggableNodes}
      />
      <ZoomContainer>
        <NodeRenderer />
        <EdgeRenderer />
        <InteractionRenderer />
      </ZoomContainer>
      {children}
    </div> 
  )
}

export default Graph