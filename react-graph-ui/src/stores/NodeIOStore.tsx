import create from "zustand";
import { IHandleData } from "../Components/Handles/IHandleData";

interface NodeIOState {
  nodeHandles: IHandleData[]
  registerNodeHandle: (handle: IHandleData) => void;
  updateHandlePosition: (nodeId: number, handleId: string, x: number, y: number) => void;
  getSourceHandles: () => IHandleData[];
  getTargetHandles: () => IHandleData[];
  getHandle: (nodeId: number, handleId: string) => IHandleData | undefined;
}

/**
 * Stores all data pertaining to node IO such as registered node handles
 */
export const useNodeIOStore = create<NodeIOState>((set, get) => ({
  nodeHandles: [],

  registerNodeHandle: (handle: IHandleData) => {
    set((state) => ({
      nodeHandles: [...state.nodeHandles, handle],
    }))
  },
  updateHandlePosition: (nodeId: number, handleId: string, x: number, y: number) => {
    set((state) => ({
      nodeHandles: state.nodeHandles.map(handle => {
        if (handle.nodeId === nodeId && handle.id === handleId) {
          return { ...handle, position: { x: x, y: y } }
        }
        return handle
      })
    }))
  },
  getSourceHandles: () => {
    return get().nodeHandles.filter(n => !n.isTarget)
  },
  getTargetHandles: () => {
    return get().nodeHandles.filter(n => n.isTarget)
  },
  getHandle: (nodeId: number, handleId: string) => {
    return get().nodeHandles.find(h => h.nodeId === nodeId && h.id === handleId)
  }
}))