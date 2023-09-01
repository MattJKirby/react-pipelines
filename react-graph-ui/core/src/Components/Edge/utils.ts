import { Dimension, IHandle, INode, INodeHandles, IXYPosition, PathCenter, Position, SelectHandlerProps } from "../../Types"
import { internalsSymbol } from "../../Utils";

export const edgeSelectHandler = ({
  id,
  store,
  disabled = false,
  unselect = true
}: SelectHandlerProps) => {
  const { updateSelectedEdges, resetSelectedEdges, edgeInternals, multiSelectionActive } = store.getState();
  const edge = edgeInternals.get(id);

  if(!disabled){
    if(!edge?.selected){
      !multiSelectionActive ? resetSelectedEdges() : null;
      updateSelectedEdges([{id, selected: true}]);
    } else if (unselect){
      updateSelectedEdges([{id, selected: false}]);
    }

    if(edge?.selected && !multiSelectionActive){
      resetSelectedEdges()
      updateSelectedEdges([{id, selected: true}]);
    }
  }
};

/**
 * Extracts the relevant handle data from nodes
 * @param node 
 * @returns 
 */
export const getNodeData = (node?: INode):[INodeHandles | null, IXYPosition, Dimension, boolean] => {
  const handles = node?.[internalsSymbol]?.handles || null;
  
  const isValid = 
    handles !== null &&
    node?.position !== undefined &&
    node?.dimensions !== undefined;


  return [
    handles, 
    {
      x: node?.position.x || 0,
      y: node?.position.y || 0
    },
    {
      width: node?.dimensions?.width || 0,
      height: node?.dimensions?.height || 0
    },
    isValid];
} 

/**
 * Calculate the handle position
 * @param position 
 * @param nodeRect 
 * @param handle 
 * @returns 
 */
export const getHandlePosition = (position: Position, nodePosition: IXYPosition, nodeDimensions: Dimension, handle: IHandle | null = null): IXYPosition => {
  const x = (handle?.x || 0) + nodePosition.x;
  const y = (handle?.y || 0) + nodePosition.y;
  const width = handle?.width || nodeDimensions.width;
  const height = handle?.height || nodeDimensions.height;

  switch (position) {
    case "top":
      return {
        x: x + width / 2,
        y,
      };
    case "right":
      return {
        x: x + width,
        y: y + height / 2,
      };
    case "bottom":
      return {
        x: x + width / 2,
        y: y + height,
      };
    case "left":
      return {
        x,
        y: y + height / 2,
      };
  }
}

/**
 * Calculate the edge start and end position
 * @param sourceNode 
 * @param sourceHandle 
 * @param targetNode 
 * @param targetHandle 
 */
export const getEdgePositions = (sourcePosition: Position, sourceNodePosition: IXYPosition, sourceHandle: IHandle, sourceDimensions: Dimension, targetPosition: Position, targetNodePosition: IXYPosition, targetHandle: IHandle, targetDimensions: Dimension) => {
  const sourceHandlePosition = getHandlePosition(sourcePosition,sourceNodePosition,sourceDimensions, sourceHandle);
  const targetHandlePosition = getHandlePosition(targetPosition,targetNodePosition,targetDimensions, targetHandle);

  return {
    sourceX: sourceHandlePosition.x,
    sourceY: sourceHandlePosition.y,
    targetX: targetHandlePosition.x,
    targetY: targetHandlePosition.y
  }
}
/**
 * Calculate the center of a bezier path
 * @param param0 
 * @returns 
 */
export const getBezierPathCenter = (
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourceControlX: number,
  sourceControlY: number,
  targetControlX: number,
  targetControlY: number
): PathCenter => {
  // https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
  const centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;
  const centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
  const offsetX = Math.abs(centerX - sourceX);
  const offsetY = Math.abs(centerY - sourceY);

  return {
    centerX,
    centerY,
    offsetX,
    offsetY
  };
};




