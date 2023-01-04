import { IGraphStore } from "../Types";

export const initialGraphState: IGraphStore = {
  graphId: "1",
  graphTransform: { scale: 1, translateX: 0, translateY: 0 },
  enableDraggableNodes: true,
  nodes: [],
  edges: [],
  customNodeTypes: {},
  customEdgeTypes: {},
  handles: [],
  nodeDragInteraction: undefined,
  handleInteraction: undefined
}