import { RefObject, useEffect } from "react";
import { Dimension, INodeStore } from "../Types";
import useDynamicDimensions from "./useDynamicDimensions";

type useNodeDimensionsProps = {
  store: INodeStore
  nodeRef: RefObject<HTMLElement>;
  nodeId: string;
  dimensions: Dimension;
}

const useNodeDimensions = ({
  store,
  nodeRef,
  nodeId,
  dimensions,
}: useNodeDimensionsProps) => {
    const newDimensions = useDynamicDimensions({itemRef: nodeRef});
    const { updateNodeDimensions } = store.getState();

    useEffect(() => {
      if(newDimensions !== dimensions){
        updateNodeDimensions([{id: nodeId, dimensions: newDimensions}])
      }
    }, [dimensions, newDimensions, nodeId, updateNodeDimensions])

  return (
    newDimensions
  )
}

export default useNodeDimensions