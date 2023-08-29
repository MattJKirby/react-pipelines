import { IXYPosition, Position } from "./generic";

export type IHandle =  IXYPosition & {
  id: string;
  nodeId: string;
  type: HandleType;
  position: Position;
  elementId: string;
  width: number;
  height: number;
}

export interface HandleProps {
  children?: React.ReactNode;
  id: string;
  type?: HandleType;
  edgeType?: string;
  position?: Position
}

export type HandleType = 'source' | 'target';

export interface ISelectedHandle {
  sourceHandle: string;
  sourceNode: string
  sourceHandleType: HandleType
  uniqueHandleId: string
}