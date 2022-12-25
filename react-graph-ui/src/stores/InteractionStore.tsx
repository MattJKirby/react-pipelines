import create from 'zustand';

interface EdgeInteraction {
  sourceNodeId: number;
  sourceHandleId: string;
  targetNodeId: number | undefined;
  targetHandleId: string | undefined;
  mousePosition: {x: number, y: number} | undefined;
}

interface InteractionState {
  dragInteractionNodeId: number | undefined
  edgeInteraction: EdgeInteraction | undefined
  newEdgeInteraction: (nodeId: number, handleId: string) => void;
  setDragInteractionNode: (nodeId: number) => void
  setEdgeInteraction: (edgeInteraction: EdgeInteraction) => void
  resetDragNode: () => void
  resetEdgeInteraction: () => void
  
}

const generateEdgeInteraction = (sourceNodeId:number, sourceHandleId: string):EdgeInteraction => {
  return {sourceNodeId: sourceNodeId, sourceHandleId: sourceHandleId, targetNodeId: undefined, targetHandleId: undefined, mousePosition: undefined}
}

const initialState = {
  dragInteractionNodeId: undefined,
  edgeInteraction: undefined
}


export const useInteractionStore = create<InteractionState>((set) => ({
  ...initialState,
  setDragInteractionNode: (dragInteractionNodeId: number) => set({dragInteractionNodeId}),
  newEdgeInteraction: (nodeId: number, handleId: string) => set({edgeInteraction: generateEdgeInteraction(nodeId, handleId)}),
  setEdgeInteraction: (edgeInteraction: EdgeInteraction) => set({edgeInteraction}),
  resetDragNode: () => set({dragInteractionNodeId: initialState.edgeInteraction}),
  resetEdgeInteraction: () => set({edgeInteraction: initialState.edgeInteraction}),
}))