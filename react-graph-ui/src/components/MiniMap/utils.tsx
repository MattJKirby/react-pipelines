/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, INode, Rect } from "../../Types"

/**
 * Function to compute the greater bounding box of two boxes
 * @param box1 
 * @param box2 
 * @returns 
 */
export const computeBoxBounds = (box1: Box, box2: Box): Box => {
  return {
    x: Math.min(box1.x, box2.x),
    y: Math.min(box1.y, box2.y),
    x2: Math.max(box1.x2, box2.x2),
    y2: Math.max(box1.y2, box2.y2)
  }
}

/**
 * Function to convert a Rect to Box coordinates
 * @param rect 
 * @returns 
 */
export const rectToBox = (rect: Rect): Box => {
  return {
    x: rect.x,
    y: rect.y,
    x2: rect.x + rect.width,
    y2: rect.y + rect.height
  }
}

/**
 * Function to convert Box coordinates to Rect
 * @param rect 
 * @returns 
 */
export const boxToRect = (box: Box): Rect => {
  return {
    x: box.x,
    y: box.y,
    width: box.x2 - box.x,
    height: box.y2 - box.y
  }
}

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