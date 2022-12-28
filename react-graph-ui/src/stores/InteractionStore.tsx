import create from 'zustand';

interface EdgeInteraction {
  sourceNodeId: number;
  sourceHandleId: string;
  sourceHandleIsTarget: boolean;
  targetNodeId: number | undefined;
  targetHandleId: string | undefined;
  mousePosition: {x: number, y: number} | undefined;
  edgeType: string
}

interface InteractionState {
  dragInteractionNodeId: number | undefined
  edgeInteraction: EdgeInteraction | undefined
  newEdgeInteraction: (nodeId: number, handleId: string, isTarget: boolean, edgeType?: string) => void;
  setDragInteractionNode: (nodeId: number) => void
  setEdgeInteraction: (edgeInteraction: EdgeInteraction) => void
  resetDragNode: () => void
  resetEdgeInteraction: () => void
}

const generateEdgeInteraction = (sourceNodeId:number, sourceHandleId: string, sourceHandleIsTarget: boolean, edgeType?: string): EdgeInteraction => {
  return {
    sourceNodeId: sourceNodeId, 
    sourceHandleId: sourceHandleId,
    sourceHandleIsTarget: sourceHandleIsTarget,
    targetNodeId: undefined, 
    targetHandleId: undefined,
    mousePosition: undefined,
    edgeType: edgeType === undefined ? 'default' : edgeType
  }
}

const initialState = {
  dragInteractionNodeId: undefined,
  edgeInteraction: undefined
}


export const useInteractionStore = create<InteractionState>((set) => ({
  ...initialState,
  setDragInteractionNode: (dragInteractionNodeId: number) => set({dragInteractionNodeId}),
  newEdgeInteraction: (nodeId: number, handleId: string, isTarget: boolean, edgeType?: string) => set({edgeInteraction: generateEdgeInteraction(nodeId, handleId, isTarget, edgeType)}),
  setEdgeInteraction: (edgeInteraction: EdgeInteraction) => set({edgeInteraction}),
  resetDragNode: () => set({dragInteractionNodeId: initialState.edgeInteraction}),
  resetEdgeInteraction: () => set({edgeInteraction: initialState.edgeInteraction}),
}))