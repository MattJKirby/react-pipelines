import create from "zustand/react";
import createContext from "zustand/context";
import { createStore } from "zustand";
import { IGraphState, ITransform, IXYPosition } from "../Types";
import { initialGraphState } from "./initialState";
import { ComponentType } from "react";
import { EdgeTypeProps } from "../Renderers/EdgeRenderer";
import { NodeTypeProps } from "../Renderers/NodeRenderer";
import { INode } from "../Types/node";
import { IEdge } from "../Types/edge";
import { IHandle } from "../Types/handle";

const { GraphProvider, UseGraphStore } = createContext();

const createGraphStore = () => {
  createStore<IGraphState>((set,get) => ({
    ...initialGraphState,

    // Graph Store Actions
    setGraphTransform: (graphTransform: ITransform) => set({graphTransform}),

    // Node Store Actions
    addNode: (node: INode) => { set((state) => ({ nodes: [...state.nodes, node] }))},
    removeNode: (id: number) => { set((state) => ({ nodes: state.nodes.filter((node) => node.id !== id)}))},
    updateNodePosition: (id: number, position: IXYPosition) => {
      set((state) => ({
        nodes: state.nodes.map(node => {
          if (node.id === id) {
            return { ...node, position: position }
          }
          return node;
        })
      }))
    },
    getNodeById: (id: number)=> get().nodes.find(n => n.id === id),
    setCustomNodeTypes: (customNodeTypes: { [key: string]: ComponentType<NodeTypeProps> }) => set({customNodeTypes}),

    // Edge Store Actions
    setCustomEdgeTypes: (customEdgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => set({customEdgeTypes}),
    addEdge: (edge: IEdge) => { set((state) => ({ edges: [...state.edges, edge] }))},
    newEdge: (sourceNodeId: number, sourceNodeOutput: string, targetNodeId: number, targetNodeInput: string, type: string) => {
      set((state) => ({ edges: [...state.edges, {id:`edge-${sourceNodeId}-${targetNodeId}`, sourceNodeId, sourceNodeOutput, targetNodeId, targetNodeInput, type}]}))
    },
    getEdge: (edgeId: string) => { return get().edges.find(e => e.id === edgeId)},

    // Handle Store Actions
    addHandle: (handle: IHandle) => {set((state) => ({ handles: [...state.handles, handle] }))},
    updateHandlePosition: (handleId: string, position: IXYPosition) => {
      set((state) => ({
        handles: state.handles.map(h => {
          if (h.id === handleId) {
            return { ...h, position: position }
          }
          return h
        })
      }))
    },
    getHandle: (handleId: string) => get().handles.find(h => h.id === handleId),
    
    // Interaction Store Actions
    setNodeDragInteraction: (nodeId: number) => set({nodeDragInteraction: nodeId}),
    resetNodeDragInteraction: () => set({nodeDragInteraction: undefined}),
    setHandleInteraction: (handle: IHandle, mousePosition: IXYPosition, edgeType?: string) => set({handleInteraction: {sourceHandle: handle, mousePosition: mousePosition, edgeType: edgeType === undefined ? "default" : edgeType, targetHandle: undefined}}),
    resetHandleInteraction: () => set({handleInteraction: undefined}),
  }))
}