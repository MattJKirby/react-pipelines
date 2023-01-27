import { ComponentType } from "react";
import { Subset } from ".";
import { EdgeTypeProps } from "../Renderers/EdgeRenderer";
import { IEdge } from "./edge";
import { ITransform, IXYPosition } from "./generic";
import { IHandle, IHandleInteraction } from "./handle";
import { INode, INodeProps, NodeInternals } from "./node";

export interface IGraphStore {
  // Graph Store
  graphId: string;
  graphTransform: ITransform;
  enableDraggableNodes: boolean;
  enableSelectableNodes: boolean;
  selectNodesOnDrag: boolean;

  // Node Store
  nodeInternals: NodeInternals;
  customNodeTypes: { [key: string]: ComponentType<INodeProps> };
  selectedNodes: string[];

  // Edge Store
  edges: IEdge[];
  customEdgeTypes: { [key: string]: ComponentType<EdgeTypeProps> };

  // Handle Store
  handles: IHandle[];

  // Interaction Store
  nodeDragInteraction: INode | undefined;
  handleInteraction: IHandleInteraction | undefined
}

export interface IGraphStoreActions {
  // Graph Store Actions
  setGraphTransform: (graphTransform: ITransform) => void;

  // Node Store Actions
  getNodes: () => INode[];
  addNode: (node: INode) => void;
  setNodes: (nodes: INode[]) => void;
  removeNode: (id: string) => void;
  updateNodePosition: (nodeIds: string[], position: IXYPosition, dragging: boolean) => void;
  setCustomNodeTypes: (nodeTypes: { [key: string]: ComponentType<INodeProps> }) => void;
  addSelectedNode: (selectedNodeId: string) => void;
  removeSelectedNodes: (selectedNodeIds: string[], all?: boolean) => void;

  // Edge Store Actions
  addEdge: (edge: IEdge) => void;
  setEdges: (edges: IEdge[]) => void;
  newEdge: (sourceNodeId: string, sourceNodeOutput: string, targetNodeId: string, targetNodeInput: string, type: string) => void;
  setCustomEdgeTypes: (edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => void;
  getEdge: (edgeId: string) => void;

  // Handle Store Actions
  addHandle: (handle: IHandle) => void;
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

export interface IGraphProps {
  id?: string;
  nodes?: INode[];
  nodeTypes?: { [key: string]: ComponentType<INodeProps> };
  edges?: IEdge[];
  enableDraggableNodes?: boolean;
  enableSelectableNodes?: boolean;
  selectNodesOnDrag?: boolean;
}