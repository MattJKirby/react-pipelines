import create from "zustand";
import { IEdgeData } from "../Components/Edge/IEdgeData";

interface EdgeState {
  edges: IEdgeData[]
  addEdge: (edge: IEdgeData) => void
  newEdge: (sourceNodeId: number, sourceNodeOutput: string, targetNodeId: number, targetNodeInput: string) => void
}

export const useEdgeStore = create<EdgeState>((set) => ({
  edges: [],
  addEdge: (edge: IEdgeData) => {
    set((state) => ({
      edges: [...state.edges, edge],
    }))
  },
  newEdge: (sourceNodeId: number, sourceNodeOutput: string, targetNodeId: number, targetNodeInput: string) => {
    set((state) => ({
      edges: [...state.edges, {sourceNodeId, sourceNodeOutput, targetNodeId, targetNodeInput, id:`edge-${state.edges.length}-${sourceNodeId}-${targetNodeId}`}]
    }))
  }
}))