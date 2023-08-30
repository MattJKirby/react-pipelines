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
  edgeTypes,
  enableDraggableNodes,
  enableSelectableNodes,
  selectNodesOnDrag,
  enableSelectableEdges,
  deleteKeyCode,
  deselectKeyCode,
  multiSelectionKeyCode,
  zoomExtent,
  translateExtent,
  onNodesChange,
  onEdgesChange,
  isValidConnection,
}) => {
  const graphId = id || '1';

  return (
    <GraphWrapper>
      <StoreUpdater
          id={graphId}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          enableDraggableNodes={enableDraggableNodes}
          enableSelectableNodes={enableSelectableNodes}
          selectNodesOnDrag={selectNodesOnDrag}
          enableSelectableEdges={enableSelectableEdges}
          zoomExtent={zoomExtent}
          translateExtent={translateExtent}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          isValidConnection={isValidConnection}
      />
      <GraphView
        deleteKeyCode={deleteKeyCode}
        deselectKeyCode={deselectKeyCode}
        multiSelectionKeyCode={multiSelectionKeyCode}
      >
        {children}
      </GraphView>
    </GraphWrapper>
  )
}

export default Graph