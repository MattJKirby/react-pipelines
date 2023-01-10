/* eslint-disable @typescript-eslint/no-explicit-any */
import { IXYPosition } from "./generic";

export interface INode<T = any> {
  id: string;
  type: string;
  position: IXYPosition;
  data: T;
}

export interface INodeProps<T = any> {
  data: T;
}