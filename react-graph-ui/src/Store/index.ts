import { StoreApi } from "zustand";
import { createStore } from "zustand";
import { IGraphState, IInitialGraphProps, ITransform, IXYPosition } from "../Types";
import { initialGraphState } from "./initialState";
import { ComponentType } from "react";
import { EdgeTypeProps } from "../Renderers/EdgeRenderer";
import { INode, INodeProps } from "../Types/node";
import { IEdge } from "../Types/edge";
import { IHandle, IHandleInteraction } from "../Types/handle";
import { createEdgeInternals, createNodeInternals } from "./utils";
import { internalsSymbol } from "../Utils";
import { NodeChangeTypes, NodeAddChange, NodeAddChangeData, NodePositionChange, NodePositionChangeData, NodeSelectionChange, NodeSelectionChangeData, EdgeAddChange, EdgeChangeTypes, EdgeAddChangeData, EdgeSelectionChangeData, EdgeSelectionChange, RemoveNodeChangeData, RemoveNodeChange, RemoveEdgeChangeData, RemoveEdgeChange } from "../Types/changes";
import { createChange, applyNodeChanges, applyEdgeChanges } from "../Changes";


export const createGraphStore = (initialProps?: IInitialGraphProps): StoreApi<IGraphState> => {
  return createStore<IGraphState>((set,get) => ({
    ...initialGraphState,
    ...initialProps,
   
    // Graph Store Actions
    setGraphTransform: (graphTransform: ITransform) => set({graphTransform}),

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
    setCustomEdgeTypes: (customEdgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => set({customEdgeTypes}),
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

    // Handle Store Actions
    addHandle: (nodeId: string, newHandle: IHandle) => {
      const { nodeInternals, getNodes } = get();
      const handles = nodeInternals.get(nodeId)?.[internalsSymbol]?.handles;

      if(handles !== undefined){
        handles[newHandle.type] = (handles[newHandle.type]).set(newHandle.id, newHandle);
        const nodes = getNodes().map(node => node.id === nodeId? {...node, [internalsSymbol]: {...node[internalsSymbol], handles: handles}} : node);
        set({ nodeInternals: createNodeInternals(nodes, nodeInternals)})
      }
    },
    updateHandlePosition: (nodeId: string, handleId: string, position: IXYPosition) => {
      const { nodeInternals, getNodes, getHandle } = get();
      const handle = getHandle(nodeId, handleId);
      const handles = nodeInternals.get(nodeId)?.[internalsSymbol]?.handles;

      if(handle && handles){
        const updatedHandle = {...handle, position: position};
        handles[updatedHandle.type].set(handleId, updatedHandle);
        const nodes = getNodes().map(node => node.id === nodeId ? {...node, handles: handles} : node);
        set({nodeInternals: createNodeInternals(nodes, nodeInternals)});
      }
    },
    getHandle: (nodeId: string, handleId: string) => {
      const { nodeInternals } = get();
      const handles = nodeInternals.get(nodeId)?.[internalsSymbol]?.handles;

      if(handles !== undefined){
        return new Map([...handles.source.entries(), ...handles.target.entries()]).get(handleId);
      }
    },
    
    // Interaction Store Actions
    setNodeDragInteraction: (nodeId: string) => set((state) => ({nodeDragInteraction: state.nodeInternals.get(nodeId)})),
    resetNodeDragInteraction: () => set({nodeDragInteraction: undefined}),
    newHandleInteraction: (handle: IHandle, mousePosition: IXYPosition, edgeType?: string) => set({handleInteraction: {sourceHandle: handle, mousePosition: mousePosition, edgeType: edgeType === undefined ? "default" : edgeType, targetHandle: undefined}}),
    setHandleInteraction: (interaction: IHandleInteraction) => set({handleInteraction: interaction}),
    resetHandleInteraction: () => set({handleInteraction: undefined}),
  }))}