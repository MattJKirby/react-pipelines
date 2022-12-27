import { createContext, useContext } from 'react';
import { IEdgeData } from '../Components/Edge/IEdgeData';
import { IHandleData } from '../Components/Handle/IHandleData';

export const EdgeDataContext = createContext<{edge: IEdgeData, source: IHandleData, target: IHandleData} | undefined>(undefined);

export const useEdgeContext = (): {edge: IEdgeData, source: IHandleData, target: IHandleData} | undefined => {
  return useContext(EdgeDataContext);
};

export default EdgeDataContext;
