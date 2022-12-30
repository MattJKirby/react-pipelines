import { IGraphStoreProps } from "../Types";

export const initialGraphState: IGraphStoreProps = {
  graphTransform: { scale: 1, translateX: 0, translateY: 0 },
  nodes: [],
  edges: [],
  customNodeTypes: {},
  customEdgeTypes: {},
  handles: [],
  nodeDragInteraction: undefined,
  handleInteraction: undefined
}