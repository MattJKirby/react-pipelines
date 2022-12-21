import { createContext, useContext } from 'react';

export const NodeIdContext = createContext<string | null>(null);

export const useNodeId = (): string | null => {
  const nodeId = useContext(NodeIdContext);
  return nodeId;
};

export default NodeIdContext;