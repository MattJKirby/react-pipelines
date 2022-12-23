import create from 'zustand'

type TransformState = {
  transform: {scale: number, translateX: number, translateY: number}
  setTransform: (transform: {scale: number, translateX: number, translateY: number}) => void
}

/**
 * Store the canvas transformation properties in a zustand store hook
 */
const useTransformStore = create<TransformState>((set) => ({
  transform: {scale: 1, translateX: 0, translateY: 0},
  setTransform: (transform: {scale: number, translateX: number, translateY: number}) => set({transform})
}))

export default useTransformStore