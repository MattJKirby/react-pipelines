import create from "zustand";
import { IEdgeData } from "../Components/Edge/IEdgeData";

interface EdgeState {
  edges: IEdgeData[]
  addEdge: (edge: IEdgeData) => void
  newEdge: (sourceNodeId: number, sourceNodeOutput: string, targetNodeId: number, targetNodeInput: string, type: string) => void
}

export const useEdgeStore = create<EdgeState>((set) => ({
  edges: [],
  addEdge: (edge: IEdgeData) => {
    set((state) => ({
      edges: [...state.edges, edge],
    }))
  },
  newEdge: (sourceNodeId: number, sourceNodeOutput: string, targetNodeId: number, targetNodeInput: string, type: string) => {
    set((state) => ({
      edges: [...state.edges, {id:`edge-${state.edges.length}-${sourceNodeId}-${targetNodeId}`, sourceNodeId, sourceNodeOutput, targetNodeId, targetNodeInput, type}]
    }))
  }
}))