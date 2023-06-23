import { MouseEvent } from 'react'
import { Dimension, ITransform, IXYPosition, Rect } from "../../Types";

/**
 * Method for calculating scaled mouse position relative to a given element
 * @param event 
 * @param element 
 * @param transform 
 * @returns 
 */
export const calculateScaledMousePosition = (event: MouseEvent, element: HTMLDivElement, transform: ITransform): IXYPosition => {
  const rect = element.getBoundingClientRect()
  return TransformPosition({x: event.clientX - rect.left, y: event.clientY - rect.top}, transform)
}

/**
 * Method for converting a position to a transformed position
 * @param position 
 * @param transform 
 * @returns 
 */
export const TransformPosition = (position: IXYPosition, transform: ITransform) => {
  const transformedX = (position.x - transform.translateX) / transform.scale;
  const transformedY = (position.y - transform.translateY) / transform.scale;

  return {x: transformedX, y: transformedY}
}

/**
 * Calculate the graph viewport rect from a transform and graph dimensions
 * @param transform 
 * @param graphDimensions 
 * @returns 
 */
export const CalculateGraphViewportRect = (transform: ITransform, graphDimensions: Dimension): Rect => {
  const { translateX, translateY, scale } = transform;
  return {
    x: -translateX / scale,
    y: -translateY / scale,
    width: graphDimensions.width / scale,
    height: graphDimensions.height / scale
  }
}

/**
 * Calculate the required graph transform for a given viewport rect
 * @param viewportRect 
 * @param graphDimensions 
 * @returns 
 */
export const CalculateGraphTransformForViewport = (viewportRect: Rect, graphDimensions: Dimension): ITransform => {
  const scaleX = graphDimensions.width / viewportRect.width;
  const scaleY = graphDimensions.height / viewportRect.height;
  const scale = Math.min(scaleX, scaleY);

  const translateX = -viewportRect.x * scale + (graphDimensions.width - viewportRect.width * scale) / 2;
  const translateY = -viewportRect.y * scale + (graphDimensions.height - viewportRect.height * scale) / 2;

  return {
    translateX,
    translateY,
    scale,
  };
}