import { useContext, useMemo } from "react";
import GraphStoreContext from "../Contexts/GraphStoreContext";

export const useStoreApi = () => {
  const store = useContext(GraphStoreContext);

  if (store === null) {
    throw new Error("Missing GraphContext.Provider in tree");
  }

  return useMemo(
    () => ({
      getState: store.getState,
      setState: store.setState,
      subscribe: store.subscribe,
      destroy: store.destroy,
    }),
    [store]
  );
};