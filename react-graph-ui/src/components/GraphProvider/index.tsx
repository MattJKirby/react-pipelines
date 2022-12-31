import { useRef } from "react";
import { StoreApi } from "zustand";
import GraphStoreContext from "../../Contexts/GraphStoreContext";
import useGraphInstance from "../../Hooks/useGraphInstance";
import { createGraphStore } from "../../Store";
import { IGraphState } from "../../Types";

type GraphProviderProps = React.PropsWithChildren

/**
 * GraphProvider component enables multiple graphs on each page to have their own GraphStore instance, meaning data is not shared between graphs.
 * This provider also enables the GraphStore to be accesses outside of the Graph component, required for external functionality that reads and/or mutates graphStore instance. 
 * @param param0 
 * @returns 
 */
const GraphProvider = ({ children }: GraphProviderProps) => {
  const storeRef = useRef<StoreApi<IGraphState> | null>(null);
  const graphInstance = useGraphInstance();

  if (!storeRef.current) {
    storeRef.current = createGraphStore({graphId: `${graphInstance}`});
  }

  return (
    <GraphStoreContext.Provider value={storeRef.current}>
      {children}
    </GraphStoreContext.Provider>
  );
};

GraphProvider.displayName = 'GraphProvider';
export default GraphProvider;