import { ComponentType } from 'react'
import create from 'zustand'
import { NodeTypeProps } from '../Renderers/NodeRenderer';

type IGraphStore = {
  userNodeTypes: { [key: string]: ComponentType<NodeTypeProps> };
  setUserNodeTypes: (nodeTypes: { [key: string]: ComponentType<NodeTypeProps> }) => void;
}

export const useGraphStore = create<IGraphStore>((set) => ({
  userNodeTypes: {},
  setUserNodeTypes: (userNodeTypes: { [key: string]: ComponentType<NodeTypeProps> }) => set({ userNodeTypes })
}))