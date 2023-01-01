import { IXYPosition } from "./generic";

export interface INode {
  id: string;
  type: string;
  name: string;
  position: IXYPosition
}