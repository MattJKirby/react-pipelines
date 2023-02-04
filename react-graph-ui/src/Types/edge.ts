import { IHandle } from "./handle";

export interface IEdge {
  id: string;
  sourceNodeId: string;
  sourceNodeOutput: string;
  targetNodeId: string;
  targetNodeInput: string;
  type: string;
}

export interface IEdgeProps {
  children: React.ReactNode
  edge: IEdge
  source: IHandle
  target: IHandle
}

export type EdgeInternals = Map<string, IEdge>;