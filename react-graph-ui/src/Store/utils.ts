import { IHandle, INode, NodeInternals } from "../Types";
import { internalsSymbol } from "../Utils";

export function createNodeInternals(nodes: INode[], nodeInternals: NodeInternals): NodeInternals {
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

  return newNodeInternals
};

 function createHandles(){
  return { source: new Map<string, IHandle>(), target: new Map<string, IHandle>() }
 } 