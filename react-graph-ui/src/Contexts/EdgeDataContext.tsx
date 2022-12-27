import { createContext, useContext } from 'react';
import { IHandleData } from '../Components/Handle/IHandleData';

export const EdgeDataContext = createContext<{source: IHandleData, target: IHandleData} | undefined>(undefined);

export const useEdgeContext = (): {source: IHandleData, target: IHandleData} | undefined => {
  return useContext(EdgeDataContext);
};

export default EdgeDataContext;