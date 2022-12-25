/**
 * Helper method for calculating handle center
 * @param nodePosition 
 * @param handleRef 
 * @returns 
 */
export const calculateHandleCenter = (nodePosition: {x: number, y: number}, handleRef: HTMLDivElement) => {
  const x = nodePosition.x + handleRef.offsetLeft + (handleRef.offsetWidth / 2)
  const y = nodePosition.y + handleRef.offsetTop + (handleRef.offsetHeight / 2)
  return {x: x, y: y}
}