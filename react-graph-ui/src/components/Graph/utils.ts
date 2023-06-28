import { MouseEvent } from 'react'
import { BoundedValueExtent, Dimension, ITransform, IXYPosition, Rect, CoordinateExtent, INode, Box } from "../../Types";
import { clamp, computeBoxBounds, rectToBox } from '../../Utils';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

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
 * Includes optional extent arguments used to caluclate graph transforms that take into account bounds.
 * @param viewportRect 
 * @param graphDimensions 
 * @returns 
 */
export const CalculateGraphTransformForViewport = (viewportRect: Rect, graphDimensions: Dimension, zoomExtent?: BoundedValueExtent, translateExtent?: CoordinateExtent, scaleOffset = 1): ITransform => {
  const scaleX = graphDimensions.width / viewportRect.width;
  const scaleY = graphDimensions.height / viewportRect.height;
  const scale = Math.min(scaleX, scaleY) * scaleOffset;
 
  const translateX = -viewportRect.x * scale + (graphDimensions.width - viewportRect.width * scale) / 2;
  const translateY = -viewportRect.y * scale + (graphDimensions.height - viewportRect.height * scale) / 2;

  return {
    translateX: translateExtent ? clamp(translateX, translateExtent[0][0], translateExtent[0][1]) : translateX,
    translateY: translateExtent ? clamp(translateY, translateExtent[1][0], translateExtent[1][1]) : translateY,
    scale: zoomExtent ? clamp(scale, zoomExtent[0], zoomExtent[1]) : scale
  };
};

/**
 * Function to compute the bunding box of a list of nodes.
 * Return a box of size 0
 * @param nodeInternals 
 */
export const computeNodeBoundingBox = (nodes: INode[]): Box => {
  if(nodes.length > 0){
    const nodeRects = nodes
    .filter(node => node.dimensions !== undefined)
    .map(node => ({
      x: node.position.x, 
      y: node.position.y, 
      width: node.dimensions!.width,
      height: node.dimensions!.height
    }))

    return nodeRects.reduce((boundingBox: Box, nodeRect: Rect) => computeBoxBounds(boundingBox, rectToBox(nodeRect)), rectToBox(nodeRects[0]))
  } else {
    return {x: 0, y: 0, x2: 0, y2: 0};
  }
}