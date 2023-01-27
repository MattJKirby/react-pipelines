import { StoreApi } from "zustand";
import { createStore } from "zustand";
import { IGraphState, IInitialGraphProps, ITransform, IXYPosition } from "../Types";
import { initialGraphState } from "./initialState";
import { ComponentType } from "react";
import { EdgeTypeProps } from "../Renderers/EdgeRenderer";
import { INode, INodeProps } from "../Types/node";
import { IEdge } from "../Types/edge";
import { IHandle, IHandleInteraction } from "../Types/handle";
import { createNodeInternals } from "./utils";


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
    addNode: (node: INode) => {
      const { nodeInternals, getNodes } = get();
      set({ nodeInternals: createNodeInternals([...getNodes(), node], nodeInternals) });
    },
    setNodes: (nodes: INode[]) => {
      const { nodeInternals } = get();
      set({ nodeInternals: createNodeInternals(nodes, nodeInternals)});
    },
    removeNode: (id: string) => {
      const { nodeInternals, getNodes } = get();
      set({ nodeInternals: createNodeInternals(getNodes().filter((node) => node.id !== id), nodeInternals)});
    },
    updateNodePosition: (nodeIds: string[], position: IXYPosition, dragging: boolean) => {
      const { nodeInternals, getNodes } = get();
      const nodes = getNodes().map(node => nodeIds.includes(node.id) ? {...node, position: position, dragging: dragging} : node)
      set({ nodeInternals: createNodeInternals(nodes, nodeInternals)});
    },
    setCustomNodeTypes: (customNodeTypes: { [key: string]: ComponentType<INodeProps> }) => set({customNodeTypes}),
    addSelectedNode: (selectedNodeId: string) => {
      const { nodeInternals, getNodes } = get();
      const nodes = getNodes().map(node => node.id === selectedNodeId ? {...node, selected: true} : node);
      set((state) => ({
        nodeInternals: createNodeInternals(nodes, nodeInternals),
        selectedNodes: [...state.selectedNodes, selectedNodeId]
      }))
    },
    removeSelectedNodes: (selectedNodeIds: string[], all = false) =>  {
      const { nodeInternals, getNodes } = get();
      const nodes = getNodes().map(node => selectedNodeIds.includes(node.id) || all ? {...node, selected: false} : node);
      set((state) => ({
        nodeInternals: createNodeInternals(nodes, nodeInternals),
        selectedNodes: state.selectedNodes.filter(n => !selectedNodeIds.includes(n))
      }))
    },

    // Edge Store Actions
    setCustomEdgeTypes: (customEdgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => set({customEdgeTypes}),
    addEdge: (edge: IEdge) => { set((state) => ({ edges: [...state.edges, edge] }))},
    setEdges: (edges: IEdge[]) => set({edges: edges}),
    newEdge: (sourceNodeId: string, sourceNodeOutput: string, targetNodeId: string, targetNodeInput: string, type: string) => {
      set((state) => ({ edges: [...state.edges, {id:`edge-${sourceNodeId}-${targetNodeId}`, sourceNodeId, sourceNodeOutput, targetNodeId, targetNodeInput, type}]}))
    },
    getEdge: (edgeId: string) => { return get().edges.find(e => e.id === edgeId)},

    // Handle Store Actions
    addHandle: (handle: IHandle) => {set((state) => ({ handles: [...state.handles, handle] }))},
    updateHandlePosition: (nodeId: string, handleId: string, position: IXYPosition) => {
      set((state) => ({
        handles: state.handles.map(h => {
          if (h.nodeId === nodeId && h.id === handleId) {
            return { ...h, position: position }
          }
          return h
        })
      }))
    },
    getHandle: (nodeId: string, handleId: string) => get().handles.find(h => h.nodeId  === nodeId && h.id === handleId),
    
    // Interaction Store Actions
    setNodeDragInteraction: (nodeId: string) => set((state) => ({nodeDragInteraction: state.nodeInternals.get(nodeId)})),
    resetNodeDragInteraction: () => set({nodeDragInteraction: undefined}),
    newHandleInteraction: (handle: IHandle, mousePosition: IXYPosition, edgeType?: string) => set({handleInteraction: {sourceHandle: handle, mousePosition: mousePosition, edgeType: edgeType === undefined ? "default" : edgeType, targetHandle: undefined}}),
    setHandleInteraction: (interaction: IHandleInteraction) => set({handleInteraction: interaction}),
    resetHandleInteraction: () => set({handleInteraction: undefined}),
  }))}