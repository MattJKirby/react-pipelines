import { IHandleData } from "../Handle/IHandleData";

export const CalculateStraightEdgePath = (source: IHandleData, target: IHandleData) => {
  return `M${source.position.x} ${source.position.y} L ${target.position.x} ${target.position.y}`
}