import { IHandle, INode, INodeHandles, IXYPosition, PathTypeMap, SelectHandlerProps } from "../../Types"
import { internalsSymbol } from "../../Utils";
import { CalculateBezierPath, CalculateStraightPath } from "./pathTypes";

export const edgeSelectHandler = ({
  id,
  store,
  disabled = false,
  unselect = true
}: SelectHandlerProps) => {
  const { updateSelectedEdges, resetSelectedEdges, edgeInternals } = store.getState();
  const edge = edgeInternals.get(id);

  if(!disabled){
    if(!edge?.selected){
      resetSelectedEdges();
      updateSelectedEdges([{id, selected: true}])
    } else if (unselect){
      updateSelectedEdges([{id, selected: false}])
    }
  }
};

export const edgePathTypeMap: PathTypeMap = new Map([
  ['straight', CalculateStraightPath],
  ['bezier', CalculateBezierPath]
]);

/**
 * Extracts the relevant handle data from nodes
 * @param node 
 * @returns 
 */
export const getNodeData = (node?: INode):[INodeHandles | null, IXYPosition, boolean] => {
  const handles = node?.[internalsSymbol]?.handles || null;
  
  const isValid = 
    handles !== null &&
    node?.position !== undefined

  return [
    handles, 
    {
      x: node?.position.x || 0,
      y: node?.position.y || 0
    }, 
    isValid];
} 

/**
 * Calculate the edge start and end position
 * @param sourceNode 
 * @param sourceHandle 
 * @param targetNode 
 * @param targetHandle 
 */
export const getEdgePositions = (sourceNodePosition: IXYPosition, sourceHandle: IHandle, targetNodePosition: IXYPosition, targetHandle: IHandle) => {
  return {
    sourceX: sourceNodePosition.x + sourceHandle.x,
    sourceY: sourceNodePosition.y + sourceHandle.y,
    targetX: targetNodePosition.x + targetHandle.x,
    targetY: targetNodePosition.y + targetHandle.y
  }
}

