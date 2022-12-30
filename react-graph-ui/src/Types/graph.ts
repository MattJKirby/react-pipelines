import { ComponentType } from "react";
import { EdgeTypeProps } from "../Renderers/EdgeRenderer";
import { NodeTypeProps } from "../Renderers/NodeRenderer";
import { IEdge } from "./edge";
import { ITransform, IXYPosition } from "./generic";
import { IHandle, IHandleInteraction } from "./handle";
import { INode } from "./node";

export interface IGraphStoreProps {
  // Graph Store
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
  removeNode: (id: number) => void;
  updateNodePosition: (id: number, position: IXYPosition) => void;
  getNodeById: (id: number) => INode | undefined;
  setCustomNodeTypes: (nodeTypes: { [key: string]: ComponentType<NodeTypeProps> }) => void;

  // Edge Store Actions
  setCustomEdgeTypes: (edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => void;

  // Handle Store Actions
  addHandle: (handle: IHandle) => void;
  updateHandlePosition: (handleId: string, position: IXYPosition) => void;
  getHandle: (handleId: string) => IHandle | undefined;

  // Interaction Store Actions
  setNodeDragInteraction: (nodeId: number) => void;
  resetNodeDragInteraction: () => void;
  setHandleInteraction: (handle: IHandle, mousePosition: IXYPosition, edgeType?: string) => void;
  resetHandleInteraction: () => void;
}

export interface IGraphState extends IGraphStoreProps, IGraphStoreActions {}