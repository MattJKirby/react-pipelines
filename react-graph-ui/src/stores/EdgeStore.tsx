import create from "zustand";
import { IEdgeData } from "../Components/Edge/IEdgeData";

interface EdgeState {
  edgeDataList: IEdgeData[]
  addEdge: (edge: IEdgeData) => void
  newEdge: (sourceNodeId: number, sourceNodeOutput: string, targetNodeId: number, targetNodeInput: string, type: string) => void
}

export const useEdgeStore = create<EdgeState>((set) => ({
  edgeDataList: [],
  addEdge: (edge: IEdgeData) => {
    set((state) => ({
      edgeDataList: [...state.edgeDataList, edge],
    }))
  },
  newEdge: (sourceNodeId: number, sourceNodeOutput: string, targetNodeId: number, targetNodeInput: string, type: string) => {
    set((state) => ({
      edgeDataList: [...state.edgeDataList, {id:`edge-${state.edgeDataList.length}-${sourceNodeId}-${targetNodeId}`, sourceNodeId, sourceNodeOutput, targetNodeId, targetNodeInput, type}]
    }))
  }
}))