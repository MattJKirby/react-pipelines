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
      />
      <GraphView>
        {children}
      </GraphView>
    </GraphWrapper>
  )
}

export default Graph