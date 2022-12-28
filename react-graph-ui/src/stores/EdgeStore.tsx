import create from "zustand";
import { IEdgeData } from "../Components/Edge/IEdgeData";

interface EdgeState {
  edgeDataList: IEdgeData[]
  addEdge: (edge: IEdgeData) => void
  newEdge: (sourceNodeId: number, sourceNodeOutput: string, targetNodeId: number, targetNodeInput: string, type: string) => void
  getEdge: (sourceNodeId: number, nodeOutput: string, targetNodeId: number, nodeInput: string) => IEdgeData | undefined
}

export const useEdgeStore = create<EdgeState>((set, get) => ({
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
  },
  getEdge: (sourceNodeId: number, nodeOutput: string, targetNodeId: number, nodeInput: string) => {
    return get().edgeDataList.find(e => e.sourceNodeId === sourceNodeId && e.sourceNodeOutput === nodeOutput && e.targetNodeId === targetNodeId && e.targetNodeInput === nodeInput)
  }
}))