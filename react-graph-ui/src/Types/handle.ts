import { IXYPosition } from "./generic";

export interface IHandle {
  id: string;
  name: string;
  type: HandleType;
  nodeId: number;
  position: IXYPosition;
}

export enum HandleType {
  SOURCE = "source",
  TARGET = "target"
}

export interface IHandleInteraction {
  sourceHandle: IHandle;
  targetHandle: IHandle | undefined;
  mousePosition: IXYPosition;
  edgeType: string;
}