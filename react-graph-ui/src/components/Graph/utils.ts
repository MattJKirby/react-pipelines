import { ITransform } from "../../Stores/TransformStore"
import { TransformPosition } from "../Utility/TransformUtility"

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