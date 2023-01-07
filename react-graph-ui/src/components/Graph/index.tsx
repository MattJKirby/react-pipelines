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
  nodes,
  edges,
  nodeTypes,
  enableDraggableNodes,
}) => {

  return (
    <GraphWrapper>
      <GraphView>
        <StoreUpdater
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          enableDraggableNodes={enableDraggableNodes}
        />
        {children}
        </GraphView>
    </GraphWrapper>
  )
}

export default Graph