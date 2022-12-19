import create from "zustand";
import { Node } from "../Node/Node";

interface NodeState {
  nodes: Node[];
  addNode: (id: number, type: string) => void;
  removeNode: (id: number) => void;
}

export const useNodeStore = create<NodeState>((set) => ({
  nodes: [],
  addNode: (id: number, type: string) => {
    set((state) => ({
      nodes: [...state.nodes, {id: id, type: type}],
    }))
  },
  removeNode: (id: number) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
    }))
  }
}))