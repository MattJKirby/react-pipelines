import { IHandleData } from "../Handle/IHandleData";

export const CalculateStraightPath = (source: IHandleData, target: IHandleData) => {
  return `M${source.position.x} ${source.position.y} L ${target.position.x} ${target.position.y}`
}