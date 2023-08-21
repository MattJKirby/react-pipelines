import { RefObject, useEffect } from "react";
import { INodeStore, IXYPosition } from "../Types";
import useDynamicDimensions from "./useDynamicDimensions";

type useTrackNodeDOMUpdatesProps = {
  store: INodeStore
  nodeRef: RefObject<HTMLElement>;
  nodeId: string;
  position: IXYPosition;
}

const useTrackNodeDOMUpdates = ({
  store,
  nodeRef,
  nodeId,
  position
}: useTrackNodeDOMUpdatesProps) => {
    const newDimensions = useDynamicDimensions({itemRef: nodeRef});
    const { updateNodeDimensions, nodeInternals } = store.getState();
    const node = nodeInternals.get(nodeId);

    useEffect(() => {
      if(position !== node?.position && nodeRef.current !== null){
        updateNodeDimensions([{id: nodeId, nodeElement: nodeRef.current, forceUpdate: true}])
      }
    }, [node?.position, nodeId, nodeRef, position, updateNodeDimensions])

    useEffect(() => {
      if(newDimensions !== node?.dimensions && nodeRef.current !== null){
        updateNodeDimensions([{id: nodeId, nodeElement: nodeRef.current, forceUpdate: false}])
      }
    },[newDimensions, node?.dimensions, nodeId, nodeRef, updateNodeDimensions])

  return (
    newDimensions
  )
}

export default useTrackNodeDOMUpdates;