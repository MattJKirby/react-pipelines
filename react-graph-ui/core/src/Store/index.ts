import { StoreApi } from "zustand";
import { createStore } from "zustand";
import { Dimension, IGraphState, IInitialGraphProps, ISelectedHandle, ITransform } from "../Types";
import { initialGraphState } from "./initialState";
import { ComponentType } from "react";
import { EdgeProps } from "../Renderers/EdgeRenderer";
import { INode, INodeProps, NodeDOMUpdate } from "../Types/node";
import { IEdge } from "../Types/edge";
import { createEdgeInternals, createNodeInternals, extractHandlesFromDOMData } from "./utils";
import { NodeChangeTypes, NodeAddChange, NodeAddChangeData, NodePositionChange, NodePositionChangeData, NodeSelectionChange, NodeSelectionChangeData, EdgeAddChange, EdgeChangeTypes, EdgeAddChangeData, EdgeSelectionChangeData, EdgeSelectionChange, RemoveNodeChangeData, RemoveNodeChange, RemoveEdgeChangeData, RemoveEdgeChange, NodeDOMChange, NodeDOMChangeData } from "../Types/changes";
import { createChange, applyNodeChanges, applyEdgeChanges } from "../Changes";
import { getElementDimensions } from "../Components/Graph/utils";


export const createGraphStore = (initialProps?: IInitialGraphProps): StoreApi<IGraphState> => {
  return createStore<IGraphState>((set,get) => ({
    ...initialGraphState,
    ...initialProps,
   
    // Graph Store Actions
    setGraphTransform: (graphTransform: ITransform) => set({graphTransform}),
    setGraphDimensions: (graphDimensions: Dimension) => set({graphDimensions}),

    // Node Store Actions
    getNodes: () => {
      return Array.from(get().nodeInternals.values());
    },
    addNode: (changes: NodeAddChangeData[]) => {
      const { triggerNodeChanges } = get();
      triggerNodeChanges(createChange<NodeAddChange>(changes, 'add'));
    },
    setNodes: (nodes: INode[]) => {
      const { nodeInternals } = get();
      set({ nodeInternals: createNodeInternals(nodes, nodeInternals)});
    },
    removeNode: (changes: RemoveNodeChangeData[]) => {
      const { triggerNodeChanges, getEdges, triggerEdgeChanges } = get();
      const nodes: string[] = [...new Set(changes.map((change) => change.id))];
      const connectedEdges = getEdges().filter(e => nodes.includes(e.sourceNodeId) || nodes.includes(e.targetNodeId));
    
      triggerEdgeChanges(createChange<RemoveEdgeChange>(connectedEdges.map(e => {return {id: e.id}}), 'remove'));
      triggerNodeChanges(createChange<RemoveNodeChange>(changes,'remove'));
    },
    updateNodePosition: (changes: NodePositionChangeData[]) => {
      const { triggerNodeChanges } = get();
      triggerNodeChanges(createChange<NodePositionChange>(changes, 'position'));
    },
    updateNodeDimensions: (updates: NodeDOMUpdate[]) => {
      const { triggerNodeChanges, graphTransform, nodeInternals } = get()
      
      const changes = updates.reduce((res: NodeDOMChangeData[], item: NodeDOMUpdate) => {
      const updateNode = nodeInternals.get(item.id);
      
      const sourceHandles = extractHandlesFromDOMData('source', item.nodeElement, graphTransform.scale);
      const targetHandles = extractHandlesFromDOMData('target', item.nodeElement, graphTransform.scale);

      const dimensions = getElementDimensions(item.nodeElement);
      const updateDimensions = updateNode?.dimensions?.width !== dimensions.width && updateNode?.dimensions?.height !== dimensions.height;

      if(updateDimensions || item.forceUpdate){
        res.push({id: item.id, dimensions, sourceHandles, targetHandles})
      }

        return res;
      }, []);

      triggerNodeChanges(createChange<NodeDOMChange>(changes, 'dom'));
    },
    setCustomNodeTypes: (customNodeTypes: { [key: string]: ComponentType<INodeProps> }) => set({customNodeTypes}),
    updateSelectedNodes: (changes: NodeSelectionChangeData[]) => {
      const { triggerNodeChanges } = get();
      triggerNodeChanges(createChange<NodeSelectionChange>(changes, 'select'));
    },
    resetSelectedNodes: () =>  {
      const { triggerNodeChanges, getNodes } = get();
      const changes = getNodes().map(node => ({id: node.id, selected: false}));
      triggerNodeChanges(createChange<NodeSelectionChange>(changes, 'select'));
    },
    triggerNodeChanges: (nodeChanges: NodeChangeTypes[]) => {
      const { nodeInternals, getNodes, onNodesChange } = get();
      if(nodeChanges.length){
        const nodes = applyNodeChanges(nodeChanges, getNodes());
        set({ nodeInternals: createNodeInternals(nodes, nodeInternals)});

        onNodesChange?.(nodeChanges);
      }
    },

    // Edge Store Actions
    getEdges: () => {
      return Array.from(get().edgeInternals.values());
    },
    setEdges: (edges: IEdge[]) => {
      const { edgeInternals } = get();
      set({edgeInternals: createEdgeInternals(edges, edgeInternals)});
    },
    addEdge: (changes: EdgeAddChangeData[]) => {
      const { triggerEdgeChanges } = get();
      triggerEdgeChanges(createChange<EdgeAddChange>(changes, 'add'));
    },
    removeEdge: (changes: RemoveEdgeChangeData[]) => {
      const { triggerEdgeChanges } = get();
      triggerEdgeChanges(createChange<RemoveEdgeChange>(changes, 'remove'));
    },
    setCustomEdgeTypes: (customEdgeTypes: { [key: string]: ComponentType<EdgeProps> }) => set({customEdgeTypes}),
    updateSelectedEdges: (edgeChanges: EdgeSelectionChangeData[]) => {
      const { triggerEdgeChanges } = get();
      triggerEdgeChanges(createChange<EdgeSelectionChange>(edgeChanges, 'select'));
    },
    resetSelectedEdges: () => {
      const { triggerEdgeChanges, getEdges } = get();
      const changes = getEdges().map(edge => ({id: edge.id, selected: false}));
      triggerEdgeChanges(createChange<EdgeSelectionChange>(changes, 'select'));
    },
    triggerEdgeChanges: (edgeChanges: EdgeChangeTypes[]) => {
      const { edgeInternals, getEdges, onEdgesChange } = get();

      if(edgeChanges.length){
        const edges = applyEdgeChanges(edgeChanges, getEdges());
        set({edgeInternals: createEdgeInternals(edges, edgeInternals)});

        onEdgesChange?.(edgeChanges);
      };
    },
    
    // Interaction Store Actions
    setNodeDragInteraction: (nodeId: string) => set((state) => ({nodeDragInteraction: state.nodeInternals.get(nodeId)})),
    resetNodeDragInteraction: () => set({nodeDragInteraction: undefined}),
    setSelectedHandle: (handle: ISelectedHandle | null) => set({selectedHandle: handle})
  }))}