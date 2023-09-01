import { ComponentType } from "react";
import { Subset } from ".";
import { EdgeProps } from "../Types";
import { NodeChangeTypes, NodeAddChangeData, NodePositionChangeData, NodeSelectionChangeData, EdgeChangeTypes, EdgeAddChangeData, EdgeSelectionChangeData, RemoveNodeChangeData, RemoveEdgeChangeData } from "./changes";
import { EdgeInternals, IEdge } from "./edge";
import { BoundedValueExtent, CoordinateExtent, Dimension, ITransform, IsValidConnection } from "./generic";
import { IHandle, ISelectedHandle } from "./handle";
import { INode, INodeProps, INodeStore, NodeDOMUpdate, NodeInternals } from "./node";
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
  zoomExtent: BoundedValueExtent;
  translateExtent: CoordinateExtent;
  domNode: HTMLDivElement | null;

  //D3 Store
  d3Zoom: ZoomBehavior<Element, unknown> | null;
  d3Selection: D3Selection<Element, unknown, null, undefined> | null;

  // Node Store
  nodeInternals: NodeInternals;
  customNodeTypes: { [key: string]: ComponentType<INodeProps> };
  selectedNodes: string[];

  // Edge Store
  edgeInternals: EdgeInternals;
  customEdgeTypes: { [key: string]: ComponentType<EdgeProps> };

  // Handle Store
  handles: IHandle[];

  // Interaction Store
  nodeDragInteraction: INode | undefined;
  selectedHandle: ISelectedHandle | null;
  isValidConnection: IsValidConnection | undefined

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
  updateNodeDimensions: (updates: NodeDOMUpdate[]) => void;
  setCustomNodeTypes: (nodeTypes: { [key: string]: ComponentType<INodeProps> }) => void;
  updateSelectedNodes: (changes: NodeSelectionChangeData[]) => void;
  resetSelectedNodes: () => void;
  triggerNodeChanges: (nodeChanges: NodeChangeTypes[]) => void;

  // Edge Store Actions
  getEdges: () => IEdge[];
  setEdges: (edges: IEdge[]) => void;
  addEdge: (changes: EdgeAddChangeData[]) => void;
  removeEdge: (changes: RemoveEdgeChangeData[]) => void;
  setCustomEdgeTypes: (edgeTypes: { [key: string]: ComponentType<EdgeProps> }) => void;
  triggerEdgeChanges: (edgeChanges: EdgeChangeTypes[]) => void;
  updateSelectedEdges: (edgeChanges: EdgeSelectionChangeData[]) => void;
  resetSelectedEdges: () => void;

  // Interaction Store Actions
  setNodeDragInteraction: (nodeId: string) => void;
  resetNodeDragInteraction: () => void
  setSelectedHandle: (handle: ISelectedHandle | null) => void
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
  edgeTypes?: { [key: string]: ComponentType<EdgeProps> };
  enableDraggableNodes?: boolean;
  enableSelectableNodes?: boolean;
  selectNodesOnDrag?: boolean;
  enableSelectableEdges?: boolean;
  zoomExtent?: BoundedValueExtent;
  translateExtent?: CoordinateExtent;
  isValidConnection?: IsValidConnection;
  onNodesChange?: OnNodesChange;
  onEdgesChange?: OnEdgesChange;
}

export interface GraphViewProps {
  deleteKeyCode?: string;
  deselectKeyCode?: string;
  multiSelectionKeyCode?: string;
}

export interface IGraphProps extends IStoreUpdaterProps, GraphViewProps {};

export type OnNodesChange = (changes: NodeChangeTypes[]) => void;

export type OnEdgesChange = (changes: EdgeChangeTypes[]) => void;

export interface IElementSelectionHandlerProps {
  id: string;
  unselect?: boolean;
  store: INodeStore;
  disabled?: boolean;
}