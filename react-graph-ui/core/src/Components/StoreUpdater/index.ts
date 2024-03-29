import { ComponentType, useEffect } from "react";
import { StoreApi } from "zustand";
import { useStore } from "../../Hooks/useStore";
import useStoreApi from "../../Hooks/useStoreApi";
import { BoundedValueExtent, IEdge, IGraphState, IGraphStore, INode, INodeProps, IStoreUpdaterProps, OnEdgesChange, OnNodesChange, CoordinateExtent, IsValidConnection } from "../../Types";
import { EdgeProps } from "../../Types";

/**
 * StoreUpdater hook for graph store keys that don't have a dedicated setter.
 */
const useDirectStoreUpdater = <T>(key: keyof IGraphStore, value: T | undefined, setState: StoreApi<IGraphStore>['setState']) => {
  useEffect(() => {
    if(typeof value !== 'undefined'){
      setState({[key]: value})
    }
  }, [key, setState, value]);
}

/**
 * StoreUpdater hook for store keys that do have a dedicated setter.
 */
const useDedicatedStoreUpdater = <T>(value: T | undefined, storeSetter: (param: T) => void) => {
  useEffect(() => {
    if(typeof value !== 'undefined'){
      storeSetter(value)
    }
  }, [storeSetter, value]);
}

const selector = (s: IGraphState) => ({
  setCustomNodeTypes: s.setCustomNodeTypes,
  setCustomEdgeTypes: s.setCustomEdgeTypes,
  setNodes: s.setNodes,
  setEdges: s.setEdges,
});

/**
 * StoreUpdaterComponent used to update the store when the graph prop values change.
 */
const StoreUpdater = (props: IStoreUpdaterProps) => {
  const storeApi = useStoreApi();
  const store = useStore(selector);

  useDirectStoreUpdater<string>('graphId', props.id, storeApi.setState);
  useDirectStoreUpdater<boolean>('enableDraggableNodes', props.enableDraggableNodes, storeApi.setState);
  useDirectStoreUpdater<boolean>('enableSelectableNodes', props.enableSelectableNodes, storeApi.setState);
  useDirectStoreUpdater<boolean>('selectNodesOnDrag', props.selectNodesOnDrag, storeApi.setState);
  useDirectStoreUpdater<boolean>('enableSelectableEdges', props.enableSelectableEdges, storeApi.setState);
  useDirectStoreUpdater<BoundedValueExtent>('zoomExtent', props.zoomExtent, storeApi.setState);
  useDirectStoreUpdater<CoordinateExtent>('translateExtent', props.translateExtent, storeApi.setState);
  useDirectStoreUpdater<OnNodesChange>('onNodesChange', props.onNodesChange, storeApi.setState);
  useDirectStoreUpdater<OnEdgesChange>('onEdgesChange', props.onEdgesChange, storeApi.setState)
  useDirectStoreUpdater<IsValidConnection>('isValidConnection', props.isValidConnection, storeApi.setState);

  useDedicatedStoreUpdater<INode[]>(props.nodes, store.setNodes);
  useDedicatedStoreUpdater<IEdge[]>(props.edges, store.setEdges);
  useDedicatedStoreUpdater<{[key: string]: ComponentType<INodeProps>}>(props.nodeTypes, store.setCustomNodeTypes);
  useDedicatedStoreUpdater<{[key: string]: ComponentType<EdgeProps>}>(props.edgeTypes, store.setCustomEdgeTypes);

  return null;
}

export default StoreUpdater;