/* eslint-disable @typescript-eslint/no-explicit-any */
import { IXYPosition } from "./generic";

export interface INode<T = any> {
  id: string;
  type: string;
  position: IXYPosition;
  selected: boolean;
  dragging: boolean;
  data: T;
}

export interface INodeProps<T = any> {
  id: string;
  selected: boolean;
  dragging: boolean;
  data: T;
}