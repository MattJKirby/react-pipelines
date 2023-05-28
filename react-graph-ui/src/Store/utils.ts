import { Dimension, EdgeInternals, IEdge, IHandle, INode, INodeHandles, NodeInternals } from "../Types";
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
 }