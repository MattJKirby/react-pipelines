import { IXYPosition } from "./generic";

export interface IHandle {
  id: string;
  nodeId: string;
  name: string;
  type: HandleType;
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