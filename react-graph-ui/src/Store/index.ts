import { StoreApi } from "zustand";
import { createStore } from "zustand";
import { IGraphState, IInitialGraphProps, ITransform, IXYPosition } from "../Types";
import { initialGraphState } from "./initialState";
import { ComponentType } from "react";
import { EdgeTypeProps } from "../Renderers/EdgeRenderer";
import { INode, INodeProps } from "../Types/node";
import { IEdge } from "../Types/edge";
import { IHandle, IHandleInteraction } from "../Types/handle";


export const createGraphStore = (initialProps?: IInitialGraphProps): StoreApi<IGraphState> => {
  return createStore<IGraphState>((set,get) => ({
    ...initialGraphState,
    ...initialProps,
   
    // Graph Store Actions
    setGraphTransform: (graphTransform: ITransform) => set({graphTransform}),

    // Node Store Actions
    addNode: (node: INode) => { set((state) => ({ nodes: [...state.nodes, node] }))},
    setNodes: (nodes: INode[]) => set({ nodes: nodes }),
    removeNode: (id: string) => { set((state) => ({ nodes: state.nodes.filter((node) => node.id !== id)}))},
    updateNodePosition: (id: string, position: IXYPosition) => {
      set((state) => ({
        nodes: state.nodes.map(node => {
          if (node.id === id) {
            return { ...node, position: position }
          }
          return node;
        })
      }))
    },
    getNodeById: (id: string)=> get().nodes.find(n => n.id === id),
    setCustomNodeTypes: (customNodeTypes: { [key: string]: ComponentType<INodeProps> }) => set({customNodeTypes}),
    addSelectedNode: (selectedNodeId: string) =>  {
      set((state) => ({
        nodes: state.nodes.map(node => {
          if(node.id === selectedNodeId) {
            return {...node, selected: true}
          }
          return node;
        }),
        selectedNodes: [...state.selectedNodes, selectedNodeId]
      }))
    },
    removeSelectedNodes: (selectedNodeIds: string[], all = false) =>  {
      set((state) => ({
        nodes: state.nodes.map(node => {
          if(selectedNodeIds.includes(node.id) || all) {
            return {...node, selected: false}
          }
          return node;
        }),
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
    setNodeDragInteraction: (nodeId: string) => set((state) => ({nodeDragInteraction: state.nodes.find(n => n.id === nodeId)})),
    resetNodeDragInteraction: () => set({nodeDragInteraction: undefined}),
    newHandleInteraction: (handle: IHandle, mousePosition: IXYPosition, edgeType?: string) => set({handleInteraction: {sourceHandle: handle, mousePosition: mousePosition, edgeType: edgeType === undefined ? "default" : edgeType, targetHandle: undefined}}),
    setHandleInteraction: (interaction: IHandleInteraction) => set({handleInteraction: interaction}),
    resetHandleInteraction: () => set({handleInteraction: undefined}),
  }))}