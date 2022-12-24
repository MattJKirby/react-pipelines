import create from 'zustand';

interface InteractionState {
  dragNodeId: number | undefined
  setDragNode: (nodeId: number) => void
  resetDragNode: () => void
}

const initialState = {
  dragNodeId: undefined
}

export const useInteractionStore = create<InteractionState>((set) => ({
  ...initialState,
  setDragNode: (dragNodeId: number) => set({dragNodeId}),
  resetDragNode: () => set(initialState)
}))