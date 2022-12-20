import create from 'zustand'

interface ContextDimensions {
  width: number;
  height: number;
}

interface ContextPosition {
  offsetX: number;
  offsetY: number;
}

interface ZoomContextStore {
  contextDimensions: ContextDimensions;
  contextPosition: ContextPosition;
  setContextDimensions: (contextDimensions: ContextDimensions) => void;
  setContextPosition: (contextPosition: ContextPosition) => void;
}

export const useZoomContextStore = create<ZoomContextStore>((set) => ({
  contextDimensions: {width: 0, height: 0},
  contextPosition: {offsetX: 0, offsetY: 0},
  setContextDimensions: (contextDimensions: ContextDimensions) => set({contextDimensions}),
  setContextPosition: (contextPosition: ContextPosition) => set({contextPosition})
}))