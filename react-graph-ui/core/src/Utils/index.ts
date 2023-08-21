import { Box, Rect } from "../Types";

export const internalsSymbol = Symbol.for('internals');

export const clamp = (val: number, min = 0, max = 1): number => Math.min(Math.max(val, min), max);

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