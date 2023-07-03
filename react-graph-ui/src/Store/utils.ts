import { Dimension, EdgeInternals, HandleType, IEdge, IHandle, INode, INodeHandles, NodeInternals, Position } from "../Types";
import { internalsSymbol } from "../Utils";

export const createNodeInternals = (nodes: INode[], nodeInternals: NodeInternals): NodeInternals => {
  const newNodeInternals = new Map<string, INode>();
  
  nodes.forEach(node => {
    const existingInternals = nodeInternals.get(node.id);

    const internals: INode = {
      dimensions: existingInternals?.dimensions === undefined ? createNodeDimensions() : existingInternals?.dimensions,

      [internalsSymbol]: {
        handles: existingInternals?.[internalsSymbol]?.handles === undefined ? createHandles() : existingInternals?.[internalsSymbol]?.handles 
      },
      ...node,
    };
    newNodeInternals.set(node.id, internals);
  })

  return newNodeInternals;
};

 const createHandles = (): INodeHandles => {
  return { source: new Map<string, IHandle>(), target: new Map<string, IHandle>() }
 };

 const createNodeDimensions = (): Dimension => {
  return {width: 0, height: 0};
}

 export const createEdgeInternals = (edges: IEdge[], edgeInternals: EdgeInternals): EdgeInternals => {
  const newEdgeInternals = new Map<string, IEdge>();

  edges.forEach(edge => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const existingInternals = edgeInternals.get(edge.id);

    const internals: IEdge = {
      ...edge
    };

    newEdgeInternals.set(edge.id, internals)
  });
  
  return newEdgeInternals;
 };

 /**
  * Extracts and creates Handle objects from a node DOM element
  * @param selector 
  * @param nodeDOMElement 
  * @param scale 
  * @returns 
  */
 export const extractHandlesFromDOMData = (
  selector: HandleType,
  nodeDOMElement: Element,
  scale: number
): Map<string, IHandle> | null => {
  const handleElements = Array.from(nodeDOMElement.querySelectorAll(`[class*="${selector}"]`)) as HTMLElement[];

  if (!handleElements || !handleElements.length) {
    return null;
  }

  const nodeBounds = nodeDOMElement.getBoundingClientRect();

  const handleMap = handleElements.reduce((map, handle) => {
    const handleBounds = handle.getBoundingClientRect();

    const handleData: IHandle = {
      id: handle.getAttribute("data-handle-id") as string,
      nodeId: handle.getAttribute("data-node-id") as string,
      elementId: handle.getAttribute("data-id") as string,
      type: handle.getAttribute("data-handle-type") as HandleType,
      position: handle.getAttribute("data-position") as Position,
      x: (handleBounds.left - nodeBounds.left) / scale,
      y: (handleBounds.top - nodeBounds.top) / scale,
      width: handleBounds.width,
      height: handleBounds.height
    };

    map.set(handleData.id, handleData);
    return map;
  }, new Map<string, IHandle>());

  return handleMap;
};