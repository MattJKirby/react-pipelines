import create from 'zustand';

interface InteractionState {
  dragInteractionNodeId: number | undefined
  edgeInteractionSourceHandleId: string | undefined
  edgeInteractionTargetHandleId: string | undefined
  setDragInteractionNode: (nodeId: number) => void
  setEdgeInteractionSourceHandleId: (handleId: string) => void
  setEdgeInteractionTargetHandleId: (handleId: string) => void
  resetEdgeInteractionSourceHandleId: () => void
  resetEdgeInteractionTargetHandleId: () => void
  resetDragNode: () => void
}

const initialState = {
  dragInteractionNodeId: undefined,
  edgeInteractionSourceHandleId: undefined,
  edgeInteractionTargetHandleId: undefined
}



export const useInteractionStore = create<InteractionState>((set) => ({
  ...initialState,
  setDragInteractionNode: (dragInteractionNodeId: number) => set({dragInteractionNodeId}),
  setEdgeInteractionSourceHandleId: (edgeInteractionSourceHandleId: string) => set({edgeInteractionSourceHandleId}),
  setEdgeInteractionTargetHandleId: (edgeInteractionTargetHandleId: string) => set({edgeInteractionTargetHandleId}),
  resetEdgeInteractionSourceHandleId: () => set({edgeInteractionSourceHandleId: undefined}),
  resetEdgeInteractionTargetHandleId: () => set({edgeInteractionTargetHandleId: undefined}),
  resetDragNode: () => set({dragInteractionNodeId: undefined})
}))