import { ComponentType } from 'react'
import create from 'zustand'
import { NodeTypeProps } from '../Renderers/NodeRenderer';
import { EdgeTypeProps } from '../Renderers/EdgeRenderer'

type IGraphStore = {
  userNodeTypes: { [key: string]: ComponentType<NodeTypeProps> };
  userEdgeTypes: { [key: string]: ComponentType<EdgeTypeProps> };
  setUserEdgeTypes: (edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => void
  setUserNodeTypes: (nodeTypes: { [key: string]: ComponentType<NodeTypeProps> }) => void;
}

export const useGraphStore = create<IGraphStore>((set) => ({
  userNodeTypes: {},
  userEdgeTypes: {},
  setUserNodeTypes: (userNodeTypes: { [key: string]: ComponentType<NodeTypeProps> }) => set({userNodeTypes}),
  setUserEdgeTypes: (userEdgeTypes: { [key: string]: ComponentType<EdgeTypeProps> }) => set({userEdgeTypes})
}))