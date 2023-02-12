import { IHandle } from "./handle";

export interface IEdge {
  id: string;
  sourceNodeId: string;
  sourceNodeOutput: string;
  targetNodeId: string;
  targetNodeInput: string;
  type: string;
  selected?: boolean;
}

export interface IEdgeProps {
  children: React.ReactNode;
  edge: IEdge;
  source: IHandle;
  target: IHandle;
  selected: boolean;
  enableSelect: boolean;
}

export type EdgeInternals = Map<string, IEdge>;