import create from "zustand";
import { INodeData } from "../Components/Node/INodeData";

interface NodeState {
  nodes: INodeData[];
  addNode: (node: INodeData) => void;
  removeNode: (id: number) => void;
  updateNodePosition: (id: number, x: number, y: number) => void;
}

export const useNodeStore = create<NodeState>((set) => ({
  nodes: [],
  addNode: (node: INodeData) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }))
  },
  removeNode: (id: number) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
    }))
  },
  updateNodePosition: (id: number, x: number, y: number) => {
    set((state) => ({
      nodes: state.nodes.map(node => {
        if (node.id === id) {
          return { ...node, position: { x: x, y: y } }
        }
        return node
      })
    }))
  }
}))