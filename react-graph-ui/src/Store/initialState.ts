import { IGraphStoreProps } from "../Types";

export const initialGraphState: IGraphStoreProps = {
  graphId: "1",
  graphTransform: { scale: 1, translateX: 0, translateY: 0 },
  nodes: [],
  edges: [],
  customNodeTypes: {},
  customEdgeTypes: {},
  handles: [],
  nodeDragInteraction: undefined,
  handleInteraction: undefined
}