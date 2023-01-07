import { FC, PropsWithChildren } from "react";
import { useStoreApi } from "../../Hooks/useStoreApi";
import GraphProvider from "../GraphProvider";

/**
 * Determines if the graph has been wrapped with an external provider. 
 * If not, wraps all childrend with a GraphProvider instance
 */
const GraphWrapper: FC<PropsWithChildren> = ({children}) => {
  let hasStoreInstance = true

  try {
    useStoreApi();
  } catch(e) {
    hasStoreInstance = false
  }

  if(hasStoreInstance){
    return <>{children}</>
  }

  return (
    <GraphProvider>
      {children}
    </GraphProvider>
  )
}

export default GraphWrapper