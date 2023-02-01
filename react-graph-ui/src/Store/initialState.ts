import { IGraphStore, INode } from "../Types";

export const initialGraphState: IGraphStore = {
  graphId: "1",
  graphTransform: { scale: 1, translateX: 0, translateY: 0 },
  enableDraggableNodes: true,
  enableSelectableNodes: true,
  selectNodesOnDrag: true,
  nodeInternals: new Map<string, INode>(),
  edges: [],
  customNodeTypes: {},
  customEdgeTypes: {},
  handles: [],
  nodeDragInteraction: undefined,
  handleInteraction: undefined,
  selectedNodes: [],
  onNodesChange: undefined,
};