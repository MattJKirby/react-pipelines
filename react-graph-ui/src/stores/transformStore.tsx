import create from 'zustand'

type TransformState = {
  scale: number;
  translateX: number;
  translateY: number;
  setScale: (scale: number) => void;
  setTranslateX: (translateX: number) => void;
  setTranslateY: (translateY: number) => void;
}

/**
 * Store the canvas transformation properties in a zustand store hook
 */
const useTransformStore = create<TransformState>((set) => ({
  scale: 1,
  translateX: 0,
  translateY: 0,
  setScale: (scale: number) => set({scale}),
  setTranslateX: (translateX: number) => set({translateX}),
  setTranslateY: (translateY: number) => set({translateY})
}))

export default useTransformStore