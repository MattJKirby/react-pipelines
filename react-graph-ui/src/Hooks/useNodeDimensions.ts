import { RefObject, useEffect } from "react";
import { INodeStore } from "../Types";
import useDynamicDimensions from "./useDynamicDimensions";

type useNodeDimensionsProps = {
  store: INodeStore
  nodeRef: RefObject<HTMLElement>;
  nodeId: string;
}

const useNodeDimensions = ({
  store,
  nodeRef,
  nodeId,
}: useNodeDimensionsProps) => {
    const newDimensions = useDynamicDimensions({itemRef: nodeRef});
    const { updateNodeDimensions, nodeInternals } = store.getState();

    useEffect(() => {
      if(newDimensions !== nodeInternals.get(nodeId)?.dimensions){
        updateNodeDimensions([{id: nodeId, dimensions: newDimensions}])
      }
    }, [newDimensions, nodeId, nodeInternals, updateNodeDimensions])

  return (
    newDimensions
  )
}

export default useNodeDimensions