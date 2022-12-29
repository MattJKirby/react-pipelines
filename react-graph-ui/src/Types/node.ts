import { IXYPosition } from "./generic";

export interface INode {
  id: number;
  type: string;
  name: string;
  position: IXYPosition
}