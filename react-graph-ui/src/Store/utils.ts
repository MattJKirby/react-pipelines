import { IHandle, INode, INodeHandles, NodeInternals } from "../Types";
import { internalsSymbol } from "../Utils";

export const createNodeInternals = (nodes: INode[], nodeInternals: NodeInternals): NodeInternals => {
  const newNodeInternals = new Map<string, INode>();
  
  nodes.forEach(node => {
    const existingInternals = nodeInternals.get(node.id);

    const internals: INode = {
      width: existingInternals?.width,
      height: existingInternals?.height,
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