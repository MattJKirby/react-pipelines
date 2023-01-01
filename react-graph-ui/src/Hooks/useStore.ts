// Mimic the hook returned by `create`
import { useContext } from 'react'
import { StoreApi, useStore as useZustandStore } from 'zustand'
import GraphStoreContext from '../Contexts/GraphStoreContext';
import { IGraphState } from '../Types';

type ExtractState = StoreApi<IGraphState> extends { getState: () => infer T } ? T : never;

export const useStore = <StateSlice = ExtractState>(
  selector: (state: IGraphState) => StateSlice,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean
): StateSlice => {
  const store = useContext(GraphStoreContext)
  

  if(store === null){
    throw new Error("Missing GraphContext.Provider in tree")
  }
  return useZustandStore(store, selector, equalityFn)
}