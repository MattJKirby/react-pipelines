import { INode, NodeInternals } from "../Types";

export function createNodeInternals(nodes: INode[], nodeInternals: NodeInternals): NodeInternals {
  const newNodeInternals = new Map<string, INode>();
  
  nodes.forEach(node => {
    const existingInternals = nodeInternals.get(node.id);

    const internals: INode = {
      width: existingInternals?.width,
      height: existingInternals?.height,
      ...node,
    };
    newNodeInternals.set(node.id, internals);
  })

  return newNodeInternals
}