import { IEdge, IGraphStore, INode } from "../Types";

export const initialGraphState: IGraphStore = {
  graphId: "1",
  graphTransform: { scale: 1, translateX: 0, translateY: 0 },
  graphDimensions: {width: 0, height: 0},
  enableDraggableNodes: true,
  enableSelectableNodes: true,
  enableSelectableEdges: true,
  selectNodesOnDrag: true,
  multiSelectionActive: false,
  nodeInternals: new Map<string, INode>(),
  edgeInternals: new Map<string, IEdge>(),
  customNodeTypes: {},
  customEdgeTypes: {},
  handles: [],
  nodeDragInteraction: undefined,
  isValidConnection: undefined,
  selectedHandle: null,
  selectedNodes: [],
  onNodesChange: undefined,
  onEdgesChange: undefined,
  d3Zoom: null,
  d3Selection: null,
  zoomExtent: [0.5,2],
  translateExtent: [[-Infinity,Infinity], [-Infinity,Infinity]],
  domNode: null
};