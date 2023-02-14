import { IHandle } from "./handle";
import { INodeStore } from "./node";

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

export interface IEdgeContainerProps {
  children: React.ReactNode;
  id: string;
  source: IHandle;
  target: IHandle;
  selected: boolean;
  enableSelect: boolean;
  path: string
  interactionWidth: number;
  dragging: boolean;
}

export type EdgeInternals = Map<string, IEdge>;

export type PathType = 
| 'straight'

export type PathTypeMap = Map<PathType, (source: IHandle, target: IHandle) => string>

// TODO: Make Generic for nodes and edge types
export type SelectHandlerProps = {
  id: string,
  store: INodeStore,
  disabled?: boolean,
  unselect?: boolean
}