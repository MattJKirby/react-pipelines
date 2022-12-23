import create from "zustand";
import { INodeData } from "../Components/Node/INodeData";

interface NodeState {
  nodes: INodeData[];
  addNode: (node: INodeData) => void;
  removeNode: (id: number) => void;
  updateNodePosition: (id: number, position: {x: number, y: number}) => void;
  getNodeById: (id: number) => INodeData | undefined;
  getNodes: () => INodeData[];
}

export const useNodeStore = create<NodeState>((set, get) => ({
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
  updateNodePosition: (id: number, position: {x: number, y: number}) => {
    set((state) => ({
      nodes: state.nodes.map(node => {
        if (node.id === id) {
          return { ...node, position: position }
        }
        return node
      })
    }))
  },
  getNodeById: (id: number)=> {
    return get().nodes.find(n => n.id === id)
  },
  getNodes: () => {
    return get().nodes
  }
}))