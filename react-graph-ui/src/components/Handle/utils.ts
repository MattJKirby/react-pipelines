import { Position } from "../../Types"
import { getElementDimensions } from "../Graph/utils"

/**
 * Returns the unique handleId in the correct format
 * @param nodeId 
 * @param handleId 
 * @returns 
 */
export const getUniqueHandleId = (nodeId: string, handleId: string): string => {
  return `node_${nodeId}-handle_${handleId}`;
}

/**
 * Gets the bounds of the insertPath
 * @param position 
 * @param handle 
 * @returns 
 */
export const getInsertPathBounds = (position: Position, handle: HTMLElement, pathLength: number): [x1: number, y1: number, x2:number, y2: number] => {
  const {width, height} = getElementDimensions(handle)
  
  switch(position){
    case 'left': {
      return [-width/4,0,-pathLength,0]
    }
    case 'right': {
      return [width/4,0,pathLength,0]
    }
    case 'top': {
      return [0,-height/4,0,-pathLength]
    }
    case 'bottom': {
      return [0,height/4,0,pathLength]
    }
  }
}