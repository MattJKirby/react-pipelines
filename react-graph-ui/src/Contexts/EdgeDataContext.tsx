import { createContext, useContext } from 'react';
import { IEdge, IHandle } from '../Types';

export const EdgeDataContext = createContext<{edge: IEdge, source: IHandle, target: IHandle} | undefined>(undefined);

export const useEdgeContext = (): {edge: IEdge, source: IHandle, target: IHandle} | undefined => {
  return useContext(EdgeDataContext);
};

export default EdgeDataContext;
