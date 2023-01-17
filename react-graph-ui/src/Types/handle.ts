import { IXYPosition } from "./generic";

export interface IHandle {
  id: string;
  nodeId: string;
  name: string;
  type: HandleType;
  position: IXYPosition;
}

export interface HandleProps {
  children?: React.ReactNode;
  id: string;
  name?: string;
  type?: HandleType;
  edgeType?: string;
}

type HandleType = 'source' | 'target';

export interface IHandleInteraction {
  sourceHandle: IHandle;
  targetHandle: IHandle | undefined;
  mousePosition: IXYPosition;
  edgeType: string;
}