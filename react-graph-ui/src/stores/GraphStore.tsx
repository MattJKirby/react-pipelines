import { ComponentType } from 'react'
import create from 'zustand'

type IGraphStore = {
  userNodeTypes: { [key: string]: ComponentType<any> };
  setUserNodeTypes: (nodeTypes: { [key: string]: ComponentType<any> }) => void;
}

export const useGraphStore = create<IGraphStore>((set) => ({
  userNodeTypes: {},
  setUserNodeTypes: (userNodeTypes: { [key: string]: ComponentType<any> }) => set({userNodeTypes})
}))