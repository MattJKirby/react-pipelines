import { ComponentType } from "react";
import { Subset } from ".";
import { EdgeTypeProps } from "../Renderers/EdgeRenderer";
import { NodeTypeProps } from "../Renderers/NodeRenderer";
import { IEdge } from "./edge";
import { ITransform, IXYPosition } from "./generic";
import { IHandle, IHandleInteraction } from "./handle";
import { INode } from "./node";

export interface IGraphStoreProps {
  // Graph Store
  graphId: string;
  graphTransform: ITransform;

  // Node Store
  nodes: INode[];
  customNodeTypes: { [key: string]: ComponentType<NodeTypeProps> };

  // Edge Store
  edges: IEdge[];
  customEdgeTypes: { [key: string]: ComponentType<EdgeTypeProps> };

  // Handle Store
  handles: IHandle[];

  // Interaction Store
  nodeDragInteraction: number | undefined;
  handleInteraction: IHandleInteraction | undefined
}

export interface IGraphStoreActions {
  // Graph Store Actions
  setGraphTransform: (graphTransform: ITransform) => void;

  // Node Store Actions
  addNode: (node: INode) => void;
  removeNode: (id: string) => void;
  updateNodePosition: (id: string, position: IXYPosition) => void;
  getNodeById: (id: string) => INode | undefined;
  setCustomNodeTypes: (nodeTypes: { [key: string]: ComponentType<NodeTypeProps> }) => void;

  // Edge Store Actions
  addEdge: (edge: IEdge) => void;
  setCustomEdgeTypes: (edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => void;

  // Handle Store Actions
  addHandle: (handle: IHandle) => void;
  updateHandlePosition: (handleId: string, position: IXYPosition) => void;
  getHandle: (nodeId: string, handleId: string) => IHandle | undefined;

  // Interaction Store Actions
  setNodeDragInteraction: (nodeId: number) => void;
  resetNodeDragInteraction: () => void;
  setHandleInteraction: (handle: IHandle, mousePosition: IXYPosition, edgeType?: string) => void;
  resetHandleInteraction: () => void;
}

export interface IGraphState extends IGraphStoreProps, IGraphStoreActions {}

export type IInitialGraphProps = Subset<IGraphStoreProps, {
  graphId: string;
}>