import { createContext, useContext } from 'react';
import { INodeData } from '../Components/Node/INodeData';

export const NodeDataContext = createContext<INodeData | undefined>(undefined);

export const useNodeContext = (): INodeData | undefined => {
  const nodeData = useContext(NodeDataContext);
  return nodeData;
};

export default NodeDataContext;