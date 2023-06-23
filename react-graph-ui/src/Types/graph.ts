import { ComponentType } from "react";
import { Subset } from ".";
import { EdgeTypeProps } from "../Renderers/EdgeRenderer";
import { NodeChangeTypes, NodeAddChangeData, NodePositionChangeData, NodeSelectionChangeData, EdgeChangeTypes, EdgeAddChangeData, EdgeSelectionChangeData, RemoveNodeChangeData, RemoveEdgeChangeData, NodeDimensionChangeData } from "./changes";
import { EdgeInternals, IEdge } from "./edge";
import { Dimension, ITransform, IXYPosition } from "./generic";
import { IHandle, IHandleInteraction } from "./handle";
import { INode, INodeProps, NodeInternals } from "./node";
import { Selection as D3Selection, ZoomBehavior } from "d3";

export interface IGraphStore {
  // Graph Store
  graphId: string;
  graphDimensions: Dimension;
  graphTransform: ITransform;
  enableDraggableNodes: boolean;
  enableSelectableNodes: boolean;
  multiSelectionActive: boolean;
  selectNodesOnDrag: boolean;
  enableSelectableEdges: boolean;

  //D3 Store
  d3Zoom: ZoomBehavior<Element, unknown> | null;
  d3Selection: D3Selection<Element, unknown, null, undefined> | null;

  // Node Store
  nodeInternals: NodeInternals;
  customNodeTypes: { [key: string]: ComponentType<INodeProps> };
  selectedNodes: string[];

  // Edge Store
  edgeInternals: EdgeInternals;
  customEdgeTypes: { [key: string]: ComponentType<EdgeTypeProps> };

  // Handle Store
  handles: IHandle[];

  // Interaction Store
  nodeDragInteraction: INode | undefined;
  handleInteraction: IHandleInteraction | undefined;

  // Changes store
  onNodesChange: OnNodesChange | undefined;
  onEdgesChange: OnEdgesChange | undefined;
}

export interface IGraphStoreActions {
  // Graph Store Actions
  setGraphTransform: (graphTransform: ITransform) => void;
  setGraphDimensions: (graphDimensions: Dimension) => void;

  // Node Store Actions
  getNodes: () => INode[];
  addNode: (changes: NodeAddChangeData[]) => void;
  setNodes: (nodes: INode[]) => void;
  removeNode: (changes: RemoveNodeChangeData[]) => void;
  updateNodePosition: (changes: NodePositionChangeData[]) => void;
  updateNodeDimensions: (changes: NodeDimensionChangeData[]) => void;
  setCustomNodeTypes: (nodeTypes: { [key: string]: ComponentType<INodeProps> }) => void;
  updateSelectedNodes: (changes: NodeSelectionChangeData[]) => void;
  resetSelectedNodes: () => void;
  triggerNodeChanges: (nodeChanges: NodeChangeTypes[]) => void;

  // Edge Store Actions
  getEdges: () => IEdge[];
  setEdges: (edges: IEdge[]) => void;
  addEdge: (changes: EdgeAddChangeData[]) => void;
  removeEdge: (changes: RemoveEdgeChangeData[]) => void;
  setCustomEdgeTypes: (edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => void;
  triggerEdgeChanges: (edgeChanges: EdgeChangeTypes[]) => void;
  updateSelectedEdges: (edgeChanges: EdgeSelectionChangeData[]) => void;
  resetSelectedEdges: () => void;

  // Handle Store Actions
  addHandle: (nodeId: string, newHandle: IHandle) => void;
  updateHandlePosition: (nodeId: string, handleId: string, position: IXYPosition) => void;
  getHandle: (nodeId: string, handleId: string) => IHandle | undefined;

  // Interaction Store Actions
  setNodeDragInteraction: (nodeId: string) => void;
  resetNodeDragInteraction: () => void;
  newHandleInteraction: (handle: IHandle, mousePosition: IXYPosition, edgeType?: string) => void;
  setHandleInteraction: (interaction: IHandleInteraction) => void;
  resetHandleInteraction: () => void;
}

export interface IGraphState extends IGraphStore, IGraphStoreActions {}

export type IInitialGraphProps = Subset<IGraphStore, {
  graphId: string;
}>

export interface IStoreUpdaterProps {
  id?: string;
  nodes?: INode[];
  nodeTypes?: { [key: string]: ComponentType<INodeProps> };
  edges?: IEdge[];
  enableDraggableNodes?: boolean;
  enableSelectableNodes?: boolean;
  selectNodesOnDrag?: boolean;
  enableSelectableEdges?: boolean;
  onNodesChange?: OnNodesChange;
  onEdgesChange?: OnEdgesChange;
}

export interface GraphViewProps {
  deleteKeyCode?: string;
  deselectKeyCode?: string;
  multiSelectionKeyCode?: string;
}

export interface IGraphProps extends IStoreUpdaterProps, GraphViewProps {}

export type OnNodesChange = (changes: NodeChangeTypes[]) => void;

export type OnEdgesChange = (changes: EdgeChangeTypes[]) => void;