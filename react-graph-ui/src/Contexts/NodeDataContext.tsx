import { createContext, useContext } from 'react';
import { INode } from '../Types';

export const NodeDataContext = createContext<INode | undefined>(undefined);

export const useNodeContext = (): INode | undefined => {
  const nodeData = useContext(NodeDataContext);
  return nodeData;
};

export default NodeDataContext;