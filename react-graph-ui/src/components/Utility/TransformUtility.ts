import { ITransform } from "../../Stores/TransformStore"

export const TransformPosition = (position: {x: number, y: number}, transform: ITransform) => {
  const transformedX = (position.x + transform.translateX) * transform.scale;
  const transformedY = (position.y + transform.translateY) * transform.scale;

  return {x: transformedX, y: transformedY}
}