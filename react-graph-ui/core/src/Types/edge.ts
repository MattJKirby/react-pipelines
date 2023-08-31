import { ComponentType } from "react";
import { IXYPosition, Position } from "./generic";
import { IHandle } from "./handle";
import { INodeStore } from "./node";
import { EdgeProps } from "../Renderers/EdgeRenderer";

export interface IEdge {
  id: string;
  sourceNodeId: string;
  sourceNodeOutput: string;
  targetNodeId: string;
  targetNodeInput: string;
  type: string;
  selected?: boolean;
  enableSelect?: boolean;
  pathType?: PathType;
  interactionWidth?: number;
}

export interface IEdgeWrapperProps {
  children: React.ReactNode;
  id: string;
  EdgeType: ComponentType<EdgeProps>;
  source: IHandle;
  target: IHandle;
  sourceX: number,
  sourceY: number,
  targetX: number, 
  targetY: number,
  selected: boolean;
  enableSelect: boolean;
  dragging: boolean;
  interactionWidth: number
}

export type EdgeInternals = Map<string, IEdge>;

export type PathType = 
| 'straight'
| 'bezier'

export type PathTypeMap = Map<PathType, (source: IXYPosition, target: IXYPosition, sourcePosition?: Position, targetPosition?: Position, curvature?: number) => string>

// TODO: Make Generic for nodes and edge types
export type SelectHandlerProps = {
  id: string,
  store: INodeStore,
  disabled?: boolean,
  unselect?: boolean
}