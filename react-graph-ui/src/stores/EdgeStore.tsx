import create from "zustand";
import { IEdgeData } from "../Components/Edges/IEdgeData";

interface EdgeState {
  edges: IEdgeData[]
  addEdge: (edge: IEdgeData) => void
}

export const useEdgeStore = create<EdgeState>((set) => ({
  edges: [],
  addEdge: (edge: IEdgeData) => {
    set((state) => ({
      edges: [...state.edges, edge],
    }))
  },
}))