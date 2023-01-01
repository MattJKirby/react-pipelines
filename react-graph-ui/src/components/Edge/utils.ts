import { IHandle } from "../../Types"

export const CalculateStraightPath = (source: IHandle, target: IHandle) => {
  return `M${source.position.x} ${source.position.y} L ${target.position.x} ${target.position.y}`
}