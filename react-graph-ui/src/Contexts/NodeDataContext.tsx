import { createContext, useContext } from 'react';
import { INode } from '../Types';

export const NodeDataContext = createContext<Partial<INode> | undefined>(undefined);

export const useNodeContext = (): Partial<INode> | undefined => {
  const nodeData = useContext(NodeDataContext);
  return nodeData;
};

export default NodeDataContext;