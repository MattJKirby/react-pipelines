import { createContext, useContext } from 'react';
import { INodeData } from '../Components/Node/INodeData';

export const NodeDataContext = createContext<INodeData | null>(null);

export const useNodeData = (): INodeData | null => {
  const nodeData = useContext(NodeDataContext);
  return nodeData;
};

export default NodeDataContext;