import React, { PropsWithChildren, FC } from "react"
import StoreUpdater from "../StoreUpdater"
import { IGraphProps } from "../../Types"
import GraphWrapper from "./graphWrapper"
import GraphView from "./graphView"

/**
 * Graph entrypoint component
 * @param param0 
 * @returns 
 */
export const Graph: FC<PropsWithChildren<IGraphProps>> = ({
  children,
  id,
  nodes,
  edges,
  nodeTypes,
  enableDraggableNodes,
  enableSelectableNodes,
  selectNodesOnDrag,
  enableSelectableEdges,
  onNodesChange,
  onEdgesChange,
}) => {
  const graphId = id || '1';

  return (
    <GraphWrapper>
      <StoreUpdater
          id={graphId}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          enableDraggableNodes={enableDraggableNodes}
          enableSelectableNodes={enableSelectableNodes}
          selectNodesOnDrag={selectNodesOnDrag}
          enableSelectableEdges={enableSelectableEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
      />
      <GraphView>
        {children}
      </GraphView>
    </GraphWrapper>
  )
}

export default Graph