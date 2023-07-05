/**
 * Returns the unique handleId in the correct format
 * @param nodeId 
 * @param handleId 
 * @returns 
 */
export const getUniqueHandleId = (nodeId: string, handleId: string): string => {
  return `node_${nodeId}-handle_${handleId}`;
}