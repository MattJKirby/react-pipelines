import { ITransform } from "../../Stores/TransformStore"


/**
 * Method for calculating scaled mouse position relative to a given element
 * @param event 
 * @param element 
 * @param transform 
 * @returns 
 */
export const calculateScaledMousePosition = (event: React.MouseEvent, element: HTMLDivElement, transform: ITransform) => {
  const rect = element.getBoundingClientRect()
  return TransformPosition({x: event.clientX - rect.left, y: event.clientY - rect.top}, transform)
}

/**
 * Method for converting a position to a transformed position
 * @param position 
 * @param transform 
 * @returns 
 */
export const TransformPosition = (position: {x: number, y: number}, transform: ITransform) => {
  const transformedX = (position.x - transform.translateX) / transform.scale;
  const transformedY = (position.y - transform.translateY) / transform.scale;

  return {x: transformedX, y: transformedY}
}